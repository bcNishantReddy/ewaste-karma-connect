
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Recycle, 
  CircleDollarSign, 
  Factory, 
  BarChart3, 
  TruckIcon, 
  Scale, 
  MoreHorizontal, 
  Calendar, 
  MapPin, 
  ChevronUp, 
  ChevronDown,
  PlusCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import MapComponent from "./MapComponent";

// Mock data
const recyclerStats = {
  totalProcessed: 1240, // in kg
  kabadiwallasConnected: 12,
  pendingDeliveries: 5,
  monthlyGrowth: 18, // percentage
  recyclingEfficiency: 92, // percentage
  monthlyRevenue: 125000 // in rupees
};

const kabadiwallas = [
  {
    id: 1,
    name: "Ravi's Collection Service",
    location: "Connaught Place, Delhi",
    distance: "5.2 km",
    collectionRate: "High",
    reliability: 4.8,
    lastDelivery: "2025-04-02",
    totalWeight: 320,
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    name: "EcoFriendly Collectors",
    location: "Karol Bagh, Delhi",
    distance: "7.8 km",
    collectionRate: "Medium",
    reliability: 4.5,
    lastDelivery: "2025-03-28",
    totalWeight: 215,
    contact: "+91 87654 32109",
  },
  {
    id: 3,
    name: "Green Earth E-waste",
    location: "Rajouri Garden, Delhi",
    distance: "10.5 km",
    collectionRate: "High",
    reliability: 4.9,
    lastDelivery: "2025-03-25",
    totalWeight: 180,
    contact: "+91 76543 21098",
  },
];

const pendingDeliveries = [
  {
    id: 1,
    kabadiwalla: "Ravi's Collection Service",
    date: "2025-04-07",
    items: "Television, Computer parts",
    estimatedWeight: 25,
    status: "In Transit",
    contactPerson: "Ravi Sharma",
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    kabadiwalla: "EcoFriendly Collectors",
    date: "2025-04-08",
    items: "Mobile phones, Batteries",
    estimatedWeight: 15,
    status: "Scheduled",
    contactPerson: "Rahul Gupta",
    contact: "+91 87654 32109",
  },
];

const monthlyData = [
  { name: "Jan", processed: 85, income: 42500 },
  { name: "Feb", processed: 102, income: 51000 },
  { name: "Mar", processed: 120, income: 60000 },
  { name: "Apr", processed: 142, income: 71000 },
  { name: "May", processed: 125, income: 62500 },
  { name: "Jun", processed: 150, income: 75000 },
];

const materialData = [
  { name: "Plastics", value: 35 },
  { name: "Metals", value: 45 },
  { name: "Circuit Boards", value: 15 },
  { name: "Glass", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RecyclerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddKabadiwalaForm, setShowAddKabadiwalaForm] = useState(false);
  const { toast } = useToast();

  const handleAddKabadiwalla = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddKabadiwalaForm(false);
    
    toast({
      title: "Connection Request Sent",
      description: "An invitation has been sent to the kabadiwalla.",
    });
  };

  const handleAcceptDelivery = (delivery: any) => {
    toast({
      title: "Delivery Accepted",
      description: `You have accepted the delivery from ${delivery.kabadiwalla}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="network">Kabadiwalla Network</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Scale className="h-5 w-5 mr-2 text-blue-600" />
                  Total Processed
                </CardTitle>
                <CardDescription>E-waste recycled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{recyclerStats.totalProcessed} kg</div>
                <div className="flex items-center mt-2">
                  <div className={`flex items-center text-sm ${recyclerStats.monthlyGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {recyclerStats.monthlyGrowth > 0 ? (
                      <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{Math.abs(recyclerStats.monthlyGrowth)}% from last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Factory className="h-5 w-5 mr-2 text-green-600" />
                  Recycling Efficiency
                </CardTitle>
                <CardDescription>Resource recovery rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{recyclerStats.recyclingEfficiency}%</div>
                <div className="mt-2">
                  <Progress value={recyclerStats.recyclingEfficiency} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CircleDollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                  Monthly Revenue
                </CardTitle>
                <CardDescription>From recycled materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-600">₹{recyclerStats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  From processing e-waste
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MapComponent 
              userType="recycler"
              title="Kabadiwalla Network"
              description="View your connected kabadiwallas"
              pointsCount={8}
              onlyShowRelevant={true}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TruckIcon className="mr-2 h-5 w-5 text-orange-600" />
                  Pending Deliveries
                </CardTitle>
                <CardDescription>Upcoming e-waste deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingDeliveries.length > 0 ? (
                  <div className="space-y-4">
                    {pendingDeliveries.map((delivery) => (
                      <div key={delivery.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{delivery.kabadiwalla}</h3>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{delivery.date}</span>
                              <span className="mx-1">•</span>
                              <Badge className={delivery.status === "In Transit" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}>
                                {delivery.status}
                              </Badge>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            ~{delivery.estimatedWeight} kg
                          </Badge>
                        </div>
                        
                        <div className="mt-2 text-sm text-gray-600">
                          Items: {delivery.items}
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="text-xs text-gray-500">
                            Contact: {delivery.contactPerson}
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAcceptDelivery(delivery)}
                          >
                            {delivery.status === "In Transit" ? "Receive" : "Confirm"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="bg-gray-100 rounded-full p-3 mb-2">
                      <TruckIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">No pending deliveries</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      All deliveries have been processed
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-purple-600" />
                    Monthly Processing Overview
                  </CardTitle>
                  <CardDescription>E-waste processed in the last 6 months</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
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
                    <Bar yAxisId="left" dataKey="processed" name="Processed (kg)" fill="#8884d8" />
                    <Bar yAxisId="right" dataKey="income" name="Income (₹ hundreds)" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">Your Kabadiwalla Network</h3>
            <Dialog open={showAddKabadiwalaForm} onOpenChange={setShowAddKabadiwalaForm}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Connection
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect with Kabadiwalla</DialogTitle>
                  <DialogDescription>
                    Send connection request to a kabadiwalla
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddKabadiwalla} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Kabadiwalla Name</label>
                    <Input placeholder="Business name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Person</label>
                    <Input placeholder="Full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="Full address" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="Add a personalized message..." />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowAddKabadiwalaForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Send Request
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <MapComponent 
            userType="recycler"
            title="Kabadiwalla Network Map"
            description="Geographic distribution of your network"
            height="400px"
            pointsCount={12}
            onlyShowRelevant={true}
          />

          <div className="space-y-4 mt-6">
            {kabadiwallas.map((kabadiwalla) => (
              <Card key={kabadiwalla.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium">{kabadiwalla.name}</h3>
                        <Badge className={`ml-2 ${kabadiwalla.collectionRate === "High" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {kabadiwalla.collectionRate} volume
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="mr-1 h-4 w-4" />
                        <span>{kabadiwalla.location}</span>
                        <span className="mx-2">•</span>
                        <span>{kabadiwalla.distance}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 mr-2">Reliability:</span>
                        <span className="font-medium">{kabadiwalla.reliability}/5</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-gray-500 mr-2">Total Collected:</span>
                        <span className="font-medium">{kabadiwalla.totalWeight} kg</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" size="sm">
                        Schedule Pickup
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View History</DropdownMenuItem>
                          <DropdownMenuItem>View Contract</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Remove Connection</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-between">
                    <div className="text-sm text-gray-500">
                      Last delivery: {kabadiwalla.lastDelivery}
                    </div>
                    <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                      Contact: {kabadiwalla.contact}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
                  Monthly Processing
                </CardTitle>
                <CardDescription>E-waste processed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="processed" name="Processed (kg)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CircleDollarSign className="mr-2 h-5 w-5 text-green-600" />
                  Revenue Analysis
                </CardTitle>
                <CardDescription>Income from recycled materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" name="Income (₹)" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Recycle className="mr-2 h-5 w-5 text-purple-600" />
                Material Composition
              </CardTitle>
              <CardDescription>Breakdown of recycled materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={materialData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {materialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Material Recovery</h3>
                  <div className="space-y-3">
                    {materialData.map((material, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center">
                            <span 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            {material.name}
                          </span>
                          <span>{material.value}%</span>
                        </div>
                        <Progress value={material.value} className="h-2" 
                          style={{ backgroundColor: `${COLORS[index % COLORS.length]}33`, 
                                  color: COLORS[index % COLORS.length] }} 
                        />
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Recovery Efficiency</h4>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall</span>
                      <span className="font-medium">{recyclerStats.recyclingEfficiency}%</span>
                    </div>
                    <Progress value={recyclerStats.recyclingEfficiency} className="h-2 bg-gray-200" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <div className="w-full flex justify-between text-sm text-gray-500">
                <span>Total processed this month: {monthlyData[monthlyData.length-1].processed} kg</span>
                <span>Total revenue this month: ₹{monthlyData[monthlyData.length-1].income}</span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecyclerDashboard;
