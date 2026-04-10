import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { HeaderProvider } from "./context/HeaderContext.jsx";
import { NotificationsProvider } from "./context/NotificationsContext.jsx";
import { LiveMatchProvider } from "./context/LiveMatchContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LiveProtectedRoute } from "./components/LiveProtectedRoute";
import { AppShell } from "./components/layout/AppShell/AppShell";
import { PublicLayout } from "./components/layout/PublicLayout/PublicLayout";

// Páginas públicas (auth)
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { RegisterAdmin } from "./pages/auth/RegisterAdmin";

// Páginas protegidas
import { Dashboard } from "./pages/Dashboard";
import { PlayersList, PlayerDetail } from "./pages/players";
import { MatchesList, MatchDetail } from "./pages/matches";
import { LiveMatchPage } from "./pages/matches/live/LiveMatchPage";
import { CallupsList, CallupDetail } from "./pages/callups";
import { UsersList, UserDetail } from "./pages/users";
import { LiveMatch } from "./pages/LiveMatch";
import { TeamsList } from "./pages/teams";

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      await import("preline/dist/index.js");
      window.HSStaticMethods?.autoInit();
    };
    init();
  }, [location.pathname]);

  return (
    <Routes>
      {/* Rutas públicas - siempre tema light */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterAdmin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Rutas protegidas - acceso general */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />

          {/* Rutas con permiso de jugadores */}
          <Route element={<ProtectedRoute permission="players.view" />}>
            <Route path="/jugadores" element={<PlayersList />} />
            <Route path="/jugadores/:id" element={<PlayerDetail />} />
          </Route>

          {/* Rutas con permiso de partidos */}
          <Route element={<ProtectedRoute permission="matches.view" />}>
            <Route path="/partidos" element={<MatchesList />} />
            <Route path="/partidos/:id" element={<MatchDetail />} />
            <Route path="/directo/:id" element={<LiveMatchPage />} />
          </Route>

          {/* Rutas con permiso de convocatorias */}
          <Route element={<ProtectedRoute permission="callups.view" />}>
            <Route path="/convocatorias" element={<CallupsList />} />
            <Route path="/convocatorias/:id" element={<CallupDetail />} />
          </Route>

          {/* Rutas con permiso de usuarios */}
          <Route element={<ProtectedRoute permission="users.view" />}>
            <Route path="/usuarios" element={<UsersList />} />
            <Route path="/usuarios/:id" element={<UserDetail />} />
          </Route>

          {/* Rutas con permiso de equipos */}
          <Route element={<ProtectedRoute permission="teams.create" />}>
            <Route path="/equipos" element={<TeamsList />} />
          </Route>

          {/* Ruta de partido en directo: live.update O direccion con partido activo */}
          <Route element={<LiveProtectedRoute />}>
            <Route path="/directo" element={<LiveMatch />} />
          </Route>
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
          <NotificationsProvider>
            <LiveMatchProvider>
              <AppRoutes />
            </LiveMatchProvider>
          </NotificationsProvider>
        </HeaderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
