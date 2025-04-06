
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Recycle } from 'lucide-react';

const KabadiwalaMap = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Growing Network
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            VentureTech is building India's largest network of kabadiwallas to revolutionize e-waste collection
          </p>
        </div>

        <div className="mt-12 relative">
          <Card className="overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="relative">
                {/* India Map SVG Background */}
                <div className="h-96 bg-gray-100 relative">
                  <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                    <path d="M400,50 Q550,150 500,300 Q450,450 400,550 Q350,450 300,300 Q250,150 400,50" fill="#0f766e" />
                  </svg>
                  
                  {/* Animated Connection Points */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                    <div className="h-4 w-4 bg-eco-green-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                    <div className="h-4 w-4 bg-eco-green-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                    <div className="h-4 w-4 bg-eco-green-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                    <div className="h-4 w-4 bg-eco-green-500 rounded-full"></div>
                  </div>
                  <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                    <div className="h-4 w-4 bg-eco-green-500 rounded-full"></div>
                  </div>
                  
                  {/* Connection Lines - Animated */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
                    <line x1="200" y1="150" x2="400" y2="200" stroke="#0f766e" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                    </line>
                    <line x1="400" y1="200" x2="300" y2="400" stroke="#0f766e" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                    </line>
                    <line x1="300" y1="400" x2="500" y2="300" stroke="#0f766e" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                    </line>
                    <line x1="500" y1="300" x2="600" y2="450" stroke="#0f766e" strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                    </line>
                  </svg>
                  
                  {/* City Labels */}
                  <div className="absolute top-1/4 left-1/4 transform translate-x-4">
                    <div className="text-xs font-semibold bg-white px-2 py-1 rounded shadow">Delhi</div>
                  </div>
                  <div className="absolute top-1/3 left-1/2 transform translate-x-4">
                    <div className="text-xs font-semibold bg-white px-2 py-1 rounded shadow">Mumbai</div>
                  </div>
                  <div className="absolute top-2/3 left-1/3 transform translate-x-4">
                    <div className="text-xs font-semibold bg-white px-2 py-1 rounded shadow">Bangalore</div>
                  </div>
                  <div className="absolute top-1/2 left-2/3 transform translate-x-4">
                    <div className="text-xs font-semibold bg-white px-2 py-1 rounded shadow">Chennai</div>
                  </div>
                  <div className="absolute top-3/4 left-3/4 transform translate-x-4">
                    <div className="text-xs font-semibold bg-white px-2 py-1 rounded shadow">Kolkata</div>
                  </div>
                
                  {/* Network Stats Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
                      <h3 className="text-2xl font-bold text-gray-900">Building a Nationwide Network</h3>
                      <p className="text-gray-600 mt-2">
                        VentureTech connects kabadiwallas, users, and recyclers across India
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-6">
                        <div className="flex flex-col items-center">
                          <MapPin className="h-8 w-8 text-eco-green-500 mb-2" />
                          <div className="text-2xl font-bold text-gray-900">15+</div>
                          <div className="text-sm text-gray-600">Cities</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <Users className="h-8 w-8 text-eco-blue-500 mb-2" />
                          <div className="text-2xl font-bold text-gray-900">200+</div>
                          <div className="text-sm text-gray-600">Kabadiwallas</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <Recycle className="h-8 w-8 text-eco-orange-500 mb-2" />
                          <div className="text-2xl font-bold text-gray-900">20+</div>
                          <div className="text-sm text-gray-600">Recyclers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KabadiwalaMap;
