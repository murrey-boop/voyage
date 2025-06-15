'use client';
import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface NotificationBannerProps {
  message: string;
  onClose?: () => void;
}

export default function NotificationBanner({ message, onClose }: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top- left-0 w-full bg-red-500 text-white text-center py-2 z-50 flex justify-items-center justify-center">
      <AlertTriangle className="mr-2" size={20} />
      {message}
    </div>
  );
}