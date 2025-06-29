import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, Lock } from 'lucide-react';

const DEMO_EMAIL = 'hr@rft.com';
const DEMO_PASSWORD = 'password123';

interface SignInProps {
  onSignIn: (user: { email: string }) => void;
  isSignedIn: boolean;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn, isSignedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      onSignIn({ email });
      setError('');
      navigate('/hr');
    } else {
      setError('Invalid credentials.');
    }
  };

  if (isSignedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="bg-white/90 rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <UserCircle2 size={48} className="mx-auto text-blue-700 mb-4" />
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Welcome HR!</h2>
          <p className="text-gray-700 mb-6">You are already signed in.</p>
          <button
            onClick={() => navigate('/hr')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Go to HR Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 rounded-xl shadow-xl p-8 max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-6">
          <UserCircle2 size={48} className="text-blue-700 mb-2" />
          <h2 className="text-2xl font-bold text-blue-900">HR Sign In</h2>
        </div>
        <div className="mb-4">
          <label className="block text-blue-900 font-semibold mb-2">Email</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Enter your HR email"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-blue-900 font-semibold mb-2">Password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Enter your password"
              required
            />
            <Lock size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        {error && <div className="text-red-600 mb-4 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn; 