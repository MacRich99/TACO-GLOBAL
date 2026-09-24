import React from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useAppNavigation } from '@/src/context/RouteContext';
import { ShieldAlert, LogIn, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('client' | 'admin' | 'team_member' | 'ambassador')[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { user, profile, loading, openAuthModal, isAdmin } = useAuth();
  const { navigate } = useAppNavigation();

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
        </div>
        <p className="font-mono text-xs text-slate-400 mt-4 tracking-wider">
          VERIFYING ACCESS CREDENTIALS...
        </p>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="card-tech-glass max-w-md w-full p-8 rounded-2xl text-center space-y-6 shadow-2xl">
          <div className="mx-auto w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <LogIn className="h-6 w-6" />
          </div>
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Authentication Required
            </span>
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Sign In to Enter Portal
            </h2>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              This environment requires an authorized TAC GLOBAL account to manage commissioned deliverables, live brief tracking, and communication pipelines.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal('signin')}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#ECC86A] via-[#D4AF37] to-[#B8860B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-md shadow-[#D4AF37]/20"
            >
              Sign In / Register
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Public Atelier</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If role requirement specified
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = profile?.role || 'client';
    const isAllowed = allowedRoles.includes(userRole) || (allowedRoles.includes('admin') && isAdmin);

    if (!isAllowed) {
      return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16">
          <div className="card-tech-glass max-w-md w-full p-8 rounded-2xl text-center space-y-6 shadow-2xl border-rose-500/20">
            <div className="mx-auto w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                Access Restricted
              </span>
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                Executive Privilege Required
              </h2>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                Your account ({user.email}) does not possess executive administration rights for this zone.
              </p>
            </div>
            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 px-4 rounded-lg bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Go to Client Workspace
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-2.5 px-4 rounded-lg bg-transparent text-slate-400 hover:text-white text-xs font-medium tracking-wide transition-colors cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};
