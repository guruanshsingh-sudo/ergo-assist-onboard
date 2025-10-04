import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { User, Mail, Phone, MapPin, CreditCard, FileText } from 'lucide-react';

const OwnerInfoStep = () => {
  const { data, updateOwnerInfo } = useOnboarding();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-card">
        <h3 className="text-2xl font-bold text-foreground mb-6">Your information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-foreground">
              <User className="w-4 h-4 text-primary" />
              Full Name
            </Label>
            <Input
              placeholder="John Doe"
              value={data.ownerInfo.fullName || ''}
              onChange={(e) => updateOwnerInfo({ fullName: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label className="text-foreground">Age</Label>
            <Input
              type="number"
              placeholder="30"
              value={data.ownerInfo.age || ''}
              onChange={(e) => updateOwnerInfo({ age: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="text-foreground">Gender</Label>
            <Select
              value={data.ownerInfo.gender}
              onValueChange={(value) => updateOwnerInfo({ gender: value })}
            >
              <SelectTrigger className="bg-background border-border rounded-xl h-12">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <Label className="text-foreground">Occupation</Label>
            <Input
              placeholder="Software Engineer"
              value={data.ownerInfo.occupation || ''}
              onChange={(e) => updateOwnerInfo({ occupation: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Phone className="w-4 h-4 text-primary" />
              Mobile Number
            </Label>
            <Input
              type="tel"
              placeholder="+91 98765 43210"
              value={data.ownerInfo.mobile || ''}
              onChange={(e) => updateOwnerInfo({ mobile: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Email */}
          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Mail className="w-4 h-4 text-primary" />
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={data.ownerInfo.email || ''}
              onChange={(e) => updateOwnerInfo({ email: e.target.value })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>

          {/* Address */}
          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-2 text-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              Permanent Address
            </Label>
            <Textarea
              placeholder="Enter your full address"
              value={data.ownerInfo.address || ''}
              onChange={(e) => updateOwnerInfo({ address: e.target.value })}
              className="bg-background border-border rounded-xl min-h-24"
            />
          </div>

          {/* PAN */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <CreditCard className="w-4 h-4 text-primary" />
              PAN Number
            </Label>
            <Input
              placeholder="ABCDE1234F"
              value={data.ownerInfo.pan || ''}
              onChange={(e) => updateOwnerInfo({ pan: e.target.value.toUpperCase() })}
              className="bg-background border-border rounded-xl h-12"
              maxLength={10}
            />
          </div>

          {/* Driving License */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4 text-primary" />
              Driving License Number
            </Label>
            <Input
              placeholder="DL1234567890"
              value={data.ownerInfo.drivingLicense || ''}
              onChange={(e) => updateOwnerInfo({ drivingLicense: e.target.value.toUpperCase() })}
              className="bg-background border-border rounded-xl h-12"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OwnerInfoStep;
