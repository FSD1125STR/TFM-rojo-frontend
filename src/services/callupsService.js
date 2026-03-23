// Servicio de convocatorias — llamadas a la API REST
import api from './api';

export async function getCallupByMatch(matchId) {
  const { data } = await api.get(`/callups/match/${matchId}`);
  return data;
}

// Devuelve { [matchId]: { hasCallup, calledCount, notCalledCount } }
export async function getCallupsStatus(matchIds) {
  if (!matchIds?.length) return {};
  const { data } = await api.get('/callups/status', {
    params: { matchIds: matchIds.join(',') },
  });
  return data;
}

export async function createCallup(payload) {
  const { data } = await api.post('/callups', payload);
  return data;
}

export async function updateCallup(id, payload) {
  const { data } = await api.patch(`/callups/${id}`, payload);
  return data;
}

export async function deleteCallup(id) {
  await api.delete(`/callups/${id}`);
}
