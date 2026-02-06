import { useState, useEffect } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button/Button'
import { Card } from '../components/ui/Card/Card'
import { Icon } from '../components/ui/Icon/Icon'
import logoHorizontal from '../assets/logo-horizontal.png'

export function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated, isLoading: authLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [logoutMessage, setLogoutMessage] = useState(() => {
    return new URLSearchParams(window.location.search).get('logout') === 'true'
  })

  useEffect(() => {
    if (logoutMessage) {
      window.history.replaceState({}, '', '/login')
      const timer = setTimeout(() => setLogoutMessage(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [logoutMessage])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Por favor, completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      setError('Por favor, introduce un email válido')
      return
    }

    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Email o contraseña incorrectos')
      } else if (err.response?.status >= 500) {
        setError('Error del servidor. Inténtalo más tarde')
      } else if (!err.response) {
        setError('Sin conexión. Verifica tu internet')
      } else {
        setError('Error al iniciar sesión')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div test-id="el-login1a2" className="min-h-screen flex items-center justify-center bg-base-200 px-4">
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

        {logoutMessage && (
          <div className="alert alert-success mb-4">
            <Icon name="check_circle" size="sm" />
            <span>Sesión terminada</span>
          </div>
        )}

        <Card>
          <Card.Body>
            <Card.Title className="justify-center mb-4">Iniciar sesión</Card.Title>

            {error && (
              <div className="alert alert-error mb-4">
                <Icon name="error" size="sm" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
                <label className="label">
                  <span className="label-text">Contraseña</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
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
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
