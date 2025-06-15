
'use client';
import { createContext, useContext, useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';

type AuthModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && <AuthModal type="login" onClose={closeModal} />}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}