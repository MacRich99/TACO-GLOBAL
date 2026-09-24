import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/src/lib/firebase';
import { seedInitialServicesIfNeeded } from '@/src/lib/servicesDb';

export type UserRole = 'client' | 'admin' | 'team_member' | 'ambassador';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  organization?: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isClient: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, fullName: string, role?: UserRole) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  authModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Recognized Executive Admins
const ADMIN_EMAILS = [
  'awudeyrichard@gmail.com',
  'inquiries@tacglobal.org',
  'admin@tacglobal.org',
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  // Trigger one-time seeds
  useEffect(() => {
    seedInitialServicesIfNeeded();
  }, []);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      setUser(fbUser);

      if (fbUser) {
        const userDocRef = doc(db, 'users', fbUser.uid);

        // Real-time listener for profile updates
        unsubscribeProfile = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            // Determine role: assign admin if in designated list
            const initialRole: UserRole = ADMIN_EMAILS.includes(fbUser.email?.toLowerCase() || '') 
              ? 'admin' 
              : 'client';

            const newProfile: UserProfile = {
              id: fbUser.uid,
              email: fbUser.email || '',
              full_name: fbUser.displayName || fbUser.email?.split('@')[0] || 'TAC Client',
              role: initialRole,
              created_at: new Date().toISOString(),
              avatar_url: fbUser.photoURL || undefined,
            };

            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          }
          setLoading(false);
        }, (error) => {
          console.error('[TAC Auth] Error fetching profile:', error);
          setLoading(false);
        });
      } else {
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUpWithEmail = async (email: string, pass: string, fullName: string, role?: UserRole) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: fullName });

    const assignedRole: UserRole = role || (
      ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'client'
    );

    const newProfile: UserProfile = {
      id: cred.user.uid,
      email: cred.user.email || email,
      full_name: fullName,
      role: assignedRole,
      created_at: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', cred.user.uid), newProfile);
    setProfile(newProfile);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithPopup(auth, provider);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setProfile(null);
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const isAdmin = profile?.role === 'admin' || (!!user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase()));
  const isClient = profile?.role === 'client' || !isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        isClient,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
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
