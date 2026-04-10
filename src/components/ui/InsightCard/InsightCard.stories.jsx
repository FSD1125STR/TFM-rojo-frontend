import { InsightCard } from './InsightCard';

export default {
  title: 'UI/InsightCard',
  component: InsightCard,
  parameters: {
    docs: {
      description: {
        component:
          'Componente de tarjeta para mostrar insights o alertas contextuales con distintos niveles de severidad (warning, info, success).',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['warning', 'info', 'success'],
      description: 'Tipo de insight que determina el color y el icono',
    },
    title: {
      control: 'text',
      description: 'Título principal del insight',
    },
    description: {
      control: 'text',
      description: 'Descripción opcional con más detalle',
    },
  },
};

export const Warning = {
  args: {
    type: 'warning',
    title: 'Jugadores en riesgo',
    description: '3 jugadores acumulan 4 tarjetas amarillas.',
  },
};

export const Info = {
  args: {
    type: 'info',
    title: 'Próximo partido',
    description: 'El próximo partido es el sábado a las 17:00.',
  },
};

export const Success = {
  args: {
    type: 'success',
    title: 'Plantilla completa',
    description: 'Todos los jugadores están disponibles para la convocatoria.',
  },
};
