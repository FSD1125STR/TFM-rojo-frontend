import { useState } from 'react'
import { useSearchParams, Link, Navigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { Button } from '../components/ui/Button/Button'
import { Card } from '../components/ui/Card/Card'
import { Icon } from '../components/ui/Icon/Icon'
import logoHorizontal from '../assets/logo-horizontal.png'

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!password || !confirmPassword) {
      setError('Por favor, completa todos los campos')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setIsLoading(true)

    try {
      await authService.resetPassword(token, password)
      setSuccess(true)
    } catch (err) {
      if (err.response?.status === 400) {
        setError('El enlace ha expirado o no es válido')
      } else {
        setError('Error al restablecer la contraseña')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div test-id="el-reset1a2" className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src={logoHorizontal}
              alt="FootMind"
              className="h-16"
            />
          </div>
          <h1 className="text-2xl font-bold text-base-content">FootMind</h1>
        </div>

        <Card>
          <Card.Body>
            <Card.Title className="justify-center mb-2">Nueva contraseña</Card.Title>
            <p className="text-center text-base-content/60 text-sm mb-4">
              Introduce tu nueva contraseña.
            </p>

            {success ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-success/20 rounded-full p-4">
                    <Icon name="check_circle" size="lg" className="text-success" />
                  </div>
                </div>
                <p className="text-base-content mb-4">
                  Tu contraseña ha sido restablecida correctamente.
                </p>
                <Link to="/login" className="btn btn-primary w-full">
                  Iniciar sesión
                </Link>
              </div>
            ) : (
              <>
                {error && (
                  <div className="alert alert-error mb-4">
                    <Icon name="error" size="sm" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Nueva contraseña</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                  </div>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text">Confirmar contraseña</span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-bordered w-full"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      autoComplete="new-password"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mb-4"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  >
                    Restablecer contraseña
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
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
