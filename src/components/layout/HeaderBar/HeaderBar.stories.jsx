import { HeaderBar } from './HeaderBar'
import { Button } from '../../ui/Button/Button'

export default {
  title: 'Layout/HeaderBar',
  component: HeaderBar,
  argTypes: {
    sidebarMode: {
      control: 'select',
      options: ['drawer', 'expanded', 'collapsed'],
    },
  },
}

export const Default = {
  args: {
    title: 'Dashboard',
  },
}

export const WithBreadcrumbs = {
  args: {
    title: 'Detalle Jugador',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Jugadores', to: '/jugadores' },
      { label: 'Juan García' },
    ],
  },
}

export const WithActions = {
  args: {
    title: 'Jugadores',
    actions: (
      <>
        <Button variant="primary" size="sm">Crear jugador</Button>
        <Button variant="secondary" size="sm">Crear partido</Button>
      </>
    ),
  },
}

export const Complete = {
  args: {
    title: 'Partidos',
    breadcrumbs: [
      { label: 'Inicio', to: '/' },
      { label: 'Partidos' },
    ],
    actions: <Button variant="primary" size="sm">Nuevo partido</Button>,
  },
}

export const SidebarExpanded = {
  args: {
    title: 'Dashboard',
    sidebarMode: 'expanded',
  },
}

export const SidebarCollapsed = {
  args: {
    title: 'Dashboard',
    sidebarMode: 'collapsed',
  },
}

export const MobileDrawer = {
  args: {
    title: 'Dashboard',
    sidebarMode: 'drawer',
  },
}
