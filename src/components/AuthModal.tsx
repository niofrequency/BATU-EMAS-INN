import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoleView: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSelectRoleView }) => {
  const { signInWithEmail, registerWithEmail, signInWithGoogle, role } = useAuth();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegistering) {
        await registerWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      onSelectRoleView(role);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await signInWithGoogle();
      onSelectRoleView(role);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-500/20 p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Logo & Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-6 h-6 fill-amber-500" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {isRegistering ? 'Create an Account' : 'Sign In to Batu Emas Inn'}
          </h3>
          <p className="text-stone-500 text-xs">
            Access your reservation portal or manage hotel administration
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3 rounded-xl shadow-lg transition-all text-sm disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isRegistering ? 'Register Account' : 'Sign In')}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200" /></div>
          <span className="relative px-3 bg-white text-[10px] tracking-wider uppercase font-semibold text-stone-400">Or continue with</span>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-2.5 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors text-stone-700 font-semibold text-sm shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.95H1.14v3.14C3.15 21.35 7.23 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.25c-.25-.72-.38-1.49-.38-2.25s.13-1.53.38-2.25V6.61H1.14C.41 8.08 0 9.73 0 12s.41 3.92 1.14 5.39l4.14-3.14z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.65 1.14 6.61l4.14 3.14c.95-2.84 3.6-4.95 6.72-4.95z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-stone-500">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-amber-600 font-bold hover:underline ml-1"
          >
            {isRegistering ? 'Sign In Here' : 'Register Here'}
          </button>
        </div>

      </div>
    </div>
  );
};
