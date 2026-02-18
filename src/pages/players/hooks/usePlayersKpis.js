import { useState, useEffect } from 'react';
import { getPlayersKpis } from '../../../services/playersService';

export function usePlayersKpis(categoryId) {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    let cancelled = false;

    getPlayersKpis(categoryId)
      .then((data) => { if (!cancelled) setKpis(data); })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [categoryId]);

  return kpis;
}
