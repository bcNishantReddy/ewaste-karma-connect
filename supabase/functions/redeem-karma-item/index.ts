
// Follow Supabase Edge Function format
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RedeemResponse {
  success: boolean;
  message: string;
  redemption_id?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get request body
    const { item_id, user_id } = await req.json();
    
    if (!item_id || !user_id) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Missing required parameters" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Get the user's current karma points
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('karma_points')
      .eq('id', user_id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Could not fetch user data" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Get the item details
    const { data: item, error: itemError } = await supabase
      .from('karma_store')
      .select('*')
      .eq('id', item_id)
      .single();

    if (itemError) {
      console.error('Error fetching item:', itemError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Could not fetch item data" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Check if the user has enough points
    if (userProfile.karma_points < item.points) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "You don't have enough karma points" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Check if the item is in stock
    if (item.stock !== null && item.stock <= 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "This item is out of stock" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Begin a transaction to update points and create redemption record
    const { data: redemption, error: redemptionError } = await supabase
      .from('redemptions')
      .insert({
        user_id: user_id,
        item_id: item_id,
        points_used: item.points,
        status: 'pending'
      })
      .select()
      .single();

    if (redemptionError) {
      console.error('Error creating redemption:', redemptionError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to create redemption record" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Update user's karma points
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ karma_points: userProfile.karma_points - item.points })
      .eq('id', user_id);

    if (updateError) {
      console.error('Error updating user points:', updateError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Failed to update karma points" 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // If the item has stock, decrement it
    if (item.stock !== null) {
      const { error: stockError } = await supabase
        .from('karma_store')
        .update({ stock: item.stock - 1 })
        .eq('id', item_id);

      if (stockError) {
        console.error('Error updating item stock:', stockError);
        // Continue anyway since the redemption is already created
      }
    }

    // Success response
    const response: RedeemResponse = {
      success: true,
      message: "Redemption successful",
      redemption_id: redemption.id
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    console.error("Error processing redemption:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
