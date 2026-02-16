import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Detectar si estamos en Storybook
const isStorybook = typeof window !== 'undefined' && window.location.href.includes('localhost:6006');

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    // En Storybook, devolver valores vacíos (las stories pasan user por prop)
    if (isStorybook) {
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        isAdmin: false,
        login: async () => {},
        logout: () => {},
      };
    }

    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  const isAdmin = context.user?.role === 'administrador';

  return { ...context, isAdmin };
}
