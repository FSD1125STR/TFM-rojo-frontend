import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getMatches, createMatch, updateMatch, deleteMatch } from '../../../services/matchesService';
import { getCategories } from '../../../services/categoriesService';
import { estadoOptions, tipoOptions } from '../data/matchesConfig';
import { normalizeText } from '../../../utils/normalize';

const sortOptions = [
  { label: 'Fecha (más reciente)', value: 'dateTime_desc' },
  { label: 'Fecha (más antigua)', value: 'dateTime_asc' },
  { label: 'Jornada (asc)', value: 'journey_asc' },
  { label: 'Jornada (desc)', value: 'journey_desc' },
];

export function useMatchesList() {
  const { user, isAdmin, canViewAll } = useAuth();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState({ status: '', tipo: '', categoryId: '' });
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortValue, setSortValue] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    if (!canViewAll) return;
    getCategories()
      .then((cats) => {
        setCategoryOptions(cats.map((c) => ({ label: c.name, value: c._id })));
      })
      .catch(() => {});
  }, [canViewAll]);

  const activeCategoryId = canViewAll
    ? filterValues.categoryId || null
    : user?.categoryId?._id || user?.categoryId || null;

  const fetchMatches = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getMatches(activeCategoryId);
      setMatches(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los partidos');
    } finally {
      setIsLoading(false);
    }
  }, [activeCategoryId]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const addMatch = useCallback(async (payload) => {
    await createMatch(payload);
    await fetchMatches();
  }, [fetchMatches]);

  const editMatch = useCallback(async (id, payload) => {
    await updateMatch(id, payload);
    await fetchMatches();
  }, [fetchMatches]);

  const removeMatch = useCallback(async (id) => {
    await deleteMatch(id);
    await fetchMatches();
  }, [fetchMatches]);

  const filteredData = useMemo(() => {
    return matches.filter((match) => {
      if (searchValue) {
        const term = normalizeText(searchValue);
        const homeName = normalizeText(match.homeTeamId?.name);
        const awayName = normalizeText(match.awayTeamId?.name);
        const venue = normalizeText(match.venue?.name);
        if (!homeName.includes(term) && !awayName.includes(term) && !venue.includes(term)) {
          return false;
        }
      }

      if (filterValues.status && match.status !== filterValues.status) {
        return false;
      }

      if (filterValues.tipo) {
        const isLocal = match.homeTeamId?.isOurTeam === true;
        const isVisitante = match.awayTeamId?.isOurTeam === true;
        if (filterValues.tipo === 'local' && !isLocal) return false;
        if (filterValues.tipo === 'visitante' && !isVisitante) return false;
      }

      return true;
    });
  }, [matches, searchValue, filterValues]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    const [field, direction] = sortValue.split('_');
    const asc = direction === 'asc' ? 1 : -1;

    sorted.sort((a, b) => {
      if (field === 'dateTime') {
        return asc * (new Date(a.dateTime) - new Date(b.dateTime));
      }
      if (field === 'journey') {
        return asc * ((a.journey || 0) - (b.journey || 0));
      }
      return 0;
    });

    return sorted;
  }, [filteredData, sortValue]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, page, itemsPerPage]);

  const hasActiveFilters = !!(filterValues.status || filterValues.tipo || filterValues.categoryId);

  const onSearchChange = useCallback((value) => {
    setSearchValue(value);
    setPage(1);
  }, []);

  const onFilterChange = useCallback((key, value) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const onClearFilters = useCallback(() => {
    setFilterValues({ status: '', tipo: '', categoryId: '' });
    setSearchValue('');
    setPage(1);
  }, []);

  const onItemsPerPageChange = useCallback((value) => {
    setItemsPerPage(value);
    setPage(1);
  }, []);

  const onSortChange = useCallback((value) => {
    setSortValue(value);
    setPage(1);
  }, []);

  const compact = 'w-36';

  const filterItems = [
    ...(canViewAll ? [{
      key: 'categoryId',
      placeholder: 'Categoría',
      options: categoryOptions,
      value: filterValues.categoryId,
      className: compact,
    }] : []),
    {
      key: 'status',
      placeholder: 'Estado',
      options: estadoOptions,
      value: filterValues.status,
      className: compact,
    },
    {
      key: 'tipo',
      placeholder: 'Tipo',
      options: tipoOptions,
      value: filterValues.tipo,
      className: compact,
    },
  ];

  return {
    data: paginatedData,
    categoryOptions,
    isLoading,
    error,
    onRetry: fetchMatches,
    addMatch,
    editMatch,
    removeMatch,
    search: {
      enabled: true,
      value: searchValue,
      onChange: onSearchChange,
      placeholder: 'Buscar por equipo o sede...',
    },
    filters: {
      items: filterItems,
      onChange: onFilterChange,
      onClear: onClearFilters,
      hasActive: hasActiveFilters,
    },
    sort: {
      options: sortOptions,
      value: sortValue,
      onChange: onSortChange,
    },
    pagination: {
      page,
      totalPages,
      totalItems,
      onChange: setPage,
      itemsPerPage,
      itemsPerPageOptions: [6, 10, 20],
      onItemsPerPageChange,
    },
  };
}
