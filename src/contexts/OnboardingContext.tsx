import React, { createContext, useContext, useState, useEffect } from 'react';

interface VehicleInfo {
  vehicleType?: string;
  make?: string;
  model?: string;
  fuelType?: string;
  year?: string;
  variant?: string;
  registrationNumber?: string;
  city?: string;
  state?: string;
  annualMileage?: string;
  primaryUse?: string;
  ownershipType?: string;
}

interface PolicyInfo {
  existingPolicy?: boolean;
  insurerName?: string;
  expiryDate?: string;
  policyNumber?: string;
  claimHistory?: boolean;
  numberOfClaims?: string;
  ncbPercentage?: string;
  previousPolicyType?: string;
  desiredCoverageType?: string;
  addOns?: string[];
  deductible?: string;
  policyDuration?: string;
}

interface OwnerInfo {
  fullName?: string;
  age?: string;
  gender?: string;
  occupation?: string;
  mobile?: string;
  email?: string;
  address?: string;
  pan?: string;
  drivingLicense?: string;
}

interface OnboardingData {
  vehicleInfo: VehicleInfo;
  policyInfo: PolicyInfo;
  ownerInfo: OwnerInfo;
  selectedPlan?: string;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateVehicleInfo: (info: Partial<VehicleInfo>) => void;
  updatePolicyInfo: (info: Partial<PolicyInfo>) => void;
  updateOwnerInfo: (info: Partial<OwnerInfo>) => void;
  setSelectedPlan: (plan: string) => void;
  resetData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialData: OnboardingData = {
  vehicleInfo: {},
  policyInfo: {},
  ownerInfo: {},
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<OnboardingData>(() => {
    const saved = localStorage.getItem('ergoassist-onboarding');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('ergoassist-onboarding', JSON.stringify(data));
  }, [data]);

  const updateVehicleInfo = (info: Partial<VehicleInfo>) => {
    setData(prev => ({
      ...prev,
      vehicleInfo: { ...prev.vehicleInfo, ...info },
    }));
  };

  const updatePolicyInfo = (info: Partial<PolicyInfo>) => {
    setData(prev => ({
      ...prev,
      policyInfo: { ...prev.policyInfo, ...info },
    }));
  };

  const updateOwnerInfo = (info: Partial<OwnerInfo>) => {
    setData(prev => ({
      ...prev,
      ownerInfo: { ...prev.ownerInfo, ...info },
    }));
  };

  const setSelectedPlan = (plan: string) => {
    setData(prev => ({ ...prev, selectedPlan: plan }));
  };

  const resetData = () => {
    setData(initialData);
    localStorage.removeItem('ergoassist-onboarding');
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateVehicleInfo,
        updatePolicyInfo,
        updateOwnerInfo,
        setSelectedPlan,
        resetData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};
