import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouteContextType {
  currentPath: string;
  navigate: (path: string) => void;
  activeCaseStudySlug: string | null;
  openCaseStudyModal: (slug: string) => void;
  closeCaseStudyModal: () => void;
  activeEssaySlug: string | null;
  openEssayModal: (slug: string) => void;
  closeEssayModal: () => void;
  commissionModalOpen: boolean;
  openCommissionModal: (initialService?: string) => void;
  closeCommissionModal: () => void;
  selectedCommissionService: string | null;

  // Compatibility bridges for legacy services
  serviceModalOpen: boolean;
  selectedServiceSlug: string | null;
  activePersona: any;
  setActivePersona: (p: any) => void;
  openServiceModal: (slug?: string, persona?: any) => void;
  closeServiceModal: () => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [activeCaseStudySlug, setActiveCaseStudySlug] = useState<string | null>(null);
  const [activeEssaySlug, setActiveEssaySlug] = useState<string | null>(null);
  const [commissionModalOpen, setCommissionModalOpen] = useState(false);
  const [selectedCommissionService, setSelectedCommissionService] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openCaseStudyModal = (slug: string) => {
    setActiveCaseStudySlug(slug);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeCaseStudyModal = () => {
    setActiveCaseStudySlug(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const openEssayModal = (slug: string) => {
    setActiveEssaySlug(slug);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeEssayModal = () => {
    setActiveEssaySlug(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const openCommissionModal = (initialService?: string) => {
    if (initialService) {
      setSelectedCommissionService(initialService);
    }
    setCommissionModalOpen(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeCommissionModal = () => {
    setCommissionModalOpen(false);
    setSelectedCommissionService(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  return (
    <RouteContext.Provider
      value={{
        currentPath,
        navigate,
        activeCaseStudySlug,
        openCaseStudyModal,
        closeCaseStudyModal,
        activeEssaySlug,
        openEssayModal,
        closeEssayModal,
        commissionModalOpen,
        openCommissionModal,
        closeCommissionModal,
        selectedCommissionService,
        serviceModalOpen: commissionModalOpen,
        selectedServiceSlug: selectedCommissionService,
        activePersona: 'entrepreneur',
        setActivePersona: () => {},
        openServiceModal: (slug?: string) => openCommissionModal(slug),
        closeServiceModal: () => closeCommissionModal(),
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useAppNavigation = () => {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within a RouteProvider');
  }
  return context;
};
