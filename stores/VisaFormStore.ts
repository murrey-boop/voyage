
import { create } from 'zustand';

type VisaFormStore = {
  visaAppId: string | null;
  setVisaAppId: (id: string) => void;

  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
};

export const useVisaFormStore = create<VisaFormStore>((set) => ({
  visaAppId: null,
  setVisaAppId: (id) => set({ visaAppId: id }),

  currentStep: 0,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  goToStep: (step) => set({ currentStep: step }),
}));
