import api from './api';

export async function getPlayers(categoryId) {
  const params = {};
  if (categoryId) params.categoryId = categoryId;
  const { data } = await api.get('/players', { params });
  return data;
}

export async function getPlayerById(id) {
  const { data } = await api.get(`/players/${id}`);
  return data;
}

export async function getPlayerMatches(id) {
  const { data } = await api.get(`/players/${id}/matches`);
  return data;
}

export async function getPlayersKpis(categoryId) {
  const params = {};
  if (categoryId) params.categoryId = categoryId;
  const { data } = await api.get('/players/kpis', { params });
  return data;
}
