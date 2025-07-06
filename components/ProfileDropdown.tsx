import { useUser, useClerk } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ProfileDropdown() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 text-white rounded-full flex items-center justify-center font-montserrat"
        aria-label="Profile menu"
      >
        {user.firstName?.charAt(0).toUpperCase() ?? 'A'}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
          <Link
            href="/settings"
            className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
            onClick={() => setOpen(false)}
          >
            Settings
          </Link>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-red-600"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}