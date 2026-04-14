import { useState, useEffect } from 'react';
import { getPlayersKpis } from '../../../services/playersService';
import { showError, getApiErrorMsg } from '../../../utils/alerts';

export function usePlayersKpis(categoryId) {
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    let cancelled = false;

    getPlayersKpis(categoryId)
      .then((data) => { if (!cancelled) setKpis(data); })
      .catch((err) => { showError(getApiErrorMsg(err, 'Error al cargar estadísticas de jugadores')); });

    return () => { cancelled = true; };
  }, [categoryId]);

  return kpis;
}
