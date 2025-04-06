
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Recycle, User, Bell, LogOut, ChevronDown, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];
type Pickup = Database['public']['Tables']['pickups']['Row'];
type KarmaStoreItem = Database['public']['Tables']['karma_store']['Row'];
type Redemption = Database['public']['Tables']['redemptions']['Row'];

interface UserTypeCount {
  user_type: string;
  count: number | string;
}

interface Stats {
  users: number;
  kabadiwallas: number;
  recyclers: number;
  totalPickups: number;
}

interface KarmaStats {
  totalIssued: number;
  totalRedeemed: number;
}

interface NewKarmaItem {
  title: string;
  description: string;
  points: number;
  stock: number;
}

interface PickupWithUsers extends Pickup {
  user_name?: string;
  kabadiwala_name?: string;
}

const AdminDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState<NewKarmaItem>({ title: '', description: '', points: 0, stock: 0 });
  const [stats, setStats] = useState<Stats>({ users: 0, kabadiwallas: 0, recyclers: 0, totalPickups: 0 });
  const [karma, setKarma] = useState<KarmaStats>({ totalIssued: 0, totalRedeemed: 0 });
  const [storeItems, setStoreItems] = useState<KarmaStoreItem[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [pickups, setPickups] = useState<PickupWithUsers[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
    fetchKarmaStoreItems();
    fetchUsers();
    fetchPickups();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get user type counts by querying directly for each type
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'user');
      
      const { data: kabadiwallasData, error: kabadiwallasError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'kabadiwalla');
        
      const { data: recyclersData, error: recyclersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'recycler');
      
      if (usersError) throw usersError;
      if (kabadiwallasError) throw kabadiwallasError;
      if (recyclersError) throw recyclersError;
      
      const userCount = usersData ? usersData.length : 0;
      const kabadiwallasCount = kabadiwallasData ? kabadiwallasData.length : 0;
      const recyclersCount = recyclersData ? recyclersData.length : 0;

      const { count: totalPickups, error: pickupsError } = await supabase
        .from('pickups')
        .select('*', { count: 'exact', head: true });

      if (pickupsError) throw pickupsError;

      const { data: karmaIssued, error: karmaError } = await supabase
        .from('pickups')
        .select('points')
        .not('points', 'is', null);

      if (karmaError) throw karmaError;

      const { data: karmaRedeemed, error: redemptionError } = await supabase
        .from('redemptions')
        .select('points_used');

      if (redemptionError) throw redemptionError;

      const totalIssued = karmaIssued 
        ? karmaIssued.reduce((sum, item) => sum + (item.points || 0), 0) 
        : 0;
        
      const totalRedeemed = karmaRedeemed 
        ? karmaRedeemed.reduce((sum, item) => sum + (item.points_used || 0), 0) 
        : 0;

      setStats({
        users: userCount,
        kabadiwallas: kabadiwallasCount,
        recyclers: recyclersCount,
        totalPickups: totalPickups || 0
      });

      setKarma({
        totalIssued,
        totalRedeemed
      });

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. " + error.message,
        variant: "destructive"
      });
    }
  };

  const fetchKarmaStoreItems = async () => {
    try {
      const { data, error } = await supabase
        .from('karma_store')
        .select('*')
        .order('points', { ascending: true });

      if (error) throw error;
      setStoreItems(data || []);
    } catch (error: any) {
      console.error('Error fetching karma store items:', error);
      toast({
        title: "Error",
        description: "Failed to load karma store items. " + error.message,
        variant: "destructive"
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPickups = async () => {
    try {
      const { data, error } = await supabase
        .from('pickups')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const pickupsWithNames: PickupWithUsers[] = await Promise.all(
        (data || []).map(async (pickup) => {
          let user_name = 'Unknown';
          let kabadiwala_name = 'Unassigned';
          
          const { data: userData } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', pickup.user_id)
            .single();
            
          if (userData) {
            user_name = userData.name;
          }
          
          if (pickup.kabadiwala_id) {
            const { data: kabadiwalaData } = await supabase
              .from('profiles')
              .select('name')
              .eq('id', pickup.kabadiwala_id)
              .single();
              
            if (kabadiwalaData) {
              kabadiwala_name = kabadiwalaData.name;
            }
          }
          
          return {
            ...pickup,
            user_name,
            kabadiwala_name
          };
        })
      );

      setPickups(pickupsWithNames);
    } catch (error: any) {
      console.error('Error fetching pickups:', error);
    }
  };

  const handleAddKarmaItem = async () => {
    try {
      if (!newItem.title || newItem.points <= 0) {
        return toast({
          title: "Validation Error",
          description: "Title and points are required. Points must be greater than 0.",
          variant: "destructive"
        });
      }

      const { data, error } = await supabase
        .from('karma_store')
        .insert({
          title: newItem.title,
          description: newItem.description,
          points: newItem.points,
          stock: newItem.stock
        })
        .select();

      if (error) throw error;

      toast({
        title: "Success",
        description: "New karma store item added successfully."
      });

      setIsAddingItem(false);
      setNewItem({ title: '', description: '', points: 0, stock: 0 });
      fetchKarmaStoreItems();
    } catch (error: any) {
      console.error('Error adding karma store item:', error);
      toast({
        title: "Error",
        description: "Failed to add item. " + error.message,
        variant: "destructive"
      });
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  function getInitials(name: string) {
    return name
      ?.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'AD';
  }

  const userTypeData = [
    { name: 'Users', value: stats.users },
    { name: 'Kabadiwallas', value: stats.kabadiwallas },
    { name: 'Recyclers', value: stats.recyclers },
  ];

  const monthlyData = [
    { name: 'Jan', pickups: 12, karma: 560 },
    { name: 'Feb', pickups: 19, karma: 780 },
    { name: 'Mar', pickups: 31, karma: 1240 },
    { name: 'Apr', pickups: 26, karma: 1040 },
    { name: 'May', pickups: 33, karma: 1320 },
    { name: 'Jun', pickups: 45, karma: 1800 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-eco-green-600 font-bold">
              <Recycle className="h-6 w-6 mr-2" />
              <span className="text-xl">VentureTech</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">3</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="" alt={profile?.name || "Admin"} />
                      <AvatarFallback className="bg-purple-100 text-purple-800">
                        {getInitials(profile?.name || "Admin")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="mr-1 hidden md:block">{profile?.name || "Admin"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Regular Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage the e-waste recycling system
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="karma">Karma Store</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Users</CardTitle>
                    <CardDescription>Registered users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">{stats.users}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Kabadiwallas</CardTitle>
                    <CardDescription>Registered collectors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">{stats.kabadiwallas}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recyclers</CardTitle>
                    <CardDescription>Registered recyclers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">{stats.recyclers}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Pickups</CardTitle>
                    <CardDescription>E-waste collections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-amber-600">{stats.totalPickups}</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Distribution</CardTitle>
                    <CardDescription>Breakdown by user type</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {userTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Activity</CardTitle>
                    <CardDescription>Pickups and karma points awarded</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="pickups" name="Pickups" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="karma" name="Karma Points" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Pickups</CardTitle>
                  <CardDescription>Last 10 e-waste collections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">User</th>
                          <th className="px-4 py-2 text-left">Kabadiwalla</th>
                          <th className="px-4 py-2 text-left">Items</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-right">Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pickups.length > 0 ? (
                          pickups.map((pickup) => (
                            <tr key={pickup.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2">
                                {new Date(pickup.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-2">{pickup.user_name || 'Unknown'}</td>
                              <td className="px-4 py-2">{pickup.kabadiwala_name || 'Unassigned'}</td>
                              <td className="px-4 py-2">{pickup.items}</td>
                              <td className="px-4 py-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  pickup.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  pickup.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {pickup.status}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-right">{pickup.points || 0}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                              No pickups found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage system users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Location</th>
                          <th className="px-4 py-2 text-left">Joined</th>
                          <th className="px-4 py-2 text-right">Karma Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={user.avatar_url || ""} alt={user.name} />
                                    <AvatarFallback>
                                      {getInitials(user.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {user.name}
                                </div>
                              </td>
                              <td className="px-4 py-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  user.user_type === 'admin' ? 'bg-purple-100 text-purple-800' :
                                  user.user_type === 'kabadiwalla' ? 'bg-blue-100 text-blue-800' :
                                  user.user_type === 'recycler' ? 'bg-green-100 text-green-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {user.user_type}
                                </span>
                              </td>
                              <td className="px-4 py-2">{user.location || 'Not specified'}</td>
                              <td className="px-4 py-2">
                                {new Date(user.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-2 text-right">{user.karma_points || 0}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                              No users found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="karma" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Karma Store Management</h2>
                  <p className="text-sm text-gray-500">Manage redeemable items in the karma store</p>
                </div>
                <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Karma Store Item</DialogTitle>
                      <DialogDescription>
                        Create a new item that users can redeem with their karma points
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input 
                          value={newItem.title} 
                          onChange={(e) => setNewItem({...newItem, title: e.target.value})} 
                          placeholder="Item title" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea 
                          value={newItem.description} 
                          onChange={(e) => setNewItem({...newItem, description: e.target.value})} 
                          placeholder="Item description" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Points Required</label>
                          <Input 
                            type="number"
                            value={newItem.points} 
                            onChange={(e) => setNewItem({...newItem, points: parseInt(e.target.value) || 0})} 
                            min={1}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Stock</label>
                          <Input 
                            type="number"
                            value={newItem.stock} 
                            onChange={(e) => setNewItem({...newItem, stock: parseInt(e.target.value) || 0})} 
                            min={0}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsAddingItem(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleAddKarmaItem}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Add Item
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Karma Points Overview</CardTitle>
                  <CardDescription>Total points issued and redeemed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Total Points Issued</div>
                      <div className="text-3xl font-bold text-green-600">{karma.totalIssued}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Total Points Redeemed</div>
                      <div className="text-3xl font-bold text-amber-600">{karma.totalRedeemed}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">Points in Circulation</div>
                      <div className="text-3xl font-bold text-blue-600">{karma.totalIssued - karma.totalRedeemed}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Karma Store Items</CardTitle>
                  <CardDescription>Items available for redemption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Title</th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-center">Points</th>
                          <th className="px-4 py-2 text-center">Stock</th>
                          <th className="px-4 py-2 text-center">Added On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {storeItems.length > 0 ? (
                          storeItems.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2 font-medium">{item.title}</td>
                              <td className="px-4 py-2">{item.description}</td>
                              <td className="px-4 py-2 text-center">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                  {item.points}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-center">{item.stock}</td>
                              <td className="px-4 py-2 text-center">
                                {new Date(item.created_at).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                              No karma store items found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} VentureTech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
