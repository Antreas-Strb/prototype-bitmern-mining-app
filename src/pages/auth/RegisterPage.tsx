import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register, isLoading } = useAuth();
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      await register(name, email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Create an account</h1>
      <p className="text-light-700 mb-8">Sign up to get started with MiningVerse</p>
      
      {error && (
        <div className="bg-error-500/10 border border-error-500/30 text-error-500 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-light-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-light-900" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input pl-10"
              placeholder="John Doe"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-light-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-light-900" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input pl-10"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-light-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-light-900" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input pl-10"
              placeholder="••••••••"
            />
          </div>
          <p className="mt-1 text-xs text-light-800">
            Minimum 8 characters with a mix of letters, numbers and symbols
          </p>
        </div>
        
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-light-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-light-900" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-dark-600 bg-dark-700 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-light-700">
            I agree to the{' '}
            <Link href="#" className="text-primary-400 hover:text-primary-300">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-primary-400 hover:text-primary-300">
              Privacy Policy
            </Link>
          </label>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      
      <p className="mt-8 text-center text-sm text-light-700">
        Already have an account?{' '}
        <Link href="/dashboard" className="font-medium text-primary-400 hover:text-primary-300">
          Go to Dashboard
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;