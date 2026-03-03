import { PlayerCard } from './PlayerCard';

export default {
  title: 'UI/PlayerCard',
  component: PlayerCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tarjeta de jugador puramente presentacional. Muestra avatar, nombre, posición, dorsal y estado de bloqueo (lesión/sanción). Sin lógica de drag & drop.',
      },
    },
  },
  argTypes: {
    player: {
      description: 'Datos del jugador',
      control: 'object',
    },
    isBlocked: {
      description: 'Si el jugador está bloqueado (lesionado o sancionado), reduce opacidad y muestra badge de bloqueo',
      control: 'boolean',
    },
    className: {
      description: 'Clases CSS adicionales',
      control: 'text',
    },
  },
};

const basePlayer = {
  fullName: 'Carlos García Martínez',
  photoUrl: '',
  position: 'Delantero',
  dorsal: 9,
  playerStatus: 'DISPONIBLE',
};

export const Normal = {
  args: {
    player: basePlayer,
    isBlocked: false,
  },
  parameters: {
    docs: { description: { story: 'Jugador disponible con dorsal y posición.' } },
  },
};

export const Bloqueado = {
  args: {
    player: { ...basePlayer, fullName: 'Juan Sánchez López', playerStatus: 'LESIONADO', dorsal: 7 },
    isBlocked: true,
  },
  parameters: {
    docs: { description: { story: 'Jugador bloqueado por lesión. Opacidad reducida y badge LES.' } },
  },
};

export const Sancionado = {
  args: {
    player: { ...basePlayer, fullName: 'Pedro Ruiz Gómez', playerStatus: 'SANCIONADO', dorsal: 4 },
    isBlocked: true,
  },
  parameters: {
    docs: { description: { story: 'Jugador bloqueado por sanción. Badge SAN.' } },
  },
};

export const SinDorsal = {
  args: {
    player: { ...basePlayer, dorsal: undefined, fullName: 'Luis Torres Vega' },
    isBlocked: false,
  },
  parameters: {
    docs: { description: { story: 'Jugador sin número de dorsal asignado.' } },
  },
};

export const SinFoto = {
  args: {
    player: { ...basePlayer, photoUrl: '', fullName: 'Ana Moreno García' },
    isBlocked: false,
  },
  parameters: {
    docs: { description: { story: 'Jugador sin foto — muestra iniciales en el avatar.' } },
  },
};

export const NombreLargo = {
  args: {
    player: { ...basePlayer, fullName: 'Francisco Javier Rodríguez Fernández de la Peña', dorsal: 11 },
    isBlocked: false,
  },
  parameters: {
    docs: { description: { story: 'Nombre muy largo — truncado con ellipsis.' } },
  },
};

export const Variantes = {
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <PlayerCard player={basePlayer} isBlocked={false} />
      <PlayerCard player={{ ...basePlayer, fullName: 'Lesionado Example', playerStatus: 'LESIONADO', dorsal: 7 }} isBlocked={true} />
      <PlayerCard player={{ ...basePlayer, fullName: 'Sancionado Example', playerStatus: 'SANCIONADO', dorsal: 4 }} isBlocked={true} />
      <PlayerCard player={{ ...basePlayer, dorsal: undefined, fullName: 'Sin Dorsal' }} isBlocked={false} />
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Comparación de todas las variantes: normal, lesionado, sancionado y sin dorsal.' } },
  },
};
