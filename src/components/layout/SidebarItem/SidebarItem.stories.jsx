import { SidebarItem } from './SidebarItem'

export default {
  title: 'Layout/SidebarItem',
  component: SidebarItem,
}

export const Default = {
  args: {
    icon: 'home',
    label: 'Dashboard',
    to: '/',
  },
}

export const Collapsed = {
  args: {
    icon: 'group',
    label: 'Jugadores',
    to: '/jugadores',
    collapsed: true,
  },
}

export const Active = {
  args: {
    icon: 'sports_soccer',
    label: 'Partidos',
    to: '/partidos',
  },
  parameters: {
    reactRouter: {
      location: { pathname: '/partidos' },
      routing: { path: '/partidos' },
    },
  },
}
