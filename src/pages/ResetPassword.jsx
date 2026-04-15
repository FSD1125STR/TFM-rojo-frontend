import { useState } from "react";
import { useSearchParams, Link, useNavigate, Navigate } from "react-router-dom";
import { authService } from "../services/authService";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Card } from "../components/ui/Card";
import { showError, showToast } from "../utils/alerts";
import logoHorizontal from "../assets/logo-horizontal.png";
import { StrengthIndicator } from "../components/StrengthIndicator";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!token) return <Navigate to="/login" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("Las contraseñas no coinciden");
      return;
    }

    const isStrong =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[@$!%*?&]/.test(password);
    if (!isStrong) {
      showError("La contraseña no cumple los requisitos");
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
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12 font-montserrat">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pr-10 bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 h-full px-3 flex items-center text-base-content/40"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "visibility_off" : "visibility"}
                    size="sm"
                  />
                </button>
              </div>
              <StrengthIndicator password={password} />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmar contraseña</span>
              </label>
              <input
                type="password"
                className={`input input-bordered w-full bg-white ${confirmPassword && password !== confirmPassword ? "input-error" : ""}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-[#455a51] hover:bg-[#384a42] text-white border-none"
              isLoading={isLoading}
            >
              Restablecer contraseña
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link to="/login" className="link link-hover text-sm opacity-60">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
