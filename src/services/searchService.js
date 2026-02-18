import api from './api';

export async function searchGlobal(query) {
  const { data } = await api.get('/search', { params: { q: query } });
  return data;
}
