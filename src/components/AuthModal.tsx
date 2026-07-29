import React, { useState } from 'react';
import { X, User, ShieldCheck, Mail, Lock, LogIn, Sparkles, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoleView?: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSelectRoleView
}) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, switchDemoRole } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, displayName || email.split('@')[0], selectedRole);
      }
      onClose();
      if (onSelectRoleView) {
        onSelectRoleView(selectedRole);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setErrorMsg('Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    switchDemoRole(role);
    onClose();
    if (onSelectRoleView) {
      onSelectRoleView(role);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border-2 border-amber-400 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 font-bold mb-3 shadow-sm border border-amber-300">
            <Sparkles className="w-6 h-6 text-amber-600 fill-amber-500" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {mode === 'login' ? 'Sign In to Batu Emas Inn' : 'Create Guest Account'}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Access your reservation portal or manage hotel administration
          </p>
        </div>

        {/* Quick Demo Role Selectors */}
        <div className="mb-6 p-3 bg-stone-50 rounded-2xl border border-stone-200">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 text-center mb-2">
            ⚡ Quick Demo Access (Instant Toggle)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemo('guest')}
              className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <User className="w-3.5 h-3.5" />
              Demo Guest Portal
            </button>
            <button
              onClick={() => handleQuickDemo('admin')}
              className="py-2 px-3 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-amber-300 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all border border-emerald-800"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Demo Admin Portal
            </button>
          </div>
        </div>

        <div className="relative my-4 flex items-center justify-center">
          <div className="border-t border-stone-200 w-full" />
          <span className="bg-white px-3 text-xs text-stone-400 uppercase font-semibold">Or Sign In With Credentials</span>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Vance"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Assign User Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm bg-stone-50"
              >
                <option value="guest">Guest (Standard Hotel Guest)</option>
                <option value="admin">Admin (Hotel Staff Manager)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold py-2.5 px-4 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 mt-2"
          >
            {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>

        </form>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mt-3 bg-white hover:bg-stone-50 text-stone-700 font-bold py-2.5 px-4 rounded-xl border border-stone-300 text-xs flex items-center justify-center gap-2 transition-all shadow-2xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2.01 10.04.01 12s.45 3.8 1.26 5.42l4.01-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Toggle Mode Footer */}
        <div className="mt-4 text-center text-xs text-stone-500">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-amber-700 font-bold hover:underline"
              >
                Register Here
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-amber-700 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
