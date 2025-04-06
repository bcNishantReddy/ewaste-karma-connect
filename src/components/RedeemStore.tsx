
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Gift, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const RedeemStore = () => {
  const redeemItems = [
    {
      id: 1,
      title: 'Recycled Notebook',
      description: 'Made from 100% recycled e-waste materials',
      points: 250,
      image: 'bg-eco-green-200'
    },
    {
      id: 2,
      title: 'Eco-Friendly Planter',
      description: 'Created from reclaimed plastic components',
      points: 350,
      image: 'bg-eco-blue-200'
    },
    {
      id: 3,
      title: 'Recycled Metal Pen',
      description: 'Crafted from recovered metals from circuit boards',
      points: 150,
      image: 'bg-eco-orange-200'
    },
    {
      id: 4,
      title: 'E-waste Art Piece',
      description: 'Beautiful art created from recycled electronic parts',
      points: 500,
      image: 'bg-eco-green-200'
    }
  ];

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
                <div className={`h-48 ${item.image} flex items-center justify-center`}>
                  <Gift className="h-16 w-16 text-gray-600/30" />
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
                </CardContent>
                <CardFooter>
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Redeem Now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/login">
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
