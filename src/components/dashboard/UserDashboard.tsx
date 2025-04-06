
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import MapComponent from "./MapComponent";
import UserStats from "./UserStats";
import PickupRequestForm from "./PickupRequestForm";
import PickupHistoryComponent from "./PickupHistory";
import { usePickups } from "@/hooks/usePickups";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userLocation, setUserLocation] = useState(() => localStorage.getItem('userLocation') || 'New Delhi, India');
  const { user, profile } = useAuth();
  
  const karmaPoints = profile?.karma_points || 0;
  
  const { 
    pickupHistory, 
    loading: pickupsLoading, 
    submitting,
    submitPickupRequest
  } = usePickups(user?.id);

  const handleNewPickup = async (data: {
    items: string;
    location: string;
    pickup_date: string | null;
    pickup_time: string | null;
  }) => {
    if (!user) return false;
    
    if (!data.items || !data.location) {
      return false;
    }
    
    localStorage.setItem('userLocation', data.location);
    
    return await submitPickupRequest({
      user_id: user.id,
      ...data
    });
  };

  const handleLocationChange = (location: string) => {
    setUserLocation(location);
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pickups">My Pickups</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <UserStats
            karmaPoints={karmaPoints}
            pickupHistory={pickupHistory}
            onTabChange={setActiveTab}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <MapComponent 
              userType="user"
              title="Nearby Kabadiwallas"
              description="Find e-waste collectors in your area"
              pointsCount={5}
              onlyShowRelevant={true}
            />

            <PickupRequestForm
              userLocation={userLocation}
              onLocationChange={handleLocationChange}
              onSubmit={handleNewPickup}
              submitting={submitting}
            />
          </div>

          <PickupHistoryComponent
            pickups={pickupHistory}
            loading={pickupsLoading}
            limit={3}
            showViewAll={true}
            onViewAll={() => setActiveTab("pickups")}
          />
        </TabsContent>

        <TabsContent value="pickups" className="space-y-6">
          <PickupHistoryComponent
            pickups={pickupHistory}
            loading={pickupsLoading}
            title="Your Collection History"
            description="All your e-waste pickups"
          />
          <MapComponent 
            userType="user"
            title="Pickup Locations"
            description="Map of your collection history"
            height="300px"
            showRefreshButton={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
