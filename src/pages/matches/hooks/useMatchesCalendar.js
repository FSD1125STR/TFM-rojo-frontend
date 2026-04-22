import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getMatches } from '../../../services/matchesService';

export function useMatchesCalendar() {
  const { user, canViewAll } = useAuth();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryId = canViewAll
    ? null
    : user?.categoryId?._id || user?.categoryId || null;

  const fetchMatches = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getMatches(categoryId);
      setMatches(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los partidos');
    } finally {
      setIsLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { matches, isLoading, error, onRetry: fetchMatches };
}
