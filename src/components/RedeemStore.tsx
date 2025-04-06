
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Gift, Award, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const RedeemStore = () => {
  const [redeemItems, setRedeemItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

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
                  <Link to={user ? "/dashboard" : "/login"} className="w-full">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      disabled={item.stock === 0}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Redeem Now
                    </Button>
                  </Link>
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
