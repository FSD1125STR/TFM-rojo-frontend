import api from './api';

export async function getMatches(categoryId) {
  const params = {};
  if (categoryId) params.categoryId = categoryId;
  const { data } = await api.get('/matches', { params });
  return data;
}

export async function getMatchesKpis(categoryId) {
  const params = {};
  if (categoryId) params.categoryId = categoryId;
  const { data } = await api.get('/matches/kpis', { params });
  return data;
}

export async function getNextJourney(categoryId) {
  const { data } = await api.post('/matches/next-journey', { categoryId });
  return data;
}

export async function validateJourney(categoryId, journey, excludeId = null) {
  const { data } = await api.post('/matches/validate-journey', { categoryId, journey, ...(excludeId && { excludeId }) });
  return data;
}

export async function checkDuplicate(categoryId, opponentId, isHome) {
  const { data } = await api.post('/matches/check-duplicate', { categoryId, opponentId, isHome });
  return data;
}

export async function checkDate(categoryId, dateTime, excludeId = null) {
  const { data } = await api.post('/matches/check-date', { categoryId, dateTime, ...(excludeId && { excludeId }) });
  return data;
}

export async function createMatch(payload) {
  const { data } = await api.post('/matches', payload);
  return data;
}

export async function updateMatch(id, payload) {
  const { data } = await api.put(`/matches/${id}`, payload);
  return data;
}

export async function deleteMatch(id, force = false) {
  await api.delete(`/matches/${id}${force ? '?force=true' : ''}`);
}

// Live Match endpoints
export const getMatchEvents = (matchId) =>
  api.get(`/matches/${matchId}/events`).then((r) => r.data);

export const createMatchEvent = (matchId, payload) =>
  api.post(`/matches/${matchId}/events`, payload).then((r) => r.data);

export const updateLiveStatus = (matchId, payload) =>
  api.patch(`/matches/${matchId}/live-status`, payload).then((r) => r.data);
