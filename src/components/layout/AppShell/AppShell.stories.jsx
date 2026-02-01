import { AppShell } from './AppShell'
import { Button } from '../../ui/Button/Button'

export default {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
}

export const DesktopExpanded = {
  args: {
    title: 'Dashboard',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export const DesktopWithActions = {
  args: {
    title: 'Jugadores',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Jugadores' },
    ],
    actions: (
      <>
        <Button variant="primary" size="sm">Crear jugador</Button>
        <Button variant="secondary" size="sm">Crear partido</Button>
      </>
    ),
  },
}

export const Mobile = {
  args: {
    title: 'Dashboard',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const Tablet = {
  args: {
    title: 'Partidos',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Partidos' },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}
