import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { useAuth } from '../AuthContext';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiService.login(formData.email, formData.password);
      
      // Use AuthContext login function to update global state
      if (response.token && response.user) {
        login(response.token, response.user);
      }
      
      setIsLoading(false);
      
      // Redirect to dashboard or home page
      navigate('/');
      
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      
      // Provide user-friendly error messages
      if (errorMessage.includes('Invalid credentials')) {
        setError('❌ Invalid email or password. Please check your credentials and try again.');
      } else if (errorMessage.includes('Login failed')) {
        setError('❌ Login failed. Please try again or contact support if the problem persists.');
      } else if (errorMessage.includes('Network error')) {
        setError('❌ Network error. Please check your internet connection and try again.');
      } else {
        setError(`❌ ${errorMessage}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-pink-500 py-8 px-4 pt-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-yellow-300/30 rounded-full animate-pulse"></div>
      </div>

      {/* Glassmorphism Card */}
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-white/30 transform hover:scale-105 transition-all duration-300">
        {/* Header with Icon */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3 animate-bounce">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-white/80 text-xs">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="group">
            <label htmlFor="email" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="group">
            <label htmlFor="password" className="block text-white/90 font-medium mb-1 transition-colors group-focus-within:text-white text-sm">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                name="password"
                className="w-full px-3 py-2.5 bg-white/90 border border-white/50 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white text-sm font-medium"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm text-center animate-pulse">
              {error}
            </div>
          )}

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="text-white/70 hover:text-white text-xs transition-colors"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden text-sm"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* OTP Login Button */}
          <button
            type="button"
            className="w-full py-2.5 bg-white/10 border border-white/30 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 text-sm"
          >
            Use OTP to Login
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-4 text-center">
          <p className="text-white/70 text-xs">
            Don't have an account?{' '}
            <button 
              className="text-white hover:text-white/90 font-medium transition-colors"
              onClick={() => navigate('/signup')}
            >
              Register for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;