import { QuickActions } from './QuickActions';

export default {
  title: 'UI/QuickActions',
  component: QuickActions,
  parameters: {
    docs: {
      description: {
        component:
          'Componente para mostrar acciones rápidas de navegación en el dashboard. Renderiza botones que enrutan al usuario a distintas secciones.',
      },
    },
  },
  argTypes: {
    actions: {
      control: 'object',
      description: 'Array de acciones rápidas con id, label, route e icono opcional',
    },
  },
};

export const Default = {
  args: {
    actions: [
      { id: 'players', label: 'Ver jugadores', route: '/jugadores', icon: 'groups' },
      { id: 'matches', label: 'Ver partidos', route: '/partidos', icon: 'sports_soccer' },
      { id: 'callups', label: 'Gestionar convocatorias', route: '/convocatorias', icon: 'assignment' },
    ],
  },
};
