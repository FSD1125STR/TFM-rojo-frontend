import { useState, useEffect } from 'react';
import { getMatchesKpis } from '../../../services/matchesService';
import { showError, getApiErrorMsg } from '../../../utils/alerts';

export function useMatchesKpis(categoryId) {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    let cancelled = false;

    getMatchesKpis(categoryId)
      .then((data) => { if (!cancelled) setKpis(data); })
      .catch((err) => { showError(getApiErrorMsg(err, 'Error al cargar estadísticas de partidos')); });

    return () => { cancelled = true; };
  }, [categoryId]);

  return kpis;
}
