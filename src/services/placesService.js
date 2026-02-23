import api from './api';

export async function searchPlaces(query) {
  const { data } = await api.get('/places/search', { params: { q: query } });
  return data;
}
