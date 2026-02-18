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
