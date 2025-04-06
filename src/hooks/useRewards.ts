
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

  // Simplified version that just shows a toast and returns false
  const claimReward = async (reward: RewardItem) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please log in to claim rewards",
        variant: "destructive"
      });
      return false;
    }
    
    toast({
      title: "Feature temporarily disabled",
      description: "Reward claiming is currently unavailable. Please try again later.",
      variant: "destructive"
    });
    
    return false;
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
