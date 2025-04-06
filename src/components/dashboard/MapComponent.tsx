
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Map, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

// Mock data for the map markers
const generateRandomPoints = (center: { lat: number; lng: number }, radius: number, count: number) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.sqrt(Math.random()) * radius;
    const lat = center.lat + distance * Math.cos(angle) * 0.009;
    const lng = center.lng + distance * Math.sin(angle) * 0.009;
    points.push({
      lat,
      lng,
      type: Math.random() > 0.5 ? 'pickup' : 'dropoff',
      title: Math.random() > 0.5 ? 'E-waste Collection' : 'Recycling Center',
    });
  }
  return points;
};

type MapPoint = {
  lat: number;
  lng: number;
  type: 'pickup' | 'dropoff' | 'user' | 'kabadiwalla' | 'recycler';
  title: string;
};

interface MapComponentProps {
  userType: 'user' | 'kabadiwalla' | 'recycler';
  center?: { lat: number; lng: number };
  height?: string;
  title?: string;
  description?: string;
  pointsCount?: number;
  showRefreshButton?: boolean;
  onlyShowRelevant?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  userType,
  center = { lat: 28.6139, lng: 77.2090 }, // Default to Delhi coordinates
  height = '400px',
  title = 'Location Map',
  description = 'View nearby locations',
  pointsCount = 10,
  showRefreshButton = true,
  onlyShowRelevant = false,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const determineRelevantTypes = () => {
    switch(userType) {
      case 'user':
        return ['kabadiwalla']; // Users see kabadiwallas
      case 'kabadiwalla':
        return ['user', 'recycler']; // Kabadiwallas see users and recyclers
      case 'recycler':
        return ['kabadiwalla']; // Recyclers see kabadiwallas
      default:
        return ['user', 'kabadiwalla', 'recycler'];
    }
  };

  const refreshPoints = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate random points around the center
      const newPoints = generateRandomPoints(center, 5, pointsCount).map(point => ({
        ...point,
        type: Math.random() > 0.6 
          ? 'user' 
          : Math.random() > 0.5 
            ? 'kabadiwalla' 
            : 'recycler',
      }));
      
      // Filter points based on userType if onlyShowRelevant is true
      const relevantTypes = determineRelevantTypes();
      const filteredPoints = onlyShowRelevant 
        ? newPoints.filter(point => relevantTypes.includes(point.type))
        : newPoints;
      
      // Add the user's location
      filteredPoints.push({
        lat: center.lat,
        lng: center.lng,
        type: userType,
        title: 'Your Location'
      });
      
      setPoints(filteredPoints);
      setLoading(false);
      
      toast({
        title: "Map updated",
        description: "Nearby locations have been refreshed",
      });
    }, 1000);
  };

  useEffect(() => {
    // Simulating loading a map library
    // In a real application, you would load a map library like Google Maps or Mapbox
    refreshPoints();
    
    const mapElement = mapRef.current;
    if (!mapElement) return;
    
    // Simulating a map being loaded
    mapElement.innerHTML = `
      <div style="position: relative; width: 100%; height: 100%; background-color: #e5f0fa; border-radius: 0.5rem; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center; z-index: 1;">
          <div style="background-color: rgba(255, 255, 255, 0.8); padding: 1rem; border-radius: 0.5rem; text-align: center;">
            <p>Map visualization would appear here</p>
            <p class="text-sm text-gray-500">In a production environment, this would be an interactive map</p>
          </div>
        </div>
      </div>
    `;
    
    // In a real implementation, you would initialize your map here
    
    return () => {
      // Cleanup map instance
    };
  }, [center, pointsCount, userType, onlyShowRelevant]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Map className="h-5 w-5 mr-2 text-green-600" />
              {title}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {showRefreshButton && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshPoints}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} style={{ width: '100%', height, borderRadius: '0.5rem', position: 'relative', overflow: 'hidden' }}>
          {/* Map will be rendered here */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
              <div className="flex flex-col items-center">
                <RefreshCw className="h-8 w-8 animate-spin text-green-600" />
                <span className="mt-2 text-sm font-medium">Loading map...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Nearby locations ({points.length}):</h4>
          <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
            {points.map((point, index) => (
              <div key={index} className="flex items-center text-sm p-2 border rounded-md">
                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
                  point.type === 'user' ? 'bg-blue-100 text-blue-600' : 
                  point.type === 'kabadiwalla' ? 'bg-green-100 text-green-600' : 
                  'bg-purple-100 text-purple-600'
                }`}>
                  <MapPin className="h-3 w-3" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{point.title}</div>
                  <div className="text-xs text-gray-500">
                    {point.type === 'user' ? 'User' : 
                     point.type === 'kabadiwalla' ? 'Kabadiwalla' : 'Recycler'} 
                    {point.type !== userType && ' • '} 
                    {point.type !== userType && point.type === 'user' ? 'Needs Pickup' : 
                     point.type !== userType && point.type === 'kabadiwalla' ? 'Collects E-waste' : 
                     point.type !== userType ? 'Recycling Center' : 'Your Location'}
                  </div>
                </div>
                {point.type !== userType && (
                  <Button variant="ghost" size="sm" className="text-xs">
                    {point.type === 'user' ? 'Collect' : 
                     point.type === 'kabadiwalla' ? 'Contact' : 
                     'Details'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapComponent;
