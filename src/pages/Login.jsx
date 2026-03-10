import { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Card } from '../components/ui/Card';
import { showError, showToast } from '../utils/alerts';
import logoHorizontal from '../assets/logo-horizontal.png';

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get("reason");
    if (new URLSearchParams(window.location.search).get("logout") === "true") {
      window.history.replaceState({}, "", "/login");
      showToast("Sesión terminada", "success");
    } else if (reason === "server_down") {
      window.history.replaceState({}, "", "/login");
      showError("No se puede conectar con el servidor. Inténtalo más tarde.");
    }
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Por favor, completa todos los campos");
      return;
    }

    if (!email.includes("@")) {
      showError("Por favor, introduce un email válido");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        (err.response
          ? "Error al iniciar sesión"
          : "Sin conexión. Verifica tu internet");
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div test-id="el-l9g2n5k7" className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logoHorizontal} alt="FootMind" className="h-16" />
          </div>
        </div>

        <Card title="Iniciar sesión" className="justify-center mb-4">
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label htmlFor="login-email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="tu@email.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="form-control mb-6">
              <label htmlFor="login-password" className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer text-base-content/50 hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} size="sm" />
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Entrar
            </Button>
          </form>

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="link link-hover text-sm text-base-content/70"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <div className="divider text-sm opacity-60 my-6">O</div>

          <Link to="/register" className="w-full block">
            <Button
              variant="secondary"
              className="w-full"
              isDisabled={isLoading}
            >
              Crear cuenta nueva
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
