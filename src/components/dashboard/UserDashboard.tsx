
import React, { useState } from "react";
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

// Mock data
const userStats = {
  karma: 750,
  level: 3,
  nextLevel: 1000,
  pickups: 12,
  rewards: 3,
};

const recentPickups = [
  {
    id: 1,
    date: "2025-03-29",
    time: "10:00 AM",
    items: "Old laptop, 2 mobile phones",
    points: 120,
    status: "Completed",
    location: "Connaught Place, New Delhi",
    collector: "Ravi's Recycling",
  },
  {
    id: 2,
    date: "2025-03-15",
    time: "2:30 PM",
    items: "Television, microwave",
    points: 200,
    status: "Completed",
    location: "Rajouri Garden, New Delhi",
    collector: "Green Earth Collectors",
  },
  {
    id: 3,
    date: "2025-03-05",
    time: "9:15 AM",
    items: "Computer monitor, keyboard",
    points: 80,
    status: "Completed",
    location: "Greater Kailash, New Delhi",
    collector: "EcoFriendly Waste Management",
  },
];

const rewards = [
  {
    id: 1,
    name: "Recycled Notebook",
    points: 150,
    description: "Handcrafted notebook made from recycled paper",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Eco-friendly Water Bottle",
    points: 300,
    description: "Stainless steel water bottle made from recycled materials",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "₹100 Discount Coupon",
    points: 200,
    description: "Get ₹100 off on your next electronics purchase",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Plant a Tree Certificate",
    points: 500,
    description: "We'll plant a tree in your name",
    image: "/placeholder.svg",
  },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPickupForm, setShowPickupForm] = useState(false);
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState(() => localStorage.getItem('userLocation') || 'New Delhi, India');

  const handleNewPickup = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPickupForm(false);
    toast({
      title: "Pickup Request Submitted",
      description: "A kabadiwalla will contact you soon for pickup.",
    });
  };

  const handleClaimReward = (reward: typeof rewards[0]) => {
    if (userStats.karma >= reward.points) {
      toast({
        title: `Reward Claimed: ${reward.name}`,
        description: `You have used ${reward.points} karma points. We'll send you details via email.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Not enough karma points",
        description: `You need ${reward.points - userStats.karma} more points to claim this reward.`,
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
                <div className="text-3xl font-bold text-amber-500">{userStats.karma}</div>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level {userStats.level}</span>
                    <span>Level {userStats.level + 1}</span>
                  </div>
                  <Progress value={(userStats.karma / userStats.nextLevel) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {userStats.nextLevel - userStats.karma} points to next level
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
                <div className="text-3xl font-bold text-green-600">{userStats.pickups}</div>
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
                <div className="text-3xl font-bold text-purple-600">{userStats.rewards}</div>
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
            {/* Map component */}
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
                                <Input className="rounded-l-none" type="date" min={new Date().toISOString().split('T')[0]} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Preferred Time</label>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                  <Clock className="h-4 w-4" />
                                </span>
                                <Input className="rounded-l-none" type="time" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Description of Items</label>
                            <Textarea 
                              placeholder="Describe the electronic waste items you have (e.g., 1 laptop, 2 mobile phones, etc.)" 
                              className="min-h-[100px]"
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
                            <Button type="submit" className="bg-green-600 hover:bg-green-700">
                              Submit Request
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
                {recentPickups.slice(0, 3).map((pickup) => (
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
                        <span className="mr-2">{pickup.date}</span>
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{pickup.time}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span className="mr-2">{pickup.location}</span>
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
                ))}
              </div>
              <Button variant="link" className="mt-4 p-0" onClick={() => setActiveTab("pickups")}>
                View all pickup history
              </Button>
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
              <div className="space-y-4">
                {recentPickups.map((pickup) => (
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
                        <span className="mr-2">{pickup.date}</span>
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{pickup.time}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span className="mr-2">{pickup.location}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Collected by: {pickup.collector}
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
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="mx-1" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" className="mx-1" size="sm">
                  Next
                </Button>
              </div>
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
                  <span className="font-medium text-amber-700">{userStats.karma} points</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="border rounded-lg p-4 flex">
                    <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center mr-4 flex-shrink-0">
                      <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{reward.name}</h4>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                          {reward.points} pts
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
                      <Button
                        className={`mt-3 ${userStats.karma >= reward.points ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
                        size="sm"
                        onClick={() => handleClaimReward(reward)}
                        disabled={userStats.karma < reward.points}
                      >
                        {userStats.karma >= reward.points ? 'Redeem' : `Need ${reward.points - userStats.karma} more`}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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
