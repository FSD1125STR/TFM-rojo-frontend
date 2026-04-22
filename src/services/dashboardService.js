import api from './api';

export async function getDelegadoDashboard() {
  const { data } = await api.get('/dashboard/delegado');
  return data;
}
export async function getEntrenadorDashboard() {
  const { data } = await api.get('/dashboard/entrenador');
  return data;
}
export async function getDireccionDashboard() {
  const { data } = await api.get('/dashboard/direccion');
  return data;
}
export async function getAdminDashboard() {
  const { data } = await api.get('/dashboard/admin');
  return data;
}
