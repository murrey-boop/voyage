// components/auth/Auth.tsx
'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

export function Auth({ type }: { type: 'login' | 'register' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (type === 'login') {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        if (result?.error) setError(result.error);
      } else {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await response.json();
        if (response.ok) {
          await signIn('credentials', { email, password, redirect: false });
        } else {
          setError(data.error || 'Registration failed');
        }
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center">
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {type === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Register'}
        </button>
      </form>
      <div className="text-center">
        {type === 'login' ? (
          <>
            <Link href="/auth/forgot-password" className="text-blue-600 hover:text-blue-500 text-sm">
              Forgot password?
            </Link>
            <p className="mt-2 text-sm">
              Don&#39;t have an account?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </>
        ) : (
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}