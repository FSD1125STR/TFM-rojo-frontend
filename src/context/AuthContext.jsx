import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = authService.getStoredToken();
    const storedUser = authService.getStoredUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const { token: newToken, user: newUser } = await authService.login(
      email,
      password,
    );
    setToken(newToken);
    setUser(newUser);
    return { token: newToken, user: newUser };
  }, []);

  const register = useCallback(async (userData) => {
    const { token: newToken, user: newUser } =
      await authService.register(userData);

    setToken(newToken);
    setUser(newUser);

    return { token: newToken, user: newUser };
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    window.location.href = "/login?logout=true";
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, token, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

