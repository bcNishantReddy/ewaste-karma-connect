
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Recycle, User, MapPin, Calendar, Clock, MoreHorizontal, TruckIcon, ScaleIcon, ImagePlus, CheckCircle, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MapComponent from "./MapComponent";

// Mock data
const kabadiwalaStats = {
  totalCollections: 47,
  pendingRequests: 3,
  totalWeight: 238, // in kg
  recyclerConnections: 5,
  revenue: 18500, // in rupees
};

const pendingRequests = [
  {
    id: 1,
    date: "2025-04-07",
    time: "2:30 PM",
    items: "Old laptop, 2 mobile phones",
    location: "Connaught Place, New Delhi",
    customerName: "Rahul Sharma",
    customerPhone: "+91 98765 43210",
    distance: "2.5 km",
    status: "Pending",
  },
  {
    id: 2,
    date: "2025-04-08",
    time: "10:00 AM",
    items: "Refrigerator",
    location: "Karol Bagh, New Delhi",
    customerName: "Priya Gupta",
    customerPhone: "+91 87654 32109",
    distance: "3.8 km",
    status: "Pending",
  },
  {
    id: 3,
    date: "2025-04-08",
    time: "4:15 PM",
    items: "Microwave, toaster",
    location: "Lajpat Nagar, New Delhi",
    customerName: "Amit Kumar",
    customerPhone: "+91 76543 21098",
    distance: "5.2 km",
    status: "Pending",
  },
];

const completedCollections = [
  {
    id: 101,
    date: "2025-04-01",
    items: "Television, DVD player",
    weight: 22,
    customer: "Neha Singh",
    location: "Dwarka, New Delhi",
    payment: 1100,
    status: "Completed",
    recycler: "EcoTech Recyclers"
  },
  {
    id: 102,
    date: "2025-03-28",
    items: "Desktop computer, printer",
    weight: 15,
    customer: "Vikram Mehta",
    location: "Rohini, New Delhi",
    payment: 750,
    status: "Completed",
    recycler: "Green Earth Recycling"
  },
  {
    id: 103,
    date: "2025-03-25",
    items: "Air conditioner",
    weight: 30,
    customer: "Anil Kapoor",
    location: "Vasant Kunj, New Delhi",
    payment: 1500,
    status: "Completed",
    recycler: "EcoTech Recyclers"
  },
];

const recyclerConnections = [
  {
    id: 1,
    name: "EcoTech Recyclers",
    location: "Industrial Area, Delhi",
    distance: "8.5 km",
    acceptedItems: ["Computers", "Mobiles", "Televisions", "Large Appliances"],
    rate: "High",
    lastDelivery: "2025-03-29",
    contact: "+91 98765 12345",
  },
  {
    id: 2,
    name: "Green Earth Recycling",
    location: "Noida, UP",
    distance: "12 km",
    acceptedItems: ["All Electronic Items", "Batteries"],
    rate: "Medium",
    lastDelivery: "2025-03-20",
    contact: "+91 87654 23456",
  },
  {
    id: 3,
    name: "EcoFriendly Processors",
    location: "Gurgaon, Haryana",
    distance: "18 km",
    acceptedItems: ["Small Appliances", "Computer Parts"],
    rate: "High",
    lastDelivery: "2025-03-15",
    contact: "+91 76543 34567",
  },
];

const KabadiwallaDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const { toast } = useToast();

  const handleCollectionComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCollectionForm(false);
    
    toast({
      title: "Collection Completed",
      description: "The collection has been marked as complete.",
    });
  };

  const handleAcceptRequest = (request: any) => {
    toast({
      title: "Pickup Accepted",
      description: `You have accepted the pickup request from ${request.customerName}.`,
    });
  };

  const handleRejectRequest = (request: any) => {
    toast({
      variant: "destructive",
      title: "Pickup Rejected",
      description: `You have rejected the pickup request from ${request.customerName}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="recyclers">Recyclers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Collections
                </CardTitle>
                <CardDescription>Your e-waste collections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{kabadiwalaStats.totalCollections}</div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-muted-foreground">
                    Total pickups completed
                  </p>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                    {kabadiwalaStats.pendingRequests} pending
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <ScaleIcon className="h-5 w-5 mr-2 text-green-600" />
                  Total Weight
                </CardTitle>
                <CardDescription>E-waste collected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{kabadiwalaStats.totalWeight} kg</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Total weight collected
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Recycle className="h-5 w-5 mr-2 text-purple-600" />
                  Recycler Connections
                </CardTitle>
                <CardDescription>Your network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{kabadiwalaStats.recyclerConnections}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Active recycler connections
                </p>
                <Button variant="link" className="p-0 h-auto mt-2 text-purple-600" onClick={() => setActiveTab("recyclers")}>
                  View recyclers
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MapComponent 
              userType="kabadiwalla"
              title="Nearby Pickup Requests"
              description="View pending collection requests in your area"
              pointsCount={6}
              onlyShowRelevant={true}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TruckIcon className="mr-2 h-5 w-5 text-orange-600" />
                  Pending Requests
                </CardTitle>
                <CardDescription>E-waste collections waiting for pickup</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="flex items-start p-3 rounded-lg border">
                        <div className="bg-orange-100 rounded-full p-2 mr-3">
                          <TruckIcon className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{request.items}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {request.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span className="mr-2">{request.date}</span>
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{request.time}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span className="mr-2">{request.location}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="mr-1 h-3 w-3" />
                            <span>{request.customerName}</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 h-8"
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowCollectionForm(true);
                            }}
                          >
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleRejectRequest(request)}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="bg-gray-100 rounded-full p-3 mb-2">
                      <CheckCircle className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">No pending requests</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      All pickup requests have been processed
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
                    <ScaleIcon className="mr-2 h-5 w-5 text-green-600" />
                    Recent Collections
                  </CardTitle>
                  <CardDescription>Recently completed pickups</CardDescription>
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full flex items-center">
                  <span className="font-medium text-green-700">₹{kabadiwalaStats.revenue} earned</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedCollections.slice(0, 3).map((collection) => (
                  <div key={collection.id} className="flex items-start p-3 rounded-lg border">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{collection.items}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          ₹{collection.payment}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span className="mr-2">{collection.date}</span>
                        <ScaleIcon className="mr-1 h-3 w-3" />
                        <span>{collection.weight} kg</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span className="mr-2">{collection.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Recycle className="mr-1 h-3 w-3" />
                        <span>Delivered to: {collection.recycler}</span>
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
                        <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 p-0" onClick={() => setActiveTab("collections")}>
                View all collections
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TruckIcon className="mr-2 h-5 w-5 text-orange-600" />
                  Pending Requests
                </CardTitle>
                <CardDescription>E-waste collections waiting for pickup</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="flex items-start p-3 rounded-lg border">
                        <div className="bg-orange-100 rounded-full p-2 mr-3">
                          <TruckIcon className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium">{request.items}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {request.distance}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span className="mr-2">{request.date}</span>
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{request.time}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span className="mr-2">{request.location}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="mr-1 h-3 w-3" />
                            <span>{request.customerName}</span>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 h-8"
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowCollectionForm(true);
                            }}
                          >
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleRejectRequest(request)}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="bg-gray-100 rounded-full p-3 mb-2">
                      <CheckCircle className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">No pending requests</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      All pickup requests have been processed
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <MapComponent 
              userType="kabadiwalla"
              title="Pickup Locations"
              description="Map of pickup requests"
              pointsCount={6}
              onlyShowRelevant={true}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                Completed Collections
              </CardTitle>
              <CardDescription>History of completed pickups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedCollections.map((collection) => (
                  <div key={collection.id} className="flex items-start p-3 rounded-lg border">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium">{collection.items}</p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          ₹{collection.payment}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span className="mr-2">{collection.date}</span>
                        <ScaleIcon className="mr-1 h-3 w-3" />
                        <span>{collection.weight} kg</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span className="mr-2">{collection.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="mr-1 h-3 w-3" />
                        <span className="mr-2">{collection.customer}</span>
                        <Recycle className="mr-1 h-3 w-3" />
                        <span>{collection.recycler}</span>
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
                        <DropdownMenuItem>Generate Report</DropdownMenuItem>
                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="recyclers" className="space-y-6">
          <MapComponent 
            userType="kabadiwalla"
            title="Nearby Recyclers"
            description="Find e-waste recyclers in your area"
            height="400px"
            pointsCount={8}
            onlyShowRelevant={true}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Recycle className="mr-2 h-5 w-5 text-purple-600" />
                Connected Recyclers
              </CardTitle>
              <CardDescription>Recyclers in your network</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recyclerConnections.map((recycler) => (
                  <div key={recycler.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{recycler.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>{recycler.location}</span>
                          <span className="mx-2">•</span>
                          <span>{recycler.distance}</span>
                        </div>
                      </div>
                      <Badge className={recycler.rate === "High" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {recycler.rate} rates
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium mb-1">Accepts:</div>
                      <div className="flex flex-wrap gap-1">
                        {recycler.acceptedItems.map((item, i) => (
                          <Badge key={i} variant="outline" className="bg-blue-50">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-500">
                        Last delivery: {recycler.lastDelivery}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Schedule Delivery
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Collection Completion Dialog */}
      <Dialog open={showCollectionForm} onOpenChange={setShowCollectionForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Collection</DialogTitle>
            <DialogDescription>
              Enter details about the e-waste collected
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <form onSubmit={handleCollectionComplete} className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Collection Details:</h3>
                <div className="bg-gray-50 p-3 rounded-md space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span>{selectedRequest.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span>{selectedRequest.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Items:</span>
                    <span>{selectedRequest.items}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight Collected (kg)</label>
                <Input type="number" min="0.1" step="0.1" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Recycler</label>
                <select className="w-full rounded-md border border-input bg-background px-3 h-10">
                  {recyclerConnections.map(recycler => (
                    <option key={recycler.id} value={recycler.id}>{recycler.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea placeholder="Any additional notes about the collection" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Upload Photo Evidence</label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                  <div className="flex flex-col items-center">
                    <ImagePlus className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload a photo of collected items</p>
                    <input type="file" className="hidden" accept="image/*" />
                    <Button type="button" variant="ghost" size="sm" className="mt-2">
                      Browse
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setShowCollectionForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Complete Collection
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KabadiwallaDashboard;
