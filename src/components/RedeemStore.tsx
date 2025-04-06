import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Gift, Award, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Tables } from '@/integrations/supabase/types';

type KarmaStoreItem = Tables<'karma_store'>;

interface RedeemResponse {
  success: boolean;
  message: string;
  redemption_id?: string;
}

const RedeemStore = () => {
  const [redeemItems, setRedeemItems] = useState<KarmaStoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redeeming, setRedeeming] = useState<string | null>(null);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchKarmaItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('karma_store')
          .select('*')
          .order('points', { ascending: true });

        if (error) throw error;
        setRedeemItems(data || []);
      } catch (err: any) {
        console.error('Error fetching karma store items:', err);
        setError(err.message || 'Failed to load karma store items');
      } finally {
        setLoading(false);
      }
    };

    fetchKarmaItems();
  }, []);

  const handleRedeem = async (itemId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to redeem rewards",
        variant: "destructive"
      });
      return;
    }

    try {
      setRedeeming(itemId);
      
      const { data, error } = await supabase.rpc('redeem_karma_item', {
        _item_id: itemId,
        _user_id: user.id
      }) as { data: RedeemResponse | null, error: any };

      if (error) throw error;
      
      if (data) {
        if (data.success) {
          toast({
            title: "Redemption successful",
            description: "Your reward has been redeemed successfully!",
          });
          
          const { data: refreshedItems } = await supabase
            .from('karma_store')
            .select('*')
            .order('points', { ascending: true });
            
          if (refreshedItems) {
            setRedeemItems(refreshedItems);
          }
        } else {
          toast({
            title: "Redemption failed",
            description: data.message || "There was an error processing your redemption",
            variant: "destructive"
          });
        }
      }
    } catch (err: any) {
      console.error('Error redeeming item:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to redeem item",
        variant: "destructive"
      });
    } finally {
      setRedeeming(null);
    }
  };

  if (loading) {
    return (
      <div id="redeem-store" className="py-16 bg-white flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-eco-green-600 mb-2" />
          <p className="text-gray-500">Loading karma store items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="redeem-store" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">Error loading karma store: {error}</p>
        </div>
      </div>
    );
  }

  if (redeemItems.length === 0) {
    return (
      <div id="redeem-store" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-green-100 text-eco-green-800 mb-4">
            <Award className="h-4 w-4 mr-1" />
            Karma Rewards
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Redeem Your Karma Points
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            No items are currently available in the karma store. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="redeem-store" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-green-100 text-eco-green-800 mb-4">
            <Award className="h-4 w-4 mr-1" />
            Karma Rewards
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Redeem Your Karma Points
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Turn your environmental contributions into sustainable products
          </p>
          {profile && (
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800">
              <Award className="h-4 w-4 mr-1" />
              <span>Your Karma Balance: {profile.karma_points || 0} points</span>
            </div>
          )}
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {redeemItems.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className={`h-48 bg-eco-green-200 flex items-center justify-center`}>
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <Gift className="h-16 w-16 text-gray-600/30" />
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-eco-green-600 font-semibold">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{item.points} Karma Points</span>
                  </div>
                  {item.stock !== null && (
                    <div className="text-sm text-gray-500 mt-1">
                      {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {user ? (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={
                        item.stock === 0 || 
                        redeeming === item.id || 
                        (profile?.karma_points || 0) < item.points
                      }
                      onClick={() => handleRedeem(item.id)}
                    >
                      {redeeming === item.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Redeeming...
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          {(profile?.karma_points || 0) < item.points 
                            ? `Need ${item.points - (profile?.karma_points || 0)} more points` 
                            : 'Redeem Now'
                          }
                        </>
                      )}
                    </Button>
                  ) : (
                    <Link to="/login" className="w-full">
                      <Button 
                        variant="outline" 
                        className="w-full"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Login to Redeem
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to={user ? "/dashboard" : "/login"}>
              <Button className="bg-eco-green-600 hover:bg-eco-green-700 px-6 py-3">
                View Full Karma Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemStore;
