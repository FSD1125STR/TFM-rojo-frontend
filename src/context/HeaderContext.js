import { createContext } from 'react';

export const HeaderContext = createContext({
  title: '',
  breadcrumbs: [],
  actions: null,
  setHeader: () => {},
  resetHeader: () => {},
});
