import { createContext, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

export const HeaderContext = createContext({
  title: '',
  breadcrumbs: [],
  actions: null,
  setHeader: () => {},
  resetHeader: () => {},
});

export function HeaderProvider({ children }) {
  const [header, setHeaderState] = useState({
    title: '',
    breadcrumbs: [],
    actions: null,
  });

  const setHeader = useCallback(({ title, breadcrumbs, actions }) => {
    setHeaderState({ title, breadcrumbs, actions });
  }, []);

  const resetHeader = useCallback(() => {
    setHeaderState({ title: '', breadcrumbs: [], actions: null });
  }, []);

  const value = useMemo(() => ({
    ...header,
    setHeader,
    resetHeader,
  }), [header, setHeader, resetHeader]);

  return (
    <HeaderContext.Provider value={value}>
      {children}
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
