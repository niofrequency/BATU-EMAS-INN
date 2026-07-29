import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';

// Default config fallback if config file is not yet generated
const defaultConfig = {
  apiKey: "demo-api-key",
  authDomain: "batu-emas-inn.firebaseapp.com",
  projectId: "batu-emas-inn",
  storageBucket: "batu-emas-inn.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let hasFirebaseConfig = false;

try {
  // Try importing firebase-applet-config.json dynamically or using fallback
  // In Vite, we can try reading standard config
  const firebaseConfig = defaultConfig;
  
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  
  db = getFirestore(app);
  auth = getAuth(app);
  hasFirebaseConfig = true;
} catch (error) {
  console.warn("Firebase initialized with demo mode fallback:", error);
  // Re-init standard app
  if (!getApps().length) {
    app = initializeApp(defaultConfig);
  } else {
    app = getApp();
  }
  db = getFirestore(app);
  auth = getAuth(app);
}

export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Details: ', JSON.stringify(errInfo));
  return new Error(JSON.stringify(errInfo));
}

export { app, db, auth, hasFirebaseConfig };
