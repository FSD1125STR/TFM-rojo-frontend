import api from "./api";

export const userService = {
  async getUsers() {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createUser(userData) {
    try {
      const response = await api.post("/users", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(id, userData) {
    try {
      const response = await api.patch(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
