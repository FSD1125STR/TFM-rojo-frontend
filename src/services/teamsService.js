import api from './api';

export async function getTeams(categoryId) {
  const params = {};
  if (categoryId) params.categoryId = categoryId;
  const { data } = await api.get('/teams', { params });
  return data;
}

export async function getAdminTeams() {
  const { data } = await api.get('/teams/admin');
  return data;
}

export async function createTeam(formData) {
  const { data } = await api.post('/teams', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateTeam(id, formData) {
  const { data } = await api.patch(`/teams/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteTeam(id) {
  const { data } = await api.delete(`/teams/${id}`);
  return data;
}
