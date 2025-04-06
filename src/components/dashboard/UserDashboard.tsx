import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MapPin, Award, Calendar, Clock, MoreHorizontal, ShoppingBag, Image, Recycle as RecycleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MapComponent from "./MapComponent";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Tables } from "@/integrations/supabase/types";

type PickupHistory = Tables<'pickups'>;
type RewardItem = Tables<'karma_store'>;

type Redemption = Tables<'redemptions'> & {
  item?: {
    title?: string;
    points?: number;
    image_url?: string;
    description?: string;
  };
};

interface RedeemResponse {
  success: boolean;
  message: string;
  redemption_id?: string;
}

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPickupForm, setShowPickupForm] = useState(false);
  const [pickupItems, setPickupItems] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [pickupHistory, setPickupHistory] = useState<PickupHistory[]>([]);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [userLocation, setUserLocation] = useState(() => localStorage.getItem('userLocation') || 'New Delhi, India');

  const karmaPoints = profile?.karma_points || 0;
  const level = Math.floor(karmaPoints / 250) + 1;
  const nextLevel = level * 250;
  const progress = (karmaPoints % 250) / 250 * 100;

  useEffect(() => {
    if (user) {
      fetchPickupHistory();
      fetchRewards();
      fetchRedemptions();
    }
  }, [user]);

  const fetchPickupHistory = async () => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('pickups')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPickupHistory(data || []);
    } catch (err: any) {
      console.error('Error fetching pickup history:', err);
      toast({
        title: "Error fetching pickup history",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('karma_store')
        .select('*')
        .order('points', { ascending: true });
      
      if (error) throw error;
      setRewards(data || []);
    } catch (err: any) {
      console.error('Error fetching rewards:', err);
    }
  };

  const fetchRedemptions = async () => {
    try {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('redemptions')
        .select('*, item:item_id(title, points, image_url, description)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRedemptions(data || []);
    } catch (err: any) {
      console.error('Error fetching redemptions:', err);
    }
  };

  const handleNewPickup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a pickup request",
        variant: "destructive"
      });
      return;
    }
    
    if (!pickupItems || !userLocation) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      localStorage.setItem('userLocation', userLocation);
      
      const { data, error } = await supabase
        .from('pickups')
        .insert([{
          user_id: user.id,
          items: pickupItems,
          location: userLocation,
          pickup_date: pickupDate || null,
          pickup_time: pickupTime || null,
          status: 'pending',
          points: Math.floor(Math.random() * 100) + 50,
        }])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Pickup Request Submitted",
        description: "A kabadiwalla will contact you soon for pickup.",
      });
      
      setShowPickupForm(false);
      setPickupItems('');
      setPickupDate('');
      setPickupTime('');
      
      fetchPickupHistory();
      
    } catch (err: any) {
      console.error('Error submitting pickup request:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to submit pickup request",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaimReward = async (reward: RewardItem) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to claim rewards",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { data, error } = await supabase.rpc<RedeemResponse, { _item_id: string; _user_id: string }>('redeem_karma_item', {
        _item_id: reward.id,
        _user_id: user.id
      });
      
      if (error) throw error;
      
      if (data && data.success) {
        toast({
          title: `Reward Claimed: ${reward.title}`,
          description: `You have used ${reward.points} karma points. We'll send you details via email.`,
        });
        
        fetchRewards();
        fetchRedemptions();
      } else {
        toast({
          title: "Claim failed",
          description: data?.message || "You don't have enough karma points",
          variant: "destructive"
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error claiming reward",
        description: err.message,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pickups">My Pickups</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2 text-amber-500" />
                  Karma Points
                </CardTitle>
                <CardDescription>Your recycling rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-500">{karmaPoints}</div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level {level}</span>
                    <span>Level {level + 1}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {nextLevel - karmaPoints} points to next level
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <RecycleIcon className="h-5 w-5 mr-2 text-green-600" />
                  Pickup History
                </CardTitle>
                <CardDescription>Your contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{pickupHistory.length}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Total successful pickups
                </p>
                <Button variant="link" className="p-0 h-auto mt-2 text-green-600" onClick={() => setActiveTab("pickups")}>
                  View history
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2 text-purple-600" />
                  Rewards Claimed
                </CardTitle>
                <CardDescription>Items redeemed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{redemptions.length}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Rewards claimed so far
                </p>
                <Button variant="link" className="p-0 h-auto mt-2 text-purple-600" onClick={() => setActiveTab("rewards")}>
                  Browse rewards
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MapComponent 
              userType="user"
              title="Nearby Kabadiwallas"
              description="Find e-waste collectors in your area"
              pointsCount={5}
              onlyShowRelevant={true}
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <RecycleIcon className="mr-2 h-5 w-5 text-green-600" />
                  Request E-waste Pickup
                </CardTitle>
                <CardDescription>
                  Schedule a pickup for your electronic waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-gray-300 rounded-lg">
                  <div className="bg-green-100 rounded-full p-3">
                    <RecycleIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Do you have e-waste that needs to be recycled responsibly?
                    </p>
                    <Dialog open={showPickupForm} onOpenChange={setShowPickupForm}>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Plus className="mr-2 h-4 w-4" /> Request Pickup
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Request E-waste Pickup</DialogTitle>
                          <DialogDescription>
                            Tell us about the e-waste you need collected
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleNewPickup} className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Your Address</label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                <MapPin className="h-4 w-4" />
                              </span>
                              <Input 
                                value={userLocation} 
                                onChange={(e) => setUserLocation(e.target.value)} 
                                className="rounded-l-none" 
                                placeholder="Your full address" 
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Preferred Date</label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                  <Calendar className="h-4 w-4" />
                                </span>
                                <Input 
                                  className="rounded-l-none" 
                                  type="date" 
                                  min={new Date().toISOString().split('T')[0]}
                                  value={pickupDate}
                                  onChange={(e) => setPickupDate(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Preferred Time</label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                  <Clock className="h-4 w-4" />
                                </span>
                                <Input 
                                  className="rounded-l-none" 
                                  type="time"
                                  value={pickupTime}
                                  onChange={(e) => setPickupTime(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Description of Items</label>
                            <Textarea 
                              placeholder="Describe the electronic waste items you have (e.g., 1 laptop, 2 mobile phones, etc.)" 
                              className="min-h-[100px]"
                              value={pickupItems}
                              onChange={(e) => setPickupItems(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Upload Image (Optional)</label>
                            <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                              <div className="flex flex-col items-center">
                                <Image className="h-8 w-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                                <input type="file" className="hidden" accept="image/*" />
                                <Button type="button" variant="ghost" size="sm" className="mt-2">
                                  Browse
                                </Button>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowPickupForm(false)}>
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-green-600 hover:bg-green-700"
                              disabled={submitting}
                            >
                              {submitting ? 'Submitting...' : 'Submit Request'}
                            </Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RecycleIcon className="mr-2 h-5 w-5 text-blue-600" />
                Your Collection History
              </CardTitle>
              <CardDescription>Recent e-waste pickups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pickupHistory.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">You don't have any pickup history yet. Request your first pickup!</p>
                ) : (
                  pickupHistory.slice(0, 3).map((pickup) => (
                    <div key={pickup.id} className="flex items-start p-3 rounded-lg border">
                      <div className="bg-blue-100 rounded-full p-2 mr-3">
                        <RecycleIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{pickup.items}</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            +{pickup.points} pts
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="mr-2">{new Date(pickup.pickup_date || pickup.created_at).toLocaleDateString()}</span>
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{pickup.pickup_time || new Date(pickup.created_at).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span className="mr-2">{pickup.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            pickup.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            pickup.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {pickup.status?.charAt(0).toUpperCase() + pickup.status?.slice(1)}
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
              {pickupHistory.length > 0 && (
                <Button variant="link" className="mt-4 p-0" onClick={() => setActiveTab("pickups")}>
                  View all pickup history
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pickups" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RecycleIcon className="mr-2 h-5 w-5 text-blue-600" />
                Your Collection History
              </CardTitle>
              <CardDescription>All your e-waste pickups</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
                </div>
              ) : pickupHistory.length === 0 ? (
                <p className="text-center text-gray-500 py-8">You don't have any pickup history yet. Request your first pickup!</p>
              ) : (
                <div className="space-y-4">
                  {pickupHistory.map((pickup) => (
                    <div key={pickup.id} className="flex items-start p-3 rounded-lg border">
                      <div className="bg-blue-100 rounded-full p-2 mr-3">
                        <RecycleIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{pickup.items}</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            +{pickup.points} pts
                          </span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span className="mr-2">{new Date(pickup.pickup_date || pickup.created_at).toLocaleDateString()}</span>
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{pickup.pickup_time || new Date(pickup.created_at).toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span className="mr-2">{pickup.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            pickup.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            pickup.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {pickup.status?.charAt(0).toUpperCase() + pickup.status?.slice(1)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Collected by: {pickup.kabadiwala_id ? 'Assigned Collector' : 'Awaiting Assignment'}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Options</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                          <DropdownMenuItem>Contact Collector</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
              {pickupHistory.length > 0 && (
                <div className="flex justify-center mt-6">
                  <Button variant="outline" className="mx-1" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" className="mx-1" size="sm">
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          <MapComponent 
            userType="user"
            title="Pickup Locations"
            description="Map of your collection history"
            height="300px"
            showRefreshButton={false}
          />
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-amber-500" />
                    Rewards Marketplace
                  </CardTitle>
                  <CardDescription>Redeem your karma points for eco-friendly rewards</CardDescription>
                </div>
                <div className="bg-amber-100 px-3 py-1 rounded-full flex items-center">
                  <Award className="h-4 w-4 mr-1 text-amber-600" />
                  <span className="font-medium text-amber-700">{karmaPoints} points</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {rewards.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No rewards are currently available. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rewards.map((reward) => (
                    <div key={reward.id} className="border rounded-lg p-4 flex">
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center mr-4 flex-shrink-0">
                        {reward.image_url ? (
                          <img 
                            src={reward.image_url} 
                            alt={reward.title} 
                            className="w-full h-full object-cover rounded-md" 
                          />
                        ) : (
                          <ShoppingBag className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{reward.title}</h4>
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            {reward.points} pts
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
                        <Button
                          className={`mt-3 ${karmaPoints >= reward.points ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
                          size="sm"
                          onClick={() => handleClaimReward(reward)}
                          disabled={karmaPoints < reward.points || (reward.stock !== null && reward.stock <= 0)}
                        >
                          {karmaPoints >= reward.points 
                            ? (reward.stock !== null && reward.stock <= 0 ? 'Out of stock' : 'Redeem') 
                            : `Need ${reward.points - karmaPoints} more`}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {redemptions.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Your Redemption History</h3>
                  <div className="space-y-3">
                    {redemptions.map((redemption) => (
                      <div key={redemption.id} className="flex items-center p-3 border rounded-lg">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <ShoppingBag className="h-5 w-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{redemption.item?.title || 'Reward Item'}</p>
                            <p className="text-sm text-amber-600">-{redemption.points_used} pts</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            Redeemed on {new Date(redemption.created_at).toLocaleDateString()}
                          </p>
                          <p className="text-xs">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              redemption.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              redemption.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {redemption.status?.charAt(0).toUpperCase() + redemption.status?.slice(1)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <p className="text-sm text-gray-500">
                New rewards are added every month. Keep recycling to earn more points!
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
