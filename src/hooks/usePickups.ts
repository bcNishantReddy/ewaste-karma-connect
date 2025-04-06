
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Tables } from "@/integrations/supabase/types";

type PickupHistory = Tables<'pickups'>;

export function usePickups(userId?: string) {
  const [pickupHistory, setPickupHistory] = useState<PickupHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchPickupHistory = async () => {
    try {
      if (!userId) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from('pickups')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPickupHistory(data || []);
    } catch (err: any) {
      console.error('Error fetching pickup history:', err);
      toast({
        title: "Error fetching pickup history",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const submitPickupRequest = async (pickupData: {
    user_id: string;
    items: string;
    location: string;
    pickup_date: string | null;
    pickup_time: string | null;
  }) => {
    try {
      setSubmitting(true);
      
      const { data, error } = await supabase
        .from('pickups')
        .insert([{
          ...pickupData,
          status: 'pending',
          points: Math.floor(Math.random() * 100) + 50,
        }])
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Pickup Request Submitted",
        description: "A kabadiwalla will contact you soon for pickup.",
      });
      
      await fetchPickupHistory();
      return true;
      
    } catch (err: any) {
      console.error('Error submitting pickup request:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to submit pickup request",
        variant: "destructive"
      });
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchPickupHistory();
    }
  }, [userId]);

  return { 
    pickupHistory, 
    loading, 
    submitting, 
    fetchPickupHistory, 
    submitPickupRequest 
  };
}
