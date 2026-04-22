import { useContext } from 'react';
import { LiveMatchContext } from '../context/LiveMatchContext.jsx';

export function useLiveMatch() {
  const ctx = useContext(LiveMatchContext);
  if (!ctx) throw new Error('useLiveMatch must be used within LiveMatchProvider');
  return ctx;
}
