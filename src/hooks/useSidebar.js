import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ui.sidebarMode';
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

function getBreakpoint() {
  if (typeof window === 'undefined') return 'desktop';
  if (window.innerWidth < MOBILE_BREAKPOINT) return 'mobile';
  if (window.innerWidth < TABLET_BREAKPOINT) return 'tablet';
  return 'desktop';
}

function getInitialMode(breakpoint) {
  if (breakpoint === 'mobile') return 'drawer';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (stored === 'expanded' || stored === 'collapsed')) {
    return stored;
  }

  return breakpoint === 'tablet' ? 'collapsed' : 'expanded';
}

export function useSidebar() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);
  const [mode, setModeState] = useState(() => getInitialMode(getBreakpoint()));
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint();
      setBreakpoint(newBreakpoint);

      if (newBreakpoint === 'mobile') {
        setModeState('drawer');
      } else {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored && (stored === 'expanded' || stored === 'collapsed')) {
          setModeState(stored);
        } else {
          setModeState(newBreakpoint === 'tablet' ? 'collapsed' : 'expanded');
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mode !== 'drawer') {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }, [mode]);

  const toggleSidebar = useCallback(() => {
    if (mode === 'drawer') {
      setDrawerOpen(prev => !prev);
    } else {
      setModeState(prev => prev === 'expanded' ? 'collapsed' : 'expanded');
    }
  }, [mode]);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return {
    mode,
    breakpoint,
    drawerOpen,
    toggleSidebar,
    closeDrawer,
    isCollapsed: mode === 'collapsed',
    isDrawer: mode === 'drawer',
    isExpanded: mode === 'expanded',
  };
}
