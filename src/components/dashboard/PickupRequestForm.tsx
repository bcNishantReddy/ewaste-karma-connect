
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Image, MapPin, Plus, RecycleIcon } from 'lucide-react';

interface PickupRequestFormProps {
  userLocation: string;
  onLocationChange: (location: string) => void;
  onSubmit: (data: {
    items: string;
    location: string;
    pickup_date: string | null;
    pickup_time: string | null;
  }) => Promise<boolean>;
  submitting: boolean;
}

const PickupRequestForm: React.FC<PickupRequestFormProps> = ({
  userLocation,
  onLocationChange,
  onSubmit,
  submitting
}) => {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await onSubmit({
      items,
      location: userLocation,
      pickup_date: pickupDate || null,
      pickup_time: pickupTime || null,
    });
    
    if (success) {
      setShowForm(false);
      setItems('');
      setPickupDate('');
      setPickupTime('');
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <RecycleIcon className="mr-2 h-5 w-5 text-green-600" />
          Request E-waste Pickup
        </CardTitle>
        <CardDescription>
          Schedule a pickup for your electronic waste
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-6 flex flex-col items-center justify-center text-center space-y-4 border border-dashed border-gray-300 rounded-lg">
          <div className="bg-green-100 rounded-full p-3">
            <RecycleIcon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Do you have e-waste that needs to be recycled responsibly?
            </p>
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" /> Request Pickup
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Request E-waste Pickup</DialogTitle>
                  <DialogDescription>
                    Tell us about the e-waste you need collected
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Address</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <MapPin className="h-4 w-4" />
                      </span>
                      <Input 
                        value={userLocation} 
                        onChange={(e) => onLocationChange(e.target.value)} 
                        className="rounded-l-none" 
                        placeholder="Your full address" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Date</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <Input 
                          className="rounded-l-none" 
                          type="date" 
                          min={new Date().toISOString().split('T')[0]}
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Time</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                          <Clock className="h-4 w-4" />
                        </span>
                        <Input 
                          className="rounded-l-none" 
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description of Items</label>
                    <Textarea 
                      placeholder="Describe the electronic waste items you have (e.g., 1 laptop, 2 mobile phones, etc.)" 
                      className="min-h-[100px]"
                      value={items}
                      onChange={(e) => setItems(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload Image (Optional)</label>
                    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                      <div className="flex flex-col items-center">
                        <Image className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
                        <input type="file" className="hidden" accept="image/*" />
                        <Button type="button" variant="ghost" size="sm" className="mt-2">
                          Browse
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-green-600 hover:bg-green-700"
                      disabled={submitting}
                    >
                      {submitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PickupRequestForm;
