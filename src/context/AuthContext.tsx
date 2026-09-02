import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  googleProvider 
} from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { UserRole } from '../types';

interface AuthContextType {
  user: FirebaseUser | null;
  role: UserRole;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<UserRole>;
  signInWithEmail: (email: string, pass: string) => Promise<UserRole>;
  registerWithEmail: (email: string, pass: string) => Promise<UserRole>;
  logout: () => Promise<void>;
  setUserRole: (uid: string, newRole: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Exported so any screen that needs to recognize/protect the master admin
// (e.g. the admin Users tab) checks the same identity, not a duplicated
// hardcoded string that could drift out of sync.
export const MASTER_ADMIN_EMAIL = 'mpigome44@gmail.com';
export const MASTER_ADMIN_UID = 'oR2YnszWuvNCBIeJ1KRNC0A6XfR2';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<UserRole>('guest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        let currentRole: UserRole = 'guest';

        // Enforce Master Admin based on Email or UID
        if (firebaseUser.email === MASTER_ADMIN_EMAIL || firebaseUser.uid === MASTER_ADMIN_UID) {
          currentRole = 'admin';
        } else if (userDoc.exists()) {
          currentRole = userDoc.data().role || 'guest';
        }

        // Sync or initialize user profile in Firestore
        await setDoc(userDocRef, {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
          role: currentRole,
          updatedAt: new Date().toISOString()
        }, { merge: true });

        setRole(currentRole);
      } else {
        setRole('guest');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const syncUserRole = async (firebaseUser: FirebaseUser): Promise<UserRole> => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    let assignedRole: UserRole = 'guest';

    if (firebaseUser.email === MASTER_ADMIN_EMAIL || firebaseUser.uid === MASTER_ADMIN_UID) {
      assignedRole = 'admin';
    } else if (userDoc.exists()) {
      assignedRole = userDoc.data().role || 'guest';
    }

    await setDoc(userDocRef, {
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
      role: assignedRole,
      createdAt: userDoc.exists() ? userDoc.data().createdAt : new Date().toISOString()
    }, { merge: true });

    setRole(assignedRole);
    return assignedRole;
  };

  // Each of these returns the freshly-resolved role (rather than the stale
  // `role` state closed over by the caller) so callers can route the user
  // correctly immediately after sign-in, before this provider re-renders.
  const signInWithGoogle = async (): Promise<UserRole> => {
    const result = await signInWithPopup(auth, googleProvider);
    return syncUserRole(result.user);
  };

  const signInWithEmail = async (email: string, pass: string): Promise<UserRole> => {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return syncUserRole(result.user);
  };

  const registerWithEmail = async (email: string, pass: string): Promise<UserRole> => {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    const assignedRole: UserRole = (email === MASTER_ADMIN_EMAIL || result.user.uid === MASTER_ADMIN_UID) ? 'admin' : 'guest';

    await setDoc(doc(db, 'users', result.user.uid), {
      email: result.user.email,
      displayName: email.split('@')[0],
      role: assignedRole,
      createdAt: new Date().toISOString()
    });

    setRole(assignedRole);
    return assignedRole;
  };

  const logout = async () => {
    await signOut(auth);
    setRole('guest');
  };

  const setUserRole = async (uid: string, newRole: UserRole) => {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, { role: newRole });
    if (user && user.uid === uid) {
      setRole(newRole);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      role,
      isAdmin: role === 'admin',
      loading,
      signInWithGoogle,
      signInWithEmail,
      registerWithEmail,
      logout,
      setUserRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
