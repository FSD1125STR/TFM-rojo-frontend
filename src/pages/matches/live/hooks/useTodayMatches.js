import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { getMatches } from '../../../../services/matchesService';

const ACTIVE_STATUSES = new Set(['FIRST_HALF', 'HALF_TIME', 'SECOND_HALF']);

function isSameLocalDay(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function useTodayMatches() {
  const { user, isLoading: authLoading } = useAuth();
  const [notStarted, setNotStarted] = useState([]);
  const [active, setActive] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryId = user?.categoryId?._id || user?.categoryId || null;

  const load = useCallback(async () => {
    if (authLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMatches(categoryId);
      const list = Array.isArray(data) ? data : [];

      const todayNonCancelled = list
        .filter((m) => m.status !== 'cancelled' && isSameLocalDay(m.dateTime || m.date))
        .sort((a, b) => new Date(a.dateTime || a.date) - new Date(b.dateTime || b.date));

      setActive(todayNonCancelled.filter((m) => ACTIVE_STATUSES.has(m.liveStatus)));
      setNotStarted(todayNonCancelled.filter((m) => !ACTIVE_STATUSES.has(m.liveStatus) && m.liveStatus !== 'FINISHED'));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, authLoading]);

  useEffect(() => {
    load();
  }, [load]);

  return { notStarted, active, isLoading, error, reload: load };
}
