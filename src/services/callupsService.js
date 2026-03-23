// Servicio de convocatorias — llamadas a la API REST
import api from './api';

export async function getCallupByMatch(matchId) {
  const { data } = await api.get(`/callups/match/${matchId}`);
  const rawMatch = data.matchId ?? {};
  const match = {
    ...rawMatch,
    homeTeam: rawMatch.homeTeamId,
    awayTeam: rawMatch.awayTeamId,
  };
  const players = (data.players ?? []).map((p) => {
    const player = p.playerId ?? {};
    const isBlocked = player.status === 'LESIONADO' || player.status === 'SANCIONADO';
    return {
      id: player._id,
      fullName: player.fullName,
      position: player.position,
      dorsal: player.dorsal,
      playerStatus: player.status,
      callupStatus: p.status,
      reasonCode: p.reasonCode ?? null,
      isBlocked,
    };
  });
  return {
    match,
    callup: data,
    players,
    maxPlayers: 18,
    minPlayers: 11,
  };
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

export async function saveCallupPlayers(callupId, players) {
  const { data } = await api.patch(`/callups/${callupId}`, { players });
  return data;
}

export async function deleteCallup(id) {
  await api.delete(`/callups/${id}`);
}
