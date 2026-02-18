import api from './api';

export async function getPlayersKpis(categoryId) {
  const params = {};
  if (categoryId) params.categoryId = categoryId;
  const { data } = await api.get('/players/kpis', { params });
  return data;
}
