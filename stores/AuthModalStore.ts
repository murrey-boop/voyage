import { create } from 'zustand';

type AuthModalMode = 'sign-in' | 'sign-up' | 'reset';

interface AuthModalState {
  open: boolean;
  mode: AuthModalMode;
  openModal: (mode: AuthModalMode) => void;
  closeModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  open: false,
  mode: 'sign-in',
  openModal: (mode) => set({ open: true, mode }),
  closeModal: () => set({ open: false }),
}));