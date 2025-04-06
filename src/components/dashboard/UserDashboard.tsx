
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MapPin, Award, Calendar, Clock, MoreHorizontal, ShoppingBag, Image } from "lucide-react";

// Mock data
const userStats = {
  totalCollections: 12,
  karmaPoints: 560,
  kgRecycled: 32,
};

const userBadges = [
  { name: "Eco Warrior", description: "Completed 10+ collections", color: "bg-eco-green-500" },
  { name: "E-Savior", description: "Recycled 25+ kg of e-waste", color: "bg-eco-blue-500" },
  { name: "Early Adopter", description: "One of our first users", color: "bg-eco-orange-500" },
];

const pastCollections = [
  {
    id: 1,
    date: "2023-04-01",
    items: "Old laptop, broken smartphone",
    kabadiwalla: "Rajesh Kumar",
    points: 120,
    status: "completed",
    image: "https://placeholder.pics/svg/300x200/DEDEDE/555555/collection-photo",
  },
  {
    id: 2,
    date: "2023-03-15",
    items: "Computer monitor, keyboard",
    kabadiwalla: "Amit Singh",
    points: 85,
    status: "completed",
    image: "https://placeholder.pics/svg/300x200/DEDEDE/555555/collection-photo",
  },
  {
    id: 3,
    date: "2023-02-22",
    items: "Printer, old cables",
    kabadiwalla: "Sanjay Patel",
    points: 65,
    status: "completed",
    image: "https://placeholder.pics/svg/300x200/DEDEDE/555555/collection-photo",
  },
];

const UserDashboard = () => {
  const { toast } = useToast();
  const [isPostingEwaste, setIsPostingEwaste] = useState(false);
  const [viewingCollection, setViewingCollection] = useState<any>(null);

  const handlePostEwaste = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPostingEwaste(false);
    toast({
      title: "E-Waste Posted Successfully",
      description: "Nearby kabadiwallas have been notified of your collection request.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats and Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userStats.totalCollections}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Karma Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-eco-green-600">{userStats.karmaPoints}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">E-Waste Recycled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userStats.kgRecycled} kg</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-eco-orange-500" />
            Your Badges
          </CardTitle>
          <CardDescription>
            Earn more badges by recycling e-waste
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userBadges.map((badge, index) => (
              <Badge key={index} className={`${badge.color} text-white px-3 py-1 rounded-full`}>
                {badge.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Post E-Waste Button */}
      <div className="flex justify-end">
        <Dialog open={isPostingEwaste} onOpenChange={setIsPostingEwaste}>
          <DialogTrigger asChild>
            <Button className="bg-eco-green-600 hover:bg-eco-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Post E-Waste Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Post E-Waste for Collection</DialogTitle>
              <DialogDescription>
                Fill in the details about your e-waste and preferred collection time.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePostEwaste} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="waste-items" className="text-sm font-medium">
                  E-Waste Items
                </label>
                <Textarea
                  id="waste-items"
                  placeholder="Describe your e-waste items (e.g., old laptop, broken smartphone)"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Collection Address
                </label>
                <Textarea
                  id="address"
                  placeholder="Your full address for collection"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">
                    Preferred Date
                  </label>
                  <Input id="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-sm font-medium">
                    Preferred Time
                  </label>
                  <Input id="time" type="time" required />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Additional Notes
                </label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or notes for the kabadiwalla"
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-eco-green-600 hover:bg-eco-green-700">
                  Post Collection Request
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Past Collections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Recycle className="mr-2 h-5 w-5 text-eco-blue-500" />
            Your Collection History
          </CardTitle>
          <CardDescription>
            View your past e-waste collections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastCollections.map((collection) => (
              <div 
                key={collection.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm text-gray-500">{collection.date}</span>
                    </div>
                    <h4 className="font-medium mt-1">{collection.items}</h4>
                    <div className="mt-2 flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span>Collected by: {collection.kabadiwalla}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500">+{collection.points} points</Badge>
                    <Dialog open={viewingCollection?.id === collection.id} onOpenChange={() => setViewingCollection(null)}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0" 
                          onClick={() => setViewingCollection(collection)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            View All Collections
          </Button>
        </CardFooter>
      </Card>

      {/* View Collection Dialog */}
      {viewingCollection && (
        <Dialog open={!!viewingCollection} onOpenChange={() => setViewingCollection(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Collection Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={viewingCollection.image} 
                  alt="Collection" 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Date:</span>
                  <span>{viewingCollection.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Items:</span>
                  <span>{viewingCollection.items}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Kabadiwalla:</span>
                  <span>{viewingCollection.kabadiwalla}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Points Earned:</span>
                  <span className="text-eco-green-600 font-medium">+{viewingCollection.points}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Shop Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-eco-orange-500" />
            Eco Shop
          </CardTitle>
          <CardDescription>
            Use your karma points to purchase recycled products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-medium">Recycled Paper Notebook</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-eco-green-600">250 points</span>
                  <Button variant="outline" size="sm">Redeem</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-medium">Eco-Friendly Tote Bag</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-eco-green-600">350 points</span>
                  <Button variant="outline" size="sm">Redeem</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="h-40 bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="font-medium">Recycled Phone Case</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-eco-green-600">500 points</span>
                  <Button variant="outline" size="sm">Redeem</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Visit Shop
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDashboard;
