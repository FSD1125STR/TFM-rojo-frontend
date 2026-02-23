import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { Button } from '../components/ui/Button/Button';
import { Card } from '../components/ui/Card/Card';
import { Icon } from '../components/ui/Icon/Icon';
import { showError } from '../utils/alerts';
import logoHorizontal from '../assets/logo-horizontal.png';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showError('Por favor, introduce tu email');
      return;
    }

    if (!email.includes('@')) {
      showError('Por favor, introduce un email válido');
      return;
    }

    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      const message = err.response?.data?.error
        || (err.response ? 'Error al enviar el email' : 'Sin conexión. Verifica tu internet');
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div test-id="el-forgot1a2" className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src={logoHorizontal}
              alt="FootMind"
              className="h-16"
            />
          </div>
        </div>

        <Card title="Recuperar contraseña">
            <p className="text-center text-base-content/60 text-sm mb-4">
              Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
            </p>

            {success ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-success/20 rounded-full p-4">
                    <Icon name="mark_email_read" size="lg" className="text-success" />
                  </div>
                </div>
                <p className="text-base-content mb-4">
                  Si el email existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
                </p>
                <Link to="/login" className="btn btn-primary w-full">
                  Volver al login
                </Link>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-6">
                    <label htmlFor="forgot-email" className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      id="forgot-email"
                      type="email"
                      placeholder="tu@email.com"
                      className="input input-bordered w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      autoComplete="email"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mb-4"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  >
                    Enviar enlace
                  </Button>
                </form>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="link link-hover text-sm text-base-content/70"
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
