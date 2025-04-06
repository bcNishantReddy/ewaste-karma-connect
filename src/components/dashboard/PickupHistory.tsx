
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, Clock, MapPin, MoreHorizontal, RecycleIcon } from 'lucide-react';
import { Tables } from "@/integrations/supabase/types";

type PickupHistory = Tables<'pickups'>;

interface PickupHistoryProps {
  pickups: PickupHistory[];
  loading: boolean;
  limit?: number;
  title?: string;
  description?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

const PickupHistoryComponent: React.FC<PickupHistoryProps> = ({
  pickups,
  loading,
  limit,
  title = "Your Collection History",
  description = "Recent e-waste pickups",
  showViewAll = false,
  onViewAll
}) => {
  const limitedPickups = limit ? pickups.slice(0, limit) : pickups;

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <RecycleIcon className="mr-2 h-5 w-5 text-blue-600" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {limitedPickups.length === 0 ? (
            <p className="text-center text-gray-500 py-4">You don't have any pickup history yet. Request your first pickup!</p>
          ) : (
            limitedPickups.map((pickup) => (
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
                  {pickup.kabadiwala_id && (
                    <div className="text-xs text-gray-500">
                      Collected by: {pickup.kabadiwala_id ? 'Assigned Collector' : 'Awaiting Assignment'}
                    </div>
                  )}
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
            ))
          )}
        </div>
        {showViewAll && pickups.length > 0 && (
          <Button variant="link" className="mt-4 p-0" onClick={onViewAll}>
            View all pickup history
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PickupHistoryComponent;
