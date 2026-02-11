import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell/AppShell'
import { Dashboard } from './pages/Dashboard'
import { JugadoresPage, JugadorDetallePage } from './pages/Jugadores'
import { Matches } from './pages/Matches'
import { LiveMatch } from './pages/LiveMatch'
import { Callups } from './pages/Callups'
import { Users } from './pages/Users'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jugadores" element={<JugadoresPage />} />
          <Route path="/jugadores/:id" element={<JugadorDetallePage />} />
          <Route path="/partidos" element={<Matches />} />
          <Route path="/directo" element={<LiveMatch />} />
          <Route path="/convocatorias" element={<Callups />} />
          <Route path="/usuarios" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
