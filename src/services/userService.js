import api from "./api";

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function getUserById(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

export async function createUser(userData) {
  const { data } = await api.post("/users", userData);
  return data;
}

export async function updateUser(id, userData) {
  const { data } = await api.patch(`/users/${id}`, userData);
  return data;
}

export async function toggleUserStatus(id) {
  const { data } = await api.patch(`/users/${id}/status`);
  return data;
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}
