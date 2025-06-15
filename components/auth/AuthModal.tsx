//for global auth popup/modal
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Auth } from './Auth';
import { X } from 'lucide-react';

type AuthModalProps = {
  type: 'login' | 'register';
  onClose: () => void;
  onSuccess?: () => void;
};

export function AuthModal({ onClose }: AuthModalProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/auth/signin';
  const isRegisterPage = pathname === '/auth/register';

  const handleSuccess = () => {
    onClose();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        {isLoginPage ? (
          <Auth type="login" onSuccess={handleSuccess} />
        ) : isRegisterPage ? (
          <Auth type="register" onSuccess={handleSuccess} />
        ) : (
          <div className="flex border-b mb-4">
            <button
              className={`flex-1 py-2 font-medium ${isLoginPage ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => router.push('/auth/signin')}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2 font-medium ${isRegisterPage ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => router.push('/auth/register')}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}