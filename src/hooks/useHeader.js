import { useContext, useEffect } from 'react';
import { HeaderContext } from '../context/HeaderContext';

export function useHeader({ title, breadcrumbs = [], actions = null } = {}) {
  const context = useContext(HeaderContext);

  useEffect(() => {
    context.setHeader({ title, breadcrumbs, actions });
    return () => context.resetHeader();
  }, [title, JSON.stringify(breadcrumbs)]);

  return context;
}
