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

export async function createPlayer(formData) {
  const { data } = await api.post('/players', formData);
  return data;
}

export async function updatePlayer(id, formData) {
  const { data } = await api.patch(`/players/${id}`, formData);
  return data;
}

export async function archivePlayer(id) {
  const { data } = await api.patch(`/players/${id}/archive`);
  return data;
}

export async function updatePlayerStatus(id, body) {
  const { data } = await api.patch(`/players/${id}/status`, body);
  return data;
}
