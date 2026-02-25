import api from './api';

export async function getTeams(categoryId) {
  const params = {};
  if (categoryId) params.categoryId = categoryId;
  const { data } = await api.get('/teams', { params });
  return data;
}
