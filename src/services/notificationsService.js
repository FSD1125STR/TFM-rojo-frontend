import api from './api';

export async function getMyNotifications() {
  const { data } = await api.get('/notifications');
  return data.data;
}

export async function markAsRead(notificationId) {
  const { data } = await api.patch(`/notifications/${notificationId}/read`);
  return data.data;
}

export async function markAllAsRead() {
  await api.patch('/notifications/read-all');
}
