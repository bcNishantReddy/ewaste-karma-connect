
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, ShoppingBag } from 'lucide-react';
import { Tables } from "@/integrations/supabase/types";

type RewardItem = Tables<'karma_store'>;
type Redemption = Tables<'redemptions'> & {
  item?: {
    title?: string;
    points?: number;
    image_url?: string;
    description?: string;
  };
};

interface RewardsMarketplaceProps {
  rewards: RewardItem[];
  redemptions: Redemption[];
  karmaPoints: number;
  onClaimReward: (reward: RewardItem) => Promise<boolean>;
}

const RewardsMarketplace: React.FC<RewardsMarketplaceProps> = ({
  rewards,
  redemptions,
  karmaPoints,
  onClaimReward
}) => {
  return (
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
            <span className="font-medium text-amber-700">{karmaPoints} points</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {rewards.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No rewards are currently available. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="border rounded-lg p-4 flex">
                <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center mr-4 flex-shrink-0">
                  {reward.image_url ? (
                    <img 
                      src={reward.image_url} 
                      alt={reward.title} 
                      className="w-full h-full object-cover rounded-md" 
                    />
                  ) : (
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{reward.title}</h4>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      {reward.points} pts
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
                  <Button
                    className={`mt-3 ${karmaPoints >= reward.points ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
                    size="sm"
                    onClick={() => onClaimReward(reward)}
                    disabled={karmaPoints < reward.points || (reward.stock !== null && reward.stock <= 0)}
                  >
                    {karmaPoints >= reward.points 
                      ? (reward.stock !== null && reward.stock <= 0 ? 'Out of stock' : 'Redeem') 
                      : `Need ${reward.points - karmaPoints} more`}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {redemptions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Your Redemption History</h3>
            <div className="space-y-3">
              {redemptions.map((redemption) => (
                <div key={redemption.id} className="flex items-center p-3 border rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <ShoppingBag className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-medium">{redemption.item?.title || 'Reward Item'}</p>
                      <p className="text-sm text-amber-600">-{redemption.points_used} pts</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Redeemed on {new Date(redemption.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        redemption.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        redemption.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {redemption.status?.charAt(0).toUpperCase() + redemption.status?.slice(1)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-gray-500">
          New rewards are added every month. Keep recycling to earn more points!
        </p>
      </CardFooter>
    </Card>
  );
};

export default RewardsMarketplace;
