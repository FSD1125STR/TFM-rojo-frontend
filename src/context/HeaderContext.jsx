import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { HeaderContext } from './HeaderContext.js';

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
