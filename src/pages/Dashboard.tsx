
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Recycle, User, Bell, Settings, LogOut, ChevronDown } from "lucide-react";
import UserDashboard from "@/components/dashboard/UserDashboard";
import KabadiwallaDashboard from "@/components/dashboard/KabadiwallaDashboard";
import RecyclerDashboard from "@/components/dashboard/RecyclerDashboard";

const Dashboard = () => {
  // In a real application, this would come from authentication context
  // For demo purposes, we'll use state and allow switching between dashboards
  const [userType, setUserType] = useState("user"); // "user", "kabadiwalla", "recycler"
  const [userName, setUserName] = useState("John Doe");

  const renderDashboard = () => {
    switch (userType) {
      case "user":
        return <UserDashboard />;
      case "kabadiwalla":
        return <KabadiwallaDashboard />;
      case "recycler":
        return <RecyclerDashboard />;
      default:
        return <UserDashboard />;
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
              <span className="text-xl">E-Waste Karma Connect</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* For demo purposes - user type selector */}
            <Tabs
              value={userType}
              onValueChange={setUserType}
              className="hidden md:block"
            >
              <TabsList>
                <TabsTrigger value="user">User View</TabsTrigger>
                <TabsTrigger value="kabadiwalla">Kabadiwalla View</TabsTrigger>
                <TabsTrigger value="recycler">Recycler View</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bell className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-eco-green-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-eco-green-600" />
                    </div>
                    <span className="ml-2 mr-1 hidden md:block">{userName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {/* Mobile user type selector */}
                <div className="md:hidden">
                  <DropdownMenuItem onClick={() => setUserType("user")}>
                    Switch to User View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUserType("kabadiwalla")}>
                    Switch to Kabadiwalla View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setUserType("recycler")}>
                    Switch to Recycler View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>
                
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
            <h1 className="text-2xl font-bold text-gray-900">
              {userType === "user" && "User Dashboard"}
              {userType === "kabadiwalla" && "Kabadiwalla Dashboard"}
              {userType === "recycler" && "Recycler Dashboard"}
            </h1>
            <p className="text-gray-600 mt-1">
              {userType === "user" && "Manage your e-waste collections and karma points"}
              {userType === "kabadiwalla" && "Manage your e-waste collections and recycler connections"}
              {userType === "recycler" && "Track your e-waste processing and kabadiwalla network"}
            </p>
          </div>
          
          {renderDashboard()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} E-Waste Karma Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
