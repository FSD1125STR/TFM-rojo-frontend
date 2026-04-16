import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { showError, showToast } from '../utils/alerts';
import { LOGO_HORIZONTAL_URL as logoHorizontal } from '../assets/brand.js';
import { StrengthIndicator } from '../components/ui/StrengthIndicator';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    authService.validateResetToken(token).catch(() => {
      showError("El enlace de recuperación no es válido o ha expirado");
      navigate("/login", { replace: true });
    });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("Las contraseñas no coinciden");
      return;
    }
    setIsLoading(true);
    try {
      await authService.resetPassword(token, password);
      showToast("Contraseña actualizada correctamente");
      navigate("/login");
    } catch (err) {
      showError(err.response?.data?.error || "Error al restablecer");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div test-id="el-r5s9t4w1" className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logoHorizontal} alt="FootMind" className="h-16 mx-auto" />
        </div>

        <Card title="Nueva contraseña">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label htmlFor="rp-password" className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                id="rp-password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="new-password"
              />
              {password && <StrengthIndicator password={password} />}
            </div>

            <div className="form-control">
              <label htmlFor="rp-confirmPassword" className="label">
                <span className="label-text">Confirmar contraseña</span>
              </label>
              <input
                id="rp-confirmPassword"
                type="password"
                className={`input input-bordered w-full ${confirmPassword && password !== confirmPassword ? "input-error" : ""}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Restablecer contraseña
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link to="/login" className="link link-hover text-sm text-base-content/60">
              Volver al login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
