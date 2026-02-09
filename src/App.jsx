import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HeaderProvider } from './context/HeaderContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppShell } from './components/layout/AppShell/AppShell';

// Páginas públicas (auth)
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

// Páginas protegidas
import { Dashboard } from './pages/Dashboard';
import { PlayersList, PlayerDetail } from './pages/players';
import { MatchesList, MatchDetail } from './pages/matches';
import { CallupsList, CallupDetail } from './pages/callups';
import { UsersList, UserDetail } from './pages/users';
import { LiveMatch } from './pages/LiveMatch';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderProvider>
          <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/jugadores" element={<PlayersList />} />
              <Route path="/jugadores/:id" element={<PlayerDetail />} />
              <Route path="/partidos" element={<MatchesList />} />
              <Route path="/partidos/:id" element={<MatchDetail />} />
              <Route path="/convocatorias" element={<CallupsList />} />
              <Route path="/convocatorias/:id" element={<CallupDetail />} />
              <Route path="/usuarios" element={<UsersList />} />
              <Route path="/usuarios/:id" element={<UserDetail />} />
              <Route path="/directo" element={<LiveMatch />} />
            </Route>
          </Route>

          {/* Fallback - redirige a inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HeaderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
