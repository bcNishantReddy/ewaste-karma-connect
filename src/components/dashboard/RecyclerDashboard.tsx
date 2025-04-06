
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Calendar, Banknote, TrendingUp, BarChart3, Users, Recycle, Truck, Database } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data
const recyclerStats = {
  totalProcessed: "2,450 kg",
  activeKabadiwallas: 32,
  monthlyGrowth: "+15%",
  revenueGenerated: "₹4.2L",
};

const incomingRequests = [
  {
    id: 1,
    kabadiwalla: "Rajesh Kumar",
    location: "Green Park, Delhi",
    wasteType: "Mixed Electronics",
    quantity: "120 kg",
    requestDate: "2023-04-05",
    status: "pending",
  },
  {
    id: 2,
    kabadiwalla: "Amit Singh",
    location: "Lajpat Nagar, Delhi",
    wasteType: "Computer Parts",
    quantity: "85 kg",
    requestDate: "2023-04-04",
    status: "pending",
  },
  {
    id: 3,
    kabadiwalla: "Vijay Sharma",
    location: "Dwarka, Delhi",
    wasteType: "Mobile Phones, Batteries",
    quantity: "45 kg",
    requestDate: "2023-04-03",
    status: "pending",
  },
];

const scheduledPickups = [
  {
    id: 4,
    kabadiwalla: "Sanjay Patel",
    location: "Rohini, Delhi",
    wasteType: "Television Units",
    quantity: "95 kg",
    pickupDate: "2023-04-08",
    status: "scheduled",
  },
  {
    id: 5,
    kabadiwalla: "Manoj Kumar",
    location: "Saket, Delhi",
    wasteType: "Mixed E-Waste",
    quantity: "210 kg",
    pickupDate: "2023-04-09",
    status: "scheduled",
  },
];

const processedWaste = [
  {
    id: 6,
    kabadiwalla: "Rakesh Verma",
    location: "Model Town, Delhi",
    wasteType: "Computer Equipment",
    quantity: "180 kg",
    processDate: "2023-04-01",
    payment: "₹25,200",
    status: "completed",
  },
  {
    id: 7,
    kabadiwalla: "Deepak Singh",
    location: "Vasant Kunj, Delhi",
    wasteType: "Mobile Devices",
    quantity: "65 kg",
    processDate: "2023-03-29",
    payment: "₹16,250",
    status: "completed",
  },
];

const lineChartData = [
  { name: "Jan", processed: 1500, target: 2000 },
  { name: "Feb", processed: 1800, target: 2000 },
  { name: "Mar", processed: 2200, target: 2000 },
  { name: "Apr", processed: 2600, target: 2000 },
  { name: "May", processed: 2400, target: 2000 },
  { name: "Jun", processed: 2800, target: 2000 },
];

const pieChartData = [
  { name: "Electronics", value: 45 },
  { name: "Metals", value: 25 },
  { name: "Batteries", value: 15 },
  { name: "Plastics", value: 10 },
  { name: "Others", value: 5 },
];

const COLORS = ["#6BB92F", "#0B5ECF", "#CF4E0B", "#7F4D32", "#888888"];

const RecyclerDashboard = () => {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showSchedulePickup, setShowSchedulePickup] = useState(false);
  const [showProcessPayment, setShowProcessPayment] = useState(false);

  const handleRequestAction = (action: string) => {
    setSelectedRequest(null);
    
    if (action === "accept") {
      setShowSchedulePickup(true);
    } else {
      toast({
        title: "Request Declined",
        description: "The request has been declined and the kabadiwalla has been notified.",
      });
    }
  };

  const handleSchedulePickup = () => {
    setShowSchedulePickup(false);
    toast({
      title: "Pickup Scheduled",
      description: "The pickup has been scheduled and the kabadiwalla has been notified.",
    });
  };

  const handleMarkAsProcessed = () => {
    setShowProcessPayment(true);
  };

  const handleCompleteProcessing = () => {
    setShowProcessPayment(false);
    setSelectedRequest(null);
    toast({
      title: "Processing Completed",
      description: "The e-waste has been marked as processed and payment has been recorded.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <Recycle className="h-4 w-4 mr-1 text-eco-green-500" />
              Total Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recyclerStats.totalProcessed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <Users className="h-4 w-4 mr-1 text-eco-blue-500" />
              Active Kabadiwallas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recyclerStats.activeKabadiwallas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-eco-orange-500" />
              Monthly Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-eco-green-600">{recyclerStats.monthlyGrowth}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <Banknote className="h-4 w-4 mr-1 text-eco-green-500" />
              Revenue Generated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recyclerStats.revenueGenerated}</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-eco-blue-500" />
              Processing Trend
            </CardTitle>
            <CardDescription>
              Monthly e-waste processing volume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="processed"
                    stroke="#6BB92F"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#0B5ECF"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5 text-eco-orange-500" />
              Waste Composition
            </CardTitle>
            <CardDescription>
              Types of e-waste processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* E-Waste Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>E-Waste Management</CardTitle>
          <CardDescription>
            Manage incoming requests, scheduled pickups, and processed waste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="incoming">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Pickups</TabsTrigger>
              <TabsTrigger value="processed">Processed Waste</TabsTrigger>
            </TabsList>
            
            <TabsContent value="incoming">
              <div className="space-y-4">
                {incomingRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{request.kabadiwalla}</span>
                          <Badge className="bg-eco-blue-500">New Request</Badge>
                        </div>
                        <h4 className="font-medium mt-1">{request.wasteType} - {request.quantity}</h4>
                        <div className="mt-2 grid grid-cols-1 gap-1 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>Requested on: {request.requestDate}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setSelectedRequest(request)}
                        className="bg-eco-green-600 hover:bg-eco-green-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {incomingRequests.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No incoming requests
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <div className="space-y-4">
                {scheduledPickups.map((pickup) => (
                  <div 
                    key={pickup.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{pickup.kabadiwalla}</span>
                          <Badge className="bg-eco-orange-500">Scheduled</Badge>
                        </div>
                        <h4 className="font-medium mt-1">{pickup.wasteType} - {pickup.quantity}</h4>
                        <div className="mt-2 grid grid-cols-1 gap-1 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{pickup.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>Pickup on: {pickup.pickupDate}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setSelectedRequest({ ...pickup, isPickup: true })}
                        className="bg-eco-orange-500 hover:bg-eco-orange-600"
                      >
                        Mark as Processed
                      </Button>
                    </div>
                  </div>
                ))}
                {scheduledPickups.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No scheduled pickups
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="processed">
              <div className="space-y-4">
                {processedWaste.map((waste) => (
                  <div 
                    key={waste.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{waste.kabadiwalla}</span>
                          <Badge className="bg-green-500">Processed</Badge>
                        </div>
                        <h4 className="font-medium mt-1">{waste.wasteType} - {waste.quantity}</h4>
                        <div className="mt-2 grid grid-cols-1 gap-1 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                            <span>{waste.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                            <span>Processed on: {waste.processDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Banknote className="h-4 w-4 text-eco-green-500 mr-1" />
                            <span className="text-eco-green-600 font-medium">Payment: {waste.payment}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {processedWaste.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No processed waste
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedRequest.isPickup ? "Mark as Processed" : "Request Details"}
              </DialogTitle>
              <DialogDescription>
                {selectedRequest.isPickup
                  ? "Confirm the e-waste has been processed"
                  : "Review the details and decide whether to accept this request"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Kabadiwalla:</span>
                  <span className="font-medium">{selectedRequest.kabadiwalla}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Waste Type:</span>
                  <span>{selectedRequest.wasteType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Quantity:</span>
                  <span>{selectedRequest.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Location:</span>
                  <span>{selectedRequest.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    {selectedRequest.isPickup ? "Pickup Date:" : "Request Date:"}
                  </span>
                  <span>
                    {selectedRequest.isPickup ? selectedRequest.pickupDate : selectedRequest.requestDate}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter className="flex sm:justify-between">
              {selectedRequest.isPickup ? (
                <>
                  <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleMarkAsProcessed}
                    className="bg-eco-green-600 hover:bg-eco-green-700"
                  >
                    Mark as Processed
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => handleRequestAction("decline")}>
                    Decline
                  </Button>
                  <Button 
                    onClick={() => handleRequestAction("accept")}
                    className="bg-eco-green-600 hover:bg-eco-green-700"
                  >
                    Accept Request
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Schedule Pickup Dialog */}
      {showSchedulePickup && (
        <Dialog open={showSchedulePickup} onOpenChange={setShowSchedulePickup}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Pickup</DialogTitle>
              <DialogDescription>
                Set a date and time for pickup and provide additional instructions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="pickup-date" className="text-sm font-medium">
                  Pickup Date
                </label>
                <Input
                  id="pickup-date"
                  type="date"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="pickup-time" className="text-sm font-medium">
                  Pickup Time
                </label>
                <Input
                  id="pickup-time"
                  type="time"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="instructions" className="text-sm font-medium">
                  Additional Instructions
                </label>
                <Textarea
                  id="instructions"
                  placeholder="Any special instructions for the pickup"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="offered-price" className="text-sm font-medium">
                  Offered Price (per kg)
                </label>
                <Input
                  id="offered-price"
                  type="number"
                  placeholder="Enter price in ₹"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSchedulePickup(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSchedulePickup}
                className="bg-eco-green-600 hover:bg-eco-green-700"
              >
                Schedule Pickup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Process Payment Dialog */}
      {showProcessPayment && (
        <Dialog open={showProcessPayment} onOpenChange={setShowProcessPayment}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Processing</DialogTitle>
              <DialogDescription>
                Enter the final details and payment information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="actual-quantity" className="text-sm font-medium">
                  Actual Quantity (kg)
                </label>
                <Input
                  id="actual-quantity"
                  type="number"
                  placeholder="Enter actual weight received"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="rate" className="text-sm font-medium">
                  Rate (₹ per kg)
                </label>
                <Input
                  id="rate"
                  type="number"
                  placeholder="Enter rate"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="total-payment" className="text-sm font-medium">
                  Total Payment (₹)
                </label>
                <Input
                  id="total-payment"
                  type="number"
                  placeholder="Calculate total payment"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="processing-notes" className="text-sm font-medium">
                  Processing Notes
                </label>
                <Textarea
                  id="processing-notes"
                  placeholder="Add any notes about the processing"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProcessPayment(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleCompleteProcessing}
                className="bg-eco-green-600 hover:bg-eco-green-700"
              >
                Complete & Pay
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RecyclerDashboard;
