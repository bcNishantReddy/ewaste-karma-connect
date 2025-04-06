
import React from 'react';
import { CardContent, Card } from '@/components/ui/card';
import { CircleCheck, ShieldCheck, Zap, Leaf, Users, BarChart3 } from 'lucide-react';

const About = () => {
  const environmentalImpacts = [
    {
      icon: <Leaf className="h-8 w-8 text-eco-green-500" />,
      title: "Reducing Landfill Waste",
      description: "Each recycled device means less toxic materials entering our environment."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-eco-green-500" />,
      title: "Resource Conservation",
      description: "Recycling e-waste recovers valuable metals that don't need to be newly mined."
    },
    {
      icon: <Zap className="h-8 w-8 text-eco-green-500" />,
      title: "Energy Savings",
      description: "Reusing materials requires much less energy than processing raw materials."
    }
  ];

  const economicBenefits = [
    {
      icon: <Users className="h-8 w-8 text-eco-blue-500" />,
      title: "Kabadiwalla Empowerment",
      description: "Technology access and direct recycler connections boost incomes for local collectors."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-eco-blue-500" />,
      title: "Circular Economy",
      description: "Creating jobs while transforming waste into valuable resources and new products."
    },
    {
      icon: <CircleCheck className="h-8 w-8 text-eco-blue-500" />,
      title: "Reducing Costs",
      description: "Streamlined collection processes lower operational costs for recyclers."
    }
  ];

  return (
    <div id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why E-Waste Recycling Matters
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            VentureTech is committed to transforming the e-waste challenge into an environmental and economic opportunity
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Environmental Impact</h3>
              <Card className="bg-white/50 border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {environmentalImpacts.map((item, index) => (
                      <div key={index} className="flex p-6 transition-all hover:bg-gray-50">
                        <div className="flex-shrink-0 mr-4">{item.icon}</div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                          <p className="mt-1 text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Economic Benefits</h3>
              <Card className="bg-white/50 border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {economicBenefits.map((item, index) => (
                      <div key={index} className="flex p-6 transition-all hover:bg-gray-50">
                        <div className="flex-shrink-0 mr-4">{item.icon}</div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                          <p className="mt-1 text-gray-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-eco-green-50 rounded-lg p-8 border border-eco-green-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900">The E-Waste Crisis</h3>
            <p className="mt-4 text-lg text-gray-600">
              India generates over 3.2 million tons of e-waste annually, growing at 30% per year. Less than 5% is formally recycled.
              VentureTech's network-based approach leverages existing kabadiwalla infrastructure to dramatically increase collection rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
