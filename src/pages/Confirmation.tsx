import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { CheckCircle2, Car, Shield, User, FileText } from 'lucide-react';

const Confirmation = () => {
  const { data } = useOnboarding();

  const planDetails = {
    essential: { name: 'Essential', premium: 8500 },
    preferred: { name: 'Preferred', premium: 12000 },
    premium: { name: 'Premium', premium: 15500 },
  };

  const selectedPlan = data.selectedPlan ? planDetails[data.selectedPlan as keyof typeof planDetails] : null;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary shadow-glow mb-4">
            <CheckCircle2 className="w-12 h-12 text-background" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            All Set!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your insurance quote is ready
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-3xl p-8 shadow-card mb-6"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Policy Summary</h2>

          <div className="space-y-6">
            {/* Vehicle Info */}
            <div className="flex items-start gap-4 pb-6 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Vehicle Details</h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Vehicle:</span> {data.vehicleInfo.make} {data.vehicleInfo.model}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Year:</span> {data.vehicleInfo.year}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Fuel:</span> {data.vehicleInfo.fuelType}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">City:</span> {data.vehicleInfo.city}
                  </p>
                </div>
              </div>
            </div>

            {/* Plan Info */}
            <div className="flex items-start gap-4 pb-6 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Selected Plan</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-primary">
                    {selectedPlan?.name}
                  </span>
                  <span className="text-muted-foreground">Plan</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">
                    ₹{selectedPlan?.premium.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">/year</span>
                </div>
                {data.policyInfo.addOns && data.policyInfo.addOns.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-1">Add-ons included:</p>
                    <div className="flex flex-wrap gap-2">
                      {data.policyInfo.addOns.map((addon) => (
                        <span
                          key={addon}
                          className="text-xs bg-muted px-3 py-1 rounded-full text-foreground"
                        >
                          {addon.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Owner Info */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Policy Holder</h3>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Name:</span> {data.ownerInfo.fullName}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Email:</span> {data.ownerInfo.email}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Phone:</span> {data.ownerInfo.mobile}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="text-foreground font-medium">Age:</span> {data.ownerInfo.age}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <Button
            variant="outline"
            className="flex-1 h-14 rounded-xl text-lg font-semibold"
            onClick={() => window.location.href = '/quotes'}
          >
            <FileText className="w-5 h-5 mr-2" />
            View Policy Details
          </Button>
          <Button
            className="flex-1 h-14 rounded-xl text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-[1.02]"
          >
            Proceed to Buy
          </Button>
        </motion.div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Your data is securely stored. You can come back anytime to complete your purchase.
        </motion.p>
      </div>
    </div>
  );
};

export default Confirmation;
