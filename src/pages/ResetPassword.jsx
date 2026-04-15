import { useState } from 'react';
import { useSearchParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { showError, showToast } from '../utils/alerts';
import { LOGO_HORIZONTAL_URL as logoHorizontal } from '../assets/brand.js';
import { StrengthPassword } from '../components/ui/StrengthPassword';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!token) return <Navigate to="/login" replace />;

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
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <StrengthPassword
                onChange={(val, isValid) => {
                  setPassword(val);
                  setIsPasswordStrong(isValid);
                }}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmar contraseña</span>
              </label>
              <input
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
              isDisabled={isLoading || !isPasswordStrong || password !== confirmPassword}
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
