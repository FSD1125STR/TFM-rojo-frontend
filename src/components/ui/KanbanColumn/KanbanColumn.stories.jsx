import { KanbanColumn } from './KanbanColumn';

export default {
  title: 'UI/KanbanColumn',
  component: KanbanColumn,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Columna estructural de tablero Kanban. Puramente presentacional: sin lógica de drop. Muestra header con título, contador y icono, y un área scrollable para los hijos.',
      },
    },
  },
  argTypes: {
    title: { description: 'Título de la columna', control: 'text' },
    count: { description: 'Número actual de elementos', control: 'number' },
    total: { description: 'Máximo de elementos (muestra count/total)', control: 'number' },
    icon: { description: 'Nombre del icono Material Symbols', control: 'text' },
    variant: {
      description: 'Variante de color',
      control: 'select',
      options: ['default', 'success', 'error'],
    },
    isOver: {
      description: 'Si el cursor está sobre la columna durante un drag (activa highlight de drop zone)',
      control: 'boolean',
    },
    className: { description: 'Clases CSS adicionales', control: 'text' },
  },
};

const placeholder = (
  <div className="flex flex-col gap-2">
    {['Jugador A', 'Jugador B', 'Jugador C'].map((name) => (
      <div key={name} className="p-3 rounded-xl bg-base-100 border border-base-300 text-sm">{name}</div>
    ))}
  </div>
);

export const Default = {
  args: {
    title: 'Disponibles',
    count: 8,
    icon: 'group',
    variant: 'default',
    isOver: false,
    children: placeholder,
  },
};

export const Success = {
  args: {
    title: 'Convocados',
    count: 12,
    total: 18,
    icon: 'check_circle',
    variant: 'success',
    isOver: false,
    children: placeholder,
  },
  parameters: {
    docs: { description: { story: 'Columna de convocados con contador máximo (12/18).' } },
  },
};

export const Error = {
  args: {
    title: 'No convocados',
    count: 3,
    icon: 'block',
    variant: 'error',
    isOver: false,
    children: placeholder,
  },
  parameters: {
    docs: { description: { story: 'Columna de no convocados con variante de color error.' } },
  },
};

export const IsOver = {
  args: {
    title: 'Convocados',
    count: 12,
    total: 18,
    icon: 'check_circle',
    variant: 'success',
    isOver: true,
    children: placeholder,
  },
  parameters: {
    docs: { description: { story: 'Estado activo durante drag — borde y fondo resaltados.' } },
  },
};

export const Vacia = {
  args: {
    title: 'Disponibles',
    count: 0,
    icon: 'group',
    variant: 'default',
    isOver: false,
  },
  parameters: {
    docs: { description: { story: 'Columna vacía sin jugadores.' } },
  },
};

export const TresColumnas = {
  render: () => (
    <div className="flex gap-4 w-full">
      <div className="flex-1">
        <KanbanColumn title="Disponibles" count={8} icon="group" variant="default">
          {placeholder}
        </KanbanColumn>
      </div>
      <div className="flex-1">
        <KanbanColumn title="Convocados" count={12} total={18} icon="check_circle" variant="success">
          {placeholder}
        </KanbanColumn>
      </div>
      <div className="flex-1">
        <KanbanColumn title="No convocados" count={3} icon="block" variant="error">
          {placeholder}
        </KanbanColumn>
      </div>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'Las tres columnas del tablero Kanban juntas.' } },
  },
};
