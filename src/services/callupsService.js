import api from './api';

export async function getMatchCallup(matchId) {
  const { data } = await api.get(`/matches/${matchId}/callup`);
  return data;
}

export async function createCallup(matchId, payload) {
  const { data } = await api.post(`/matches/${matchId}/callup`, payload);
  return data;
}

export async function updatePlayerStatus(matchId, payload) {
  const { data } = await api.patch(`/matches/${matchId}/callup/players`, payload);
  return data;
}

export async function removePlayer(matchId, playerId) {
  await api.delete(`/matches/${matchId}/callup/players/${playerId}`);
}

export async function saveCallupPlayers(matchId, players) {
  const { data } = await api.put(`/matches/${matchId}/callup/players`, { players });
  return data;
}
