import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { FileText, Shield, AlertCircle } from 'lucide-react';

const addOnOptions = [
  { id: 'zero-dep', label: 'Zero Depreciation' },
  { id: 'roadside', label: 'Roadside Assistance' },
  { id: 'engine', label: 'Engine Protection' },
  { id: 'ncb', label: 'NCB Protection' },
  { id: 'return-invoice', label: 'Return to Invoice' },
];

const PolicyInfoStep = () => {
  const { data, updatePolicyInfo } = useOnboarding();

  const toggleAddOn = (addOnId: string) => {
    const currentAddOns = data.policyInfo.addOns || [];
    const newAddOns = currentAddOns.includes(addOnId)
      ? currentAddOns.filter(id => id !== addOnId)
      : [...currentAddOns, addOnId];
    updatePolicyInfo({ addOns: newAddOns });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-card">
        <h3 className="text-2xl font-bold text-foreground mb-6">Policy preferences</h3>
        
        <div className="space-y-6">
          {/* Existing Policy */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-foreground text-lg">
              <FileText className="w-5 h-5 text-primary" />
              Do you have an existing policy?
            </Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={data.policyInfo.existingPolicy === true ? 'default' : 'outline'}
                onClick={() => updatePolicyInfo({ existingPolicy: true })}
                className="flex-1 h-12 rounded-xl"
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={data.policyInfo.existingPolicy === false ? 'default' : 'outline'}
                onClick={() => updatePolicyInfo({ existingPolicy: false })}
                className="flex-1 h-12 rounded-xl"
              >
                No
              </Button>
            </div>
          </div>

          {/* Show these fields if existing policy is true */}
          {data.policyInfo.existingPolicy && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <Label className="text-foreground">Previous Insurer</Label>
                <Input
                  placeholder="e.g., HDFC Ergo"
                  value={data.policyInfo.insurerName || ''}
                  onChange={(e) => updatePolicyInfo({ insurerName: e.target.value })}
                  className="bg-background border-border rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Policy Expiry Date</Label>
                <Input
                  type="date"
                  value={data.policyInfo.expiryDate || ''}
                  onChange={(e) => updatePolicyInfo({ expiryDate: e.target.value })}
                  className="bg-background border-border rounded-xl h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">NCB Percentage</Label>
                <Select
                  value={data.policyInfo.ncbPercentage}
                  onValueChange={(value) => updatePolicyInfo({ ncbPercentage: value })}
                >
                  <SelectTrigger className="bg-background border-border rounded-xl h-12">
                    <SelectValue placeholder="Select NCB %" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="20">20%</SelectItem>
                    <SelectItem value="25">25%</SelectItem>
                    <SelectItem value="35">35%</SelectItem>
                    <SelectItem value="45">45%</SelectItem>
                    <SelectItem value="50">50%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}

          {/* Claim History */}
          <div className="space-y-4">
            <Label className="flex items-center gap-2 text-foreground text-lg">
              <AlertCircle className="w-5 h-5 text-primary" />
              Any claims in the last 3 years?
            </Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={data.policyInfo.claimHistory === true ? 'default' : 'outline'}
                onClick={() => updatePolicyInfo({ claimHistory: true })}
                className="flex-1 h-12 rounded-xl"
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={data.policyInfo.claimHistory === false ? 'default' : 'outline'}
                onClick={() => updatePolicyInfo({ claimHistory: false })}
                className="flex-1 h-12 rounded-xl"
              >
                No
              </Button>
            </div>
          </div>

          {data.policyInfo.claimHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Label className="text-foreground">Number of Claims</Label>
              <Input
                type="number"
                placeholder="1"
                value={data.policyInfo.numberOfClaims || ''}
                onChange={(e) => updatePolicyInfo({ numberOfClaims: e.target.value })}
                className="bg-background border-border rounded-xl h-12"
              />
            </motion.div>
          )}

          {/* Coverage Type */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-foreground">
              <Shield className="w-4 h-4 text-primary" />
              Desired Coverage Type
            </Label>
            <Select
              value={data.policyInfo.desiredCoverageType}
              onValueChange={(value) => updatePolicyInfo({ desiredCoverageType: value })}
            >
              <SelectTrigger className="bg-background border-border rounded-xl h-12">
                <SelectValue placeholder="Select coverage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
                <SelectItem value="third-party">Third-Party Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add-ons */}
          <div className="space-y-4">
            <Label className="text-foreground text-lg">Select Add-ons</Label>
            <div className="grid md:grid-cols-2 gap-4">
              {addOnOptions.map((addon) => (
                <div
                  key={addon.id}
                  className="flex items-center space-x-3 bg-background border border-border rounded-xl p-4 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => toggleAddOn(addon.id)}
                >
                  <Checkbox
                    id={addon.id}
                    checked={(data.policyInfo.addOns || []).includes(addon.id)}
                    onCheckedChange={() => toggleAddOn(addon.id)}
                  />
                  <Label
                    htmlFor={addon.id}
                    className="text-foreground cursor-pointer flex-1"
                  >
                    {addon.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Duration */}
          <div className="space-y-2">
            <Label className="text-foreground">Policy Duration</Label>
            <Select
              value={data.policyInfo.policyDuration}
              onValueChange={(value) => updatePolicyInfo({ policyDuration: value })}
            >
              <SelectTrigger className="bg-background border-border rounded-xl h-12">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-year">1 Year</SelectItem>
                <SelectItem value="3-year">3 Years (Long-term)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PolicyInfoStep;
