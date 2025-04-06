
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, RecycleIcon, ShoppingBag } from 'lucide-react';
import { Tables } from "@/integrations/supabase/types";

type PickupHistory = Tables<'pickups'>;
type Redemption = Tables<'redemptions'>;

interface UserStatsProps {
  karmaPoints: number;
  pickupHistory: PickupHistory[];
  redemptions: Redemption[];
  onTabChange: (tab: string) => void;
}

const UserStats: React.FC<UserStatsProps> = ({ 
  karmaPoints, 
  pickupHistory, 
  redemptions, 
  onTabChange 
}) => {
  const level = Math.floor(karmaPoints / 250) + 1;
  const nextLevel = level * 250;
  const progress = (karmaPoints % 250) / 250 * 100;

  return (
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
          <div className="text-3xl font-bold text-amber-500">{karmaPoints}</div>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {nextLevel - karmaPoints} points to next level
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
          <div className="text-3xl font-bold text-green-600">{pickupHistory.length}</div>
          <p className="text-sm text-muted-foreground mt-2">
            Total successful pickups
          </p>
          <Button variant="link" className="p-0 h-auto mt-2 text-green-600" onClick={() => onTabChange("pickups")}>
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
          <div className="text-3xl font-bold text-purple-600">{redemptions.length}</div>
          <p className="text-sm text-muted-foreground mt-2">
            Rewards claimed so far
          </p>
          <Button variant="link" className="p-0 h-auto mt-2 text-purple-600" onClick={() => onTabChange("rewards")}>
            Browse rewards
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
