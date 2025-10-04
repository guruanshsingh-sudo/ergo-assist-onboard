import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useNavigate } from 'react-router-dom';
import { Check, Shield, Zap, Crown, HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ChatBot from '@/components/ChatBot';

interface Plan {
  id: string;
  name: string;
  icon: any;
  premium: number;
  idv: number;
  deductible: number;
  features: string[];
  color: string;
}

const Quotes = () => {
  const { data, setSelectedPlan } = useOnboarding();
  const navigate = useNavigate();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Mock customized plans based on user data
  const plans: Plan[] = [
    {
      id: 'essential',
      name: 'Essential',
      icon: Shield,
      premium: 8500,
      idv: 450000,
      deductible: 2000,
      features: [
        'Third-party liability',
        'Own damage coverage',
        'Personal accident cover',
        '24/7 Claim support',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'preferred',
      name: 'Preferred',
      icon: Zap,
      premium: 12000,
      idv: 450000,
      deductible: 1000,
      features: [
        'Everything in Essential',
        'Zero depreciation',
        'Roadside assistance',
        'Engine protection',
        'Return to invoice',
      ],
      color: 'from-primary to-secondary',
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      premium: 15500,
      idv: 450000,
      deductible: 0,
      features: [
        'Everything in Preferred',
        'NCB protection',
        'Key replacement',
        'Consumables cover',
        'Tyre protection',
        'Priority claim processing',
      ],
      color: 'from-accent to-purple-500',
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setSelectedPlan(planId);
  };

  const handleProceed = () => {
    if (selectedPlanId) {
      navigate('/confirmation');
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Your Personalized Plans
          </h1>
          <p className="text-muted-foreground text-lg">
            Based on your {data.vehicleInfo.make} {data.vehicleInfo.model} in {data.vehicleInfo.city}
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-card border-2 rounded-3xl p-6 shadow-card transition-all duration-300 ${
                selectedPlanId === plan.id
                  ? 'border-primary shadow-glow scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Badge for recommended */}
              {plan.id === 'preferred' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-semibold text-background">
                  Recommended
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                <plan.icon className="w-6 h-6 text-white" />
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              
              {/* Premium */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">₹{plan.premium.toLocaleString()}</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
              </div>

              {/* Key Stats */}
              <div className="space-y-2 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IDV</span>
                  <span className="font-semibold text-foreground">₹{plan.idv.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    Deductible
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-primary hover:text-primary/80">
                          <HelpCircle className="w-3 h-3" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border rounded-3xl">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">What is a Deductible?</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            A deductible is the amount you pay from your pocket before the insurance coverage kicks in. A lower deductible means you pay less during claims, but the premium is higher.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </span>
                  <span className="font-semibold text-foreground">
                    {plan.deductible === 0 ? 'Zero' : `₹${plan.deductible.toLocaleString()}`}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <Button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full h-12 rounded-xl font-semibold transition-all duration-300 ${
                  selectedPlanId === plan.id
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted text-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {selectedPlanId === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Proceed Button */}
        {selectedPlanId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button
              onClick={handleProceed}
              size="lg"
              className="px-12 py-6 text-lg font-semibold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
            >
              Proceed to Confirmation
            </Button>
          </motion.div>
        )}
      </div>

      <ChatBot />
    </div>
  );
};

export default Quotes;
