'use client';

import { useAuthModalStore } from '@/stores/AuthModalStore';
import { SignIn, SignUp } from '@clerk/nextjs';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function AuthModal() {
  const { open, mode, closeModal } = useAuthModalStore();

  if (!open) return null;

  // Accessibility: Provide a hidden DialogTitle for screen readers
  const title =
    mode === 'sign-in'
      ? 'Sign in to Digital Voyaging'
      : 'Create your Digital Voyaging account';

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-w-sm p-0 bg-transparent shadow-none border-none">
        {/* Hidden accessible title for screen readers */}
        <DialogTitle asChild>
          <VisuallyHidden>{title}</VisuallyHidden>
        </DialogTitle>
        {mode === 'sign-in' ? (
          <SignIn
            appearance={{
              elements: {
                card: 'bg-neutral-900 text-white rounded-xl shadow-none px-6 pt-10 pb-7 relative',
                headerTitle: 'font-bold text-2xl mb-4 text-center',
                formButtonPrimary:
                  'bg-white text-neutral-900 font-semibold hover:bg-blue-600 hover:text-white transition rounded-md px-6 py-2',
                socialButtonsBlockButton:
                  'bg-black text-white hover:bg-gray-800 mt-3 w-full flex items-center justify-center rounded-md py-2',
                dividerText: 'text-gray-400 uppercase tracking-wide',
                formFieldInput:
                  'bg-black text-white border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600',
                footerActionText:
                  'text-gray-400 hover:text-gray-300 underline cursor-pointer text-sm',
                logoBox: 'flex justify-center mb-4',
                formFieldLabel: 'text-sm text-gray-300 mb-1',
                formFieldInputShowPasswordButton:
                  'text-gray-400 hover:text-gray-300',
                identityPreviewEditButton:
                  'bg-white text-black rounded-md px-3 py-1 hover:bg-gray-200',
                closeButton:
                  'absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer',
              },
              variables: {
                colorPrimary: '#2563eb',
                colorBackground: '#18181b',
                colorText: '#fff',
                colorTextOnPrimaryBackground: '#000',
              },
            }}
            afterSignInUrl="/"
            redirectUrl="/"
          />
        ) : (
          <SignUp
            appearance={{
              elements: {
                card: 'bg-neutral-900 text-white rounded-xl shadow-none px-6 pt-10 pb-7 relative',
                headerTitle: 'font-bold text-2xl mb-4 text-center',
                formButtonPrimary:
                  'bg-white text-neutral-900 font-semibold hover:bg-blue-600 hover:text-white transition rounded-md px-6 py-2',
                socialButtonsBlockButton:
                  'bg-black text-white hover:bg-gray-800 mt-3 w-full flex items-center justify-center rounded-md py-2',
                dividerText: 'text-gray-400 uppercase tracking-wide',
                formFieldInput:
                  'bg-black text-white border border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600',
                footerActionText:
                  'text-gray-400 hover:text-gray-300 underline cursor-pointer text-sm',
                logoBox: 'flex justify-center mb-4',
                formFieldLabel: 'text-sm text-gray-300 mb-1',
                formFieldInputShowPasswordButton:
                  'text-gray-400 hover:text-gray-300',
                identityPreviewEditButton:
                  'bg-white text-black rounded-md px-3 py-1 hover:bg-gray-200',
                closeButton:
                  'absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer',
              },
              variables: {
                colorPrimary: '#2563eb',
                colorBackground: '#18181b',
                colorText: '#fff',
                colorTextOnPrimaryBackground: '#000',
              },
            }}
            afterSignUpUrl="/"
            redirectUrl="/"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}