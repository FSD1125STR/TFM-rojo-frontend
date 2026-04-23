import api from "./api";

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
  },

  async register(userData) {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  async validateResetToken(token) {
    const response = await api.get(`/auth/validate-reset-token?token=${token}`);
    return response.data;
  },

  async resetPassword(token, password) {
    const response = await api.post("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getStoredUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getStoredToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};
