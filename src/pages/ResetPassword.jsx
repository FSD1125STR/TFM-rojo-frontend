import { useState } from "react";
import { useSearchParams, Link, Navigate } from "react-router-dom";
import { authService } from "../services/authService";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Icon } from "../components/ui/Icon";
import { showError } from "../utils/alerts";
import logoHorizontal from "../assets/logo-horizontal.png";
import StrengthPassword from "../components/StrengthPassword";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        (err.response ? "Error al restablecer la contraseña" : "Sin conexión");
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBFFFD] px-4 font-montserrat">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={logoHorizontal} alt="FootMind" className="h-16" />
          </div>
          <h1 className="text-2xl font-bold text-[#5C6F68]">FootMind</h1>
        </div>

        <Card title="Nueva contraseña">
          <p className="text-center text-base-content/60 text-sm mb-4">
            Introduce tu nueva contraseña de acceso al club.
          </p>

          {success ? (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-success/20 rounded-full p-4">
                  <Icon
                    name="check_circle"
                    size="lg"
                    className="text-success"
                  />
                </div>
              </div>
              <p className="text-base-content mb-4">
                Tu contraseña ha sido restablecida correctamente.
              </p>
              <Link
                to="/login"
                className="btn bg-[#5C6F68] text-white w-full border-none hover:bg-[#8AA39B]"
              >
                Iniciar sesión
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-bold text-[#5C6F68]">
                      Nueva contraseña
                    </span>
                  </label>
                  <StrengthPassword
                    onChange={(val, isValid) => {
                      setPassword(val);
                      setIsPasswordStrong(isValid);
                    }}
                  />
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text font-bold text-[#5C6F68]">
                      Confirmar contraseña
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full focus:border-[#5C6F68]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full mb-4 bg-[#5C6F68] text-white border-none hover:bg-[#8AA39B]"
                  isLoading={isLoading}
                  isDisabled={
                    isLoading ||
                    !isPasswordStrong ||
                    password !== confirmPassword
                  }
                >
                  Restablecer contraseña
                </Button>
              </form>

              <div className="text-center">
                <Link
                  to="/login"
                  className="link link-hover text-sm text-[#8AA39B]"
                >
                  Volver al login
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
