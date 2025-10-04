import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Car, Calendar, Fuel, MapPin } from 'lucide-react';

const VehicleInfoStep = () => {
  const { data, updateVehicleInfo } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-card">
        <h3 className="text-2xl font-bold text-foreground mb-6">Tell us about your vehicle</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vehicle Type */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Car className="w-4 h-4 text-primary" />
              Vehicle Type
            </Label>
            <Select
              value={data.vehicleInfo.vehicleType}
              onValueChange={(value) => updateVehicleInfo({ vehicleType: value })}
            >
              <SelectTrigger className="bg-background border-border rounded-xl h-12">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bike">Bike</SelectItem>
                <SelectItem value="commercial">Commercial Vehicle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Make */}
          <div className="space-y-2">
            <Label className="text-foreground">Make</Label>
            <Input
              placeholder="e.g., Maruti, Honda"
              value={data.vehicleInfo.make || ''}
              onChange={(e) => updateVehicleInfo({ make: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Model */}
          <div className="space-y-2">
            <Label className="text-foreground">Model</Label>
            <Input
              placeholder="e.g., Swift, City"
              value={data.vehicleInfo.model || ''}
              onChange={(e) => updateVehicleInfo({ model: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Fuel Type */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Fuel className="w-4 h-4 text-primary" />
              Fuel Type
            </Label>
            <Select
              value={data.vehicleInfo.fuelType}
              onValueChange={(value) => updateVehicleInfo({ fuelType: value })}
            >
              <SelectTrigger className="bg-background border-border rounded-xl h-12">
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="petrol">Petrol</SelectItem>
                <SelectItem value="diesel">Diesel</SelectItem>
                <SelectItem value="ev">Electric</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Year */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              Year of Manufacture
            </Label>
            <Input
              type="number"
              placeholder="2020"
              value={data.vehicleInfo.year || ''}
              onChange={(e) => updateVehicleInfo({ year: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Variant */}
          <div className="space-y-2">
            <Label className="text-foreground">Variant</Label>
            <Input
              placeholder="e.g., VXI, ZXI"
              value={data.vehicleInfo.variant || ''}
              onChange={(e) => updateVehicleInfo({ variant: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              City of Registration
            </Label>
            <Input
              placeholder="e.g., Mumbai"
              value={data.vehicleInfo.city || ''}
              onChange={(e) => updateVehicleInfo({ city: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label className="text-foreground">State</Label>
            <Input
              placeholder="e.g., Maharashtra"
              value={data.vehicleInfo.state || ''}
              onChange={(e) => updateVehicleInfo({ state: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Annual Mileage */}
          <div className="space-y-2">
            <Label className="text-foreground">Annual Mileage (km)</Label>
            <Input
              type="number"
              placeholder="15000"
              value={data.vehicleInfo.annualMileage || ''}
              onChange={(e) => updateVehicleInfo({ annualMileage: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Primary Use */}
          <div className="space-y-2">
            <Label className="text-foreground">Primary Use</Label>
            <Select
              value={data.vehicleInfo.primaryUse}
              onValueChange={(value) => updateVehicleInfo({ primaryUse: value })}
            >
              <SelectTrigger className="bg-background border-border rounded-xl h-12">
                <SelectValue placeholder="Select use" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleInfoStep;
