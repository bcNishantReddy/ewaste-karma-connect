
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Recycle, User, Bell, Settings, LogOut, ChevronDown, MapPin } from "lucide-react";
import UserDashboard from "@/components/dashboard/UserDashboard";
import KabadiwallaDashboard from "@/components/dashboard/KabadiwallaDashboard";
import RecyclerDashboard from "@/components/dashboard/RecyclerDashboard";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Create a stable user type that doesn't change unexpectedly
  const userType = useMemo(() => profile?.user_type || 'user', [profile?.user_type]);

  // Handle navigation back to login after logout
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleLogout = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      toast({
        title: "Logging out",
        description: "Please wait while we log you out...",
      });
      
      await signOut();
      
      // We don't need to navigate here as the useEffect will handle it
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  function getInitials(name: string) {
    return name
      ?.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2) || 'U';
  }

  const isAdmin = profile?.user_type === 'admin';

  // Show loading state while auth is being determined or profile is loading
  if (authLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 rounded-lg bg-white shadow-md">
          <div className="animate-spin w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-center text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Determine which dashboard to render based on user type
  const getDashboardComponent = () => {
    console.log("Getting dashboard component for user type:", userType);
    switch (userType) {
      case "user":
        return <UserDashboard key={`user-dashboard-${profile.id}`} />;
      case "kabadiwalla":
        return <KabadiwallaDashboard key={`kabadiwalla-dashboard-${profile.id}`} />;
      case "recycler":
        return <RecyclerDashboard key={`recycler-dashboard-${profile.id}`} />;
      default:
        return <UserDashboard key={`default-dashboard-${profile.id}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-eco-green-600 font-bold">
              <Recycle className="h-6 w-6 mr-2" />
              <span className="text-xl">VentureTech</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* For demo purposes - user type selector */}
            {isAdmin && (
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin')}
                className="hidden md:flex"
              >
                Admin Dashboard
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">3</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={profile?.avatar_url || ""} alt={profile?.name || ""} />
                      <AvatarFallback className="bg-green-100 text-green-800">
                        {getInitials(profile?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="mr-1 hidden md:block">{profile?.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab('dashboard')}>
                  <Recycle className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'dashboard' ? (
                    <>
                      {userType === "user" && "User Dashboard"}
                      {userType === "kabadiwalla" && "Kabadiwalla Dashboard"}
                      {userType === "recycler" && "Recycler Dashboard"}
                    </>
                  ) : (
                    "Profile Settings"
                  )}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'dashboard' ? (
                    <>
                      {userType === "user" && "Manage your e-waste collections and karma points"}
                      {userType === "kabadiwalla" && "Manage your e-waste collections and recycler connections"}
                      {userType === "recycler" && "Track your e-waste processing and kabadiwalla network"}
                    </>
                  ) : (
                    "Manage your account information and preferences"
                  )}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {activeTab === 'dashboard' ? (
                  <Button onClick={() => setActiveTab('profile')} variant="outline" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                ) : (
                  <Button onClick={() => setActiveTab('dashboard')} variant="outline" className="flex items-center gap-1">
                    <Recycle className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Button>
                )}
                
                {userType === 'user' && activeTab === 'dashboard' && (
                  <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Request Pickup</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {activeTab === 'dashboard' ? (
            <div key={`dashboard-content-${userType}`}>
              {getDashboardComponent()}
            </div>
          ) : (
            <div key="profile-content">
              <ProfileSettings key={`profile-${profile.id}`} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
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

export default Dashboard;
