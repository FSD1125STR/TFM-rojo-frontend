import { useState, useEffect } from 'react';
import { getMatchesKpis } from '../../../services/matchesService';

export function useMatchesKpis(categoryId) {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    let cancelled = false;

    getMatchesKpis(categoryId)
      .then((data) => { if (!cancelled) setKpis(data); })
      .catch(() => {});

    return () => { cancelled = true; };
  }, [categoryId]);

  return kpis;
}
