// Hook que obtiene el estado de convocatoria para la lista actual de partidos (anti N+1)
import { useState, useEffect } from 'react';
import { getCallupsStatus } from '../../../services/callupsService';

export function useCallupsStatus(matches) {
  const [statusMap, setStatusMap] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Clave estable basada en los IDs visibles — se recalcula al cambiar página/filtros
  const matchIdsKey = matches?.map((m) => m._id).join(',') ?? '';

  useEffect(() => {
    if (!matchIdsKey) {
      setStatusMap({});
      return;
    }
    setIsLoading(true);
    getCallupsStatus(matchIdsKey.split(','))
      .then(setStatusMap)
      .catch(() => setStatusMap({}))
      .finally(() => setIsLoading(false));
  }, [matchIdsKey]);

  return { statusMap, isLoading };
}
