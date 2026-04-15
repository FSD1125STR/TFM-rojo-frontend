import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { Card } from "../../components/ui/Card";
import { showError } from "../../utils/alerts";
import { StrengthIndicator } from "../../components/StrengthIndicator";
import logoHorizontal from "../../assets/logo-horizontal.png";

export function RegisterAdmin() {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationCode: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (authLoading) return null;
  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 8) {
      showError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      await register(payload);
      navigate("/");
    } catch (err) {
      showError(
        err.response?.data?.error || "Error al registrar Administrador",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logoHorizontal} alt="FootMind" className="h-16 mx-auto" />
        </div>

        <Card title="Nuevo Administrador">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre completo</span>
              </label>
              <input
                name="fullName"
                type="text"
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email profesional</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="tu@email.com"
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-primary">
                  Código de Registro Club
                </span>
              </label>
              <input
                name="registrationCode"
                type="text"
                placeholder="VCF-XXXX-XXXX"
                className="input input-bordered border-primary w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-10"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 h-full px-3 flex items-center text-base-content/50 hover:text-base-content transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "visibility_off" : "visibility"}
                    size="sm"
                  />
                </button>
              </div>
              {formData.password && (
                <StrengthIndicator password={formData.password} />
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmar contraseña</span>
              </label>
              <input
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${formData.confirmPassword && formData.password !== formData.confirmPassword ? "input-error" : ""}`}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              isLoading={isLoading}
            >
              Registrar Administrador
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
