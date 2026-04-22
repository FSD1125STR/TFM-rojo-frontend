import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useMatchesCalendar } from '../pages/matches/hooks/useMatchesCalendar';
import * as matchesService from '../services/matchesService';

vi.mock('../services/matchesService');

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../hooks/useAuth';

const defaultAuth = {
  user: { categoryId: 'cat-1' },
  isAdmin: false,
  canViewAll: false,
};

describe('useMatchesCalendar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue(defaultAuth);
  });

  it('starts with isLoading true and empty matches', () => {
    matchesService.getMatches.mockResolvedValueOnce([]);
    const { result } = renderHook(() => useMatchesCalendar());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.matches).toEqual([]);
    expect(result.current.error).toBe('');
  });

  it('sets matches and isLoading false after successful fetch', async () => {
    const matches = [{ id: '1', homeTeam: 'FC A' }, { id: '2', homeTeam: 'FC B' }];
    matchesService.getMatches.mockResolvedValueOnce(matches);
    const { result } = renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.matches).toEqual(matches);
    expect(result.current.error).toBe('');
  });

  it('sets error message and isLoading false when fetch fails with server message', async () => {
    const serverError = { response: { data: { message: 'Forbidden' } } };
    matchesService.getMatches.mockRejectedValueOnce(serverError);
    const { result } = renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe('Forbidden');
    expect(result.current.matches).toEqual([]);
  });

  it('sets fallback error message when fetch fails without server message', async () => {
    matchesService.getMatches.mockRejectedValueOnce(new Error('Network error'));
    const { result } = renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe('Error al cargar los partidos');
  });

  it('calls getMatches with null when canViewAll is true', async () => {
    useAuth.mockReturnValue({ user: { categoryId: 'cat-1' }, isAdmin: true, canViewAll: true });
    matchesService.getMatches.mockResolvedValueOnce([]);
    renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(matchesService.getMatches).toHaveBeenCalledWith(null));
  });

  it('calls getMatches with categoryId string when canViewAll is false', async () => {
    useAuth.mockReturnValue({
      user: { categoryId: 'cat-42' },
      isAdmin: false,
      canViewAll: false,
    });
    matchesService.getMatches.mockResolvedValueOnce([]);
    renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(matchesService.getMatches).toHaveBeenCalledWith('cat-42'));
  });

  it('calls getMatches with categoryId._id when categoryId is an object', async () => {
    useAuth.mockReturnValue({
      user: { categoryId: { _id: 'cat-obj-99' } },
      isAdmin: false,
      canViewAll: false,
    });
    matchesService.getMatches.mockResolvedValueOnce([]);
    renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(matchesService.getMatches).toHaveBeenCalledWith('cat-obj-99'));
  });

  it('calls getMatches with null when user has no categoryId', async () => {
    useAuth.mockReturnValue({ user: {}, isAdmin: false, canViewAll: false });
    matchesService.getMatches.mockResolvedValueOnce([]);
    renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(matchesService.getMatches).toHaveBeenCalledWith(null));
  });

  it('exposes onRetry that re-fetches matches', async () => {
    const firstBatch = [{ id: '1' }];
    const secondBatch = [{ id: '1' }, { id: '2' }];
    matchesService.getMatches
      .mockResolvedValueOnce(firstBatch)
      .mockResolvedValueOnce(secondBatch);

    const { result } = renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(result.current.matches).toEqual(firstBatch));

    result.current.onRetry();
    await waitFor(() => expect(result.current.matches).toEqual(secondBatch));
    expect(matchesService.getMatches).toHaveBeenCalledTimes(2);
  });

  it('clears error on retry after a failed fetch', async () => {
    matchesService.getMatches.mockRejectedValueOnce(new Error('fail'));
    const { result } = renderHook(() => useMatchesCalendar());
    await waitFor(() => expect(result.current.error).toBeTruthy());

    matchesService.getMatches.mockResolvedValueOnce([]);
    result.current.onRetry();
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe('');
  });
});
