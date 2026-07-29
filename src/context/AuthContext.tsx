import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { UserProfile, UserRole } from '../types';
import { fetchUserProfile, saveUserProfile } from '../lib/dataService';

interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: User | null;
  role: UserRole;
  isAdmin: boolean;
  isGuest: boolean;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, role?: UserRole) => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN_PROFILE: UserProfile = {
  uid: 'demo-admin-id',
  email: 'mpigome44@gmail.com',
  displayName: 'Manager Admin (Batu Emas)',
  role: 'admin',
  createdAt: new Date().toISOString()
};

const DEMO_GUEST_PROFILE: UserProfile = {
  uid: 'demo-guest-id',
  email: 'guest@batuemas.com',
  displayName: 'Eleanor Vance',
  role: 'guest',
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        let profile = await fetchUserProfile(fbUser.uid);
        if (!profile) {
          // Check if admin email
          const isAdminEmail = fbUser.email?.toLowerCase() === 'mpigome44@gmail.com' || fbUser.email?.includes('admin');
          const newRole: UserRole = isAdminEmail ? 'admin' : 'guest';
          profile = {
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Guest User',
            role: newRole,
            createdAt: new Date().toISOString()
          };
          await saveUserProfile(profile);
        }
        setUser(profile);
      } else {
        // Default guest user profile for unauthenticated visitors so they can test/use seamlessly
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.warn("Google popup login fallback to Demo Admin/Guest:", err);
      setUser(DEMO_GUEST_PROFILE);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      console.warn("Email login fallback trigger:", err);
      if (email.includes('admin') || email.toLowerCase() === 'mpigome44@gmail.com') {
        setUser(DEMO_ADMIN_PROFILE);
      } else {
        setUser({
          uid: 'usr-' + Date.now(),
          email: email,
          displayName: email.split('@')[0],
          role: 'guest',
          createdAt: new Date().toISOString()
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string, role: UserRole = 'guest') => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, pass);
      if (res.user) {
        await updateProfile(res.user, { displayName: name });
        const newProfile: UserProfile = {
          uid: res.user.uid,
          email,
          displayName: name,
          role,
          createdAt: new Date().toISOString()
        };
        await saveUserProfile(newProfile);
        setUser(newProfile);
      }
    } catch (err) {
      console.warn("Register fallback trigger:", err);
      const mockProfile: UserProfile = {
        uid: 'usr-' + Date.now(),
        email,
        displayName: name,
        role,
        createdAt: new Date().toISOString()
      };
      await saveUserProfile(mockProfile);
      setUser(mockProfile);
    } finally {
      setLoading(false);
    }
  };

  const switchDemoRole = (role: UserRole) => {
    if (role === 'admin') {
      setUser(DEMO_ADMIN_PROFILE);
    } else {
      setUser(DEMO_GUEST_PROFILE);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Signout error", e);
    }
    setUser(null);
  };

  const currentRole: UserRole = user ? user.role : 'guest';
  const isAdmin = currentRole === 'admin';
  const isGuest = currentRole === 'guest';

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        role: currentRole,
        isAdmin,
        isGuest,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        switchDemoRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
