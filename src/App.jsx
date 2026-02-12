import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HeaderProvider } from './context/HeaderContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppShell } from './components/layout/AppShell/AppShell';
import { PublicLayout } from './components/layout/PublicLayout/PublicLayout';

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

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      await import('preline/dist/index.js');
      window.HSStaticMethods?.autoInit();
    };
    init();
  }, [location.pathname]);

  return (
    <Routes>
      {/* Rutas públicas - siempre tema light */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

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
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderProvider>
          <AppRoutes />
        </HeaderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
