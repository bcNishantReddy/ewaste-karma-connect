
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
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

// Define a simple response type for our RPC function
interface RedeemResponse {
  success: boolean;
  message: string;
  redemption_id?: string;
}

export function useRewards(userId?: string) {
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const { toast } = useToast();

  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('karma_store')
        .select('*')
        .order('points', { ascending: true });
      
      if (error) throw error;
      setRewards(data || []);
    } catch (err: any) {
      console.error('Error fetching rewards:', err);
    }
  };

  const fetchRedemptions = async () => {
    try {
      if (!userId) return;
      
      const { data, error } = await supabase
        .from('redemptions')
        .select('*, item:item_id(title, points, image_url, description)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRedemptions(data || []);
    } catch (err: any) {
      console.error('Error fetching redemptions:', err);
    }
  };

  const claimReward = async (reward: RewardItem) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please log in to claim rewards",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      // Use type assertion to fix the type error
      const { data, error } = await supabase.functions.invoke<RedeemResponse>('redeem-karma-item', {
        body: {
          item_id: reward.id,
          user_id: userId
        }
      });
      
      if (error) throw error;
      
      if (data) {
        if (data.success) {
          toast({
            title: `Reward Claimed: ${reward.title}`,
            description: `You have used ${reward.points} karma points. We'll send you details via email.`,
          });
          
          await fetchRewards();
          await fetchRedemptions();
          return true;
        } else {
          toast({
            title: "Claim failed",
            description: data.message || "You don't have enough karma points",
            variant: "destructive"
          });
        }
      }
      return false;
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error claiming reward",
        description: err.message,
      });
      return false;
    }
  };

  useEffect(() => {
    fetchRewards();
    if (userId) {
      fetchRedemptions();
    }
  }, [userId]);

  return { 
    rewards, 
    redemptions, 
    fetchRewards, 
    fetchRedemptions, 
    claimReward 
  };
}
