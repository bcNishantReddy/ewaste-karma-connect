
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Calendar, Clock, MapIcon, Camera, Banknote, ArrowRight, User, Recycle } from "lucide-react";

// Mock data
const kabadiwallaStats = {
  totalCollections: 45,
  totalEarnings: "₹12,500",
  kgCollected: 320,
};

const nearbyCollections = [
  {
    id: 1,
    user: "Ananya Gupta",
    distance: "1.2 km",
    address: "123 Green Park, New Delhi",
    items: "Old laptop, 2 smartphones",
    date: "2023-04-10",
    time: "14:00-17:00",
    status: "pending",
  },
  {
    id: 2,
    user: "Rahul Sharma",
    distance: "0.8 km",
    address: "45 Lajpat Nagar, New Delhi",
    items: "CRT monitor, printer",
    date: "2023-04-11",
    time: "10:00-13:00",
    status: "pending",
  },
  {
    id: 3,
    user: "Priya Patel",
    distance: "2.5 km",
    address: "78 Vasant Kunj, New Delhi",
    items: "Old refrigerator",
    date: "2023-04-12",
    time: "09:00-12:00",
    status: "pending",
  },
];

const scheduledCollections = [
  {
    id: 4,
    user: "Vikram Singh",
    distance: "1.5 km",
    address: "22 Model Town, New Delhi",
    items: "Television, DVD player",
    date: "2023-04-08",
    time: "13:00-15:00",
    status: "scheduled",
  },
  {
    id: 5,
    user: "Neha Kapoor",
    distance: "3.2 km",
    address: "56 Rohini, New Delhi",
    items: "Microwave, old cables",
    date: "2023-04-09",
    time: "16:00-18:00",
    status: "scheduled",
  },
];

const completedCollections = [
  {
    id: 6,
    user: "Aditya Gupta",
    distance: "1.8 km",
    address: "34 Dwarka, New Delhi",
    items: "Computer tower, keyboard",
    date: "2023-04-01",
    time: "10:00-12:00",
    status: "completed",
    earnings: "₹650",
  },
  {
    id: 7,
    user: "Kavita Singh",
    distance: "2.1 km",
    address: "89 Saket, New Delhi",
    items: "Old washing machine",
    date: "2023-03-28",
    time: "14:00-16:00",
    status: "completed",
    earnings: "₹1200",
  },
];

const recyclers = [
  {
    id: 1,
    name: "EcoTech Recyclers",
    location: "Industrial Area, Delhi",
    distance: "5.6 km",
    wasteTypes: ["Electronics", "Batteries", "Metals"],
    rates: "High",
  },
  {
    id: 2,
    name: "GreenCycle Industries",
    location: "Manesar, Haryana",
    distance: "12.3 km",
    wasteTypes: ["Electronics", "Plastics"],
    rates: "Medium",
  },
  {
    id: 3,
    name: "Sustainable Futures",
    location: "Noida, UP",
    distance: "18.5 km",
    wasteTypes: ["Electronics", "Metals", "Plastics"],
    rates: "Very High",
  },
];

const KabadiwallaDashboard = () => {
  const { toast } = useToast();
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const [showRecyclerDetails, setShowRecyclerDetails] = useState<any>(null);

  const handleAcceptCollection = () => {
    setSelectedCollection(null);
    toast({
      title: "Collection Accepted",
      description: "You have accepted this collection request. It's now in your scheduled collections.",
    });
  };

  const handleCompleteCollection = () => {
    setShowUploadPhoto(true);
  };

  const handlePhotoUpload = () => {
    setShowUploadPhoto(false);
    setSelectedCollection(null);
    toast({
      title: "Collection Completed",
      description: "Collection marked as complete and photo uploaded.",
    });
  };

  const handleContactRecycler = (recycler: any) => {
    setShowRecyclerDetails(null);
    toast({
      title: "Request Sent",
      description: `Your request has been sent to ${recycler.name}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{kabadiwallaStats.totalCollections}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-eco-green-600">{kabadiwallaStats.totalEarnings}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">E-Waste Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{kabadiwallaStats.kgCollected} kg</div>
          </CardContent>
        </Card>
      </div>

      {/* Collections Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>E-Waste Collections</CardTitle>
          <CardDescription>
            View and manage your collection requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nearby">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nearby">
              <div className="space-y-4">
                {nearbyCollections.map((collection) => (
                  <div 
                    key={collection.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{collection.user}</span>
                          <Badge className="bg-eco-blue-500">{collection.distance}</Badge>
                        </div>
                        <h4 className="font-medium mt-1">{collection.items}</h4>
                        <div className="mt-2 grid grid-cols-1 gap-1 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{collection.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{collection.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{collection.time}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setSelectedCollection(collection)}
                        className="bg-eco-green-600 hover:bg-eco-green-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {nearbyCollections.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No nearby collections available
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <div className="space-y-4">
                {scheduledCollections.map((collection) => (
                  <div 
                    key={collection.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{collection.user}</span>
                          <Badge className="bg-eco-blue-500">{collection.distance}</Badge>
                        </div>
                        <h4 className="font-medium mt-1">{collection.items}</h4>
                        <div className="mt-2 grid grid-cols-1 gap-1 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{collection.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{collection.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{collection.time}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => {
                          setSelectedCollection({...collection, scheduled: true});
                        }}
                        className="bg-eco-orange-500 hover:bg-eco-orange-600"
                      >
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
                {scheduledCollections.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No scheduled collections
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed">
              <div className="space-y-4">
                {completedCollections.map((collection) => (
                  <div 
                    key={collection.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{collection.user}</span>
                          <Badge className="bg-green-500">Completed</Badge>
                        </div>
                        <h4 className="font-medium mt-1">{collection.items}</h4>
                        <div className="mt-2 grid grid-cols-1 gap-1 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{collection.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{collection.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Banknote className="h-4 w-4 text-eco-green-500 mr-1" />
                            <span className="text-eco-green-600 font-medium">{collection.earnings}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {completedCollections.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No completed collections
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recyclers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Recycle className="mr-2 h-5 w-5 text-eco-blue-500" />
            Nearby Recyclers
          </CardTitle>
          <CardDescription>
            Connect with recyclers to process your collected e-waste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recyclers.map((recycler) => (
              <div 
                key={recycler.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{recycler.name}</h4>
                    <div className="mt-2 grid grid-cols-1 gap-1 text-sm">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{recycler.location}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">Distance:</span>
                        <span>{recycler.distance}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">Accepts:</span>
                        <div className="flex flex-wrap gap-1">
                          {recycler.wasteTypes.map((type, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-2">Rates:</span>
                        <Badge className={`${
                          recycler.rates === "High" ? "bg-eco-green-500" : 
                          recycler.rates === "Very High" ? "bg-eco-green-600" : "bg-eco-orange-500"
                        }`}>
                          {recycler.rates}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setShowRecyclerDetails(recycler)}
                    className="bg-eco-blue-600 hover:bg-eco-blue-700"
                  >
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Recyclers
          </Button>
        </CardFooter>
      </Card>

      {/* Collection Details Dialog */}
      {selectedCollection && (
        <Dialog open={!!selectedCollection} onOpenChange={() => setSelectedCollection(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedCollection.scheduled ? "Complete Collection" : "Collection Details"}</DialogTitle>
              <DialogDescription>
                Review the details and {selectedCollection.scheduled ? "complete the collection" : "accept if you're available"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">User:</span>
                  <span className="font-medium">{selectedCollection.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Items:</span>
                  <span>{selectedCollection.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Date:</span>
                  <span>{selectedCollection.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Time:</span>
                  <span>{selectedCollection.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Address:</span>
                  <span>{selectedCollection.address}</span>
                </div>
                <div className="pt-2">
                  <Button className="w-full text-sm" variant="outline">
                    <MapIcon className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter className="flex sm:justify-between">
              <Button variant="outline" onClick={() => setSelectedCollection(null)}>
                Cancel
              </Button>
              {selectedCollection.scheduled ? (
                <Button onClick={handleCompleteCollection} className="bg-eco-orange-500 hover:bg-eco-orange-600">
                  Mark as Completed
                </Button>
              ) : (
                <Button onClick={handleAcceptCollection} className="bg-eco-green-600 hover:bg-eco-green-700">
                  Accept Collection
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Upload Photo Dialog */}
      {showUploadPhoto && (
        <Dialog open={showUploadPhoto} onOpenChange={setShowUploadPhoto}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Collection Photo</DialogTitle>
              <DialogDescription>
                Take a photo of the collected e-waste to verify completion
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 mx-auto text-gray-400" />
                <div className="mt-2">
                  <Button className="relative bg-eco-blue-600 hover:bg-eco-blue-700">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    Take Photo or Upload
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  JPEG, PNG, or GIF up to 10MB
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Collection Notes (Optional)
                </label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about the collection"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadPhoto(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handlePhotoUpload}
                className="bg-eco-green-600 hover:bg-eco-green-700"
              >
                Complete Collection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Recycler Details Dialog */}
      {showRecyclerDetails && (
        <Dialog open={!!showRecyclerDetails} onOpenChange={() => setShowRecyclerDetails(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect with Recycler</DialogTitle>
              <DialogDescription>
                Send a request to {showRecyclerDetails.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="waste-type" className="text-sm font-medium">
                  E-Waste Type
                </label>
                <Input
                  id="waste-type"
                  placeholder="What type of e-waste do you have?"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Approximate Quantity (kg)
                </label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter approximate weight"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell the recycler about your e-waste collection"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowRecyclerDetails(null)}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => handleContactRecycler(showRecyclerDetails)}
                className="bg-eco-blue-600 hover:bg-eco-blue-700"
              >
                Send Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default KabadiwallaDashboard;
