import api from './api';

export const getLiveMatches = () =>
  api.get('/livematch').then((r) => r.data);

export const getLiveMatchById = (id) =>
  api.get(`/livematch/${id}`).then((r) => r.data);
