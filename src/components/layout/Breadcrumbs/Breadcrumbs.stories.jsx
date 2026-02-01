import { Breadcrumbs } from './Breadcrumbs'

export default {
  title: 'Layout/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact'],
    },
  },
}

export const Default = {
  args: {
    items: [
      { label: 'Inicio', to: '/' },
      { label: 'Jugadores', to: '/jugadores' },
      { label: 'Detalle' },
    ],
    variant: 'default',
  },
}

export const Compact = {
  args: {
    items: [
      { label: 'Inicio', to: '/' },
      { label: 'Partidos', to: '/partidos' },
      { label: 'Nuevo partido' },
    ],
    variant: 'compact',
  },
}

export const TwoLevels = {
  args: {
    items: [
      { label: 'Dashboard', to: '/' },
      { label: 'Ajustes' },
    ],
  },
}
