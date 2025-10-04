import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VehicleInfoStep from '@/components/onboarding/VehicleInfoStep';
import PolicyInfoStep from '@/components/onboarding/PolicyInfoStep';
import OwnerInfoStep from '@/components/onboarding/OwnerInfoStep';
import ChatBot from '@/components/ChatBot';

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = 3;

  const steps = [
    { number: 1, title: 'Vehicle Information', component: VehicleInfoStep },
    { number: 2, title: 'Policy Details', component: PolicyInfoStep },
    { number: 3, title: 'Owner Information', component: OwnerInfoStep },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/quotes');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Progress */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">
              Step {currentStep} of {totalSteps}
            </h2>
            <span className="text-sm text-muted-foreground">
              {steps[currentStep - 1].title}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 rounded-xl h-12 px-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-xl h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
          >
            {currentStep === totalSteps ? 'View Quotes' : 'Continue'}
            {currentStep < totalSteps && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Onboarding;
