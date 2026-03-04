import { ProgressBar } from './ProgressBar';

export default {
  title: 'Graphics/ProgressBar',
  component: ProgressBar,
  argTypes: {
    label: {
      control: 'text',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    subtitle: {
      control: 'text',
    },
    color: {
      control: 'color',
    },
    animated: {
      control: 'boolean',
    },
  },
};

export const Default = {
  args: {
    label: 'Goles marcados',
    value: 65,
    subtitle: '13 de 20 partidos con gol',
    color: '#1e6b3c',
    animated: false,
  },
};

export const FullProgress = {
  args: {
    label: 'Asistencias completadas',
    value: 100,
    subtitle: 'Objetivo de temporada alcanzado',
    color: '#1e6b3c',
    animated: false,
  },
};

export const LowProgress = {
  args: {
    label: 'Minutos jugados',
    value: 12,
    subtitle: '108 de 900 minutos posibles',
    color: '#1e6b3c',
    animated: false,
  },
};

export const NoSubtitle = {
  args: {
    label: 'Tarjetas amarillas',
    value: 48,
    color: '#1e6b3c',
    animated: false,
  },
};

export const CustomColor = {
  args: {
    label: 'Rendimiento defensivo',
    value: 74,
    subtitle: 'Porcentaje de duelos ganados',
    color: '#6366f1',
    animated: false,
  },
};

export const Animated = {
  args: {
    label: 'Pases completados',
    value: 83,
    subtitle: 'Precisión en pases esta temporada',
    color: '#1e6b3c',
    animated: true,
  },
};
