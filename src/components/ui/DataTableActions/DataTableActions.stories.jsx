import { DataTableActions } from './DataTableActions'

// Función mock para las acciones
const createAction = (name) => (row) => {
  console.log(`${name} clicked:`, row)
  alert(`${name}: ${row.nombre || row.id}`)
}

export default {
  title: 'UI/DataTableActions',
  component: DataTableActions,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente de menú desplegable para acciones en filas de tabla. Incluye header, separación automática de acciones peligrosas (danger), e iconos.',
      },
    },
  },
  argTypes: {
    actions: {
      description: 'Array de acciones disponibles',
      control: 'object',
      table: {
        category: 'Acciones',
      },
    },
    row: {
      description: 'Datos de la fila actual (se pasa a onClick)',
      control: 'object',
      table: {
        category: 'Datos',
      },
    },
    title: {
      description: 'Título del dropdown',
      control: 'text',
      table: {
        category: 'Apariencia',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '250px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '20px' }}>
        <Story />
      </div>
    ),
  ],
}

// Datos de ejemplo
const sampleRow = {
  id: 1,
  nombre: 'Carlos Méndez',
  dorsal: 9,
  posicion: 'Delantero',
  estado: 'Activo',
}

// Acciones de ejemplo
const defaultActions = [
  {
    label: 'Ver detalle',
    icon: 'visibility',
    onClick: createAction('Ver detalle'),
  },
  {
    label: 'Editar',
    icon: 'edit',
    onClick: createAction('Editar'),
  },
  {
    label: 'Dar de baja',
    icon: 'person_off',
    onClick: createAction('Dar de baja'),
    variant: 'danger',
  },
]

// Story principal
export const Default = {
  args: {
    actions: defaultActions,
    row: sampleRow,
    title: 'Acciones',
  },
}

// Sin título
export const SinTitulo = {
  args: {
    actions: defaultActions,
    row: sampleRow,
    title: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Menú sin título/header.',
      },
    },
  },
}

// Solo acciones normales (sin danger)
export const SoloAccionesNormales = {
  args: {
    actions: [
      { label: 'Ver detalle', icon: 'visibility', onClick: createAction('Ver detalle') },
      { label: 'Editar', icon: 'edit', onClick: createAction('Editar') },
      { label: 'Duplicar', icon: 'content_copy', onClick: createAction('Duplicar') },
    ],
    row: sampleRow,
    title: 'Acciones',
  },
  parameters: {
    docs: {
      description: {
        story: 'Menú con solo acciones normales, sin separador.',
      },
    },
  },
}

// Solo acción danger
export const SoloAccionDanger = {
  args: {
    actions: [
      { label: 'Eliminar', icon: 'delete', onClick: createAction('Eliminar'), variant: 'danger' },
    ],
    row: sampleRow,
    title: 'Acciones',
  },
  parameters: {
    docs: {
      description: {
        story: 'Menú con solo una acción de peligro.',
      },
    },
  },
}

// Múltiples acciones danger
export const MultiplesAccionesDanger = {
  args: {
    actions: [
      { label: 'Ver detalle', icon: 'visibility', onClick: createAction('Ver detalle') },
      { label: 'Editar', icon: 'edit', onClick: createAction('Editar') },
      { label: 'Suspender', icon: 'pause_circle', onClick: createAction('Suspender'), variant: 'danger' },
      { label: 'Dar de baja', icon: 'person_off', onClick: createAction('Dar de baja'), variant: 'danger' },
      { label: 'Eliminar', icon: 'delete', onClick: createAction('Eliminar'), variant: 'danger' },
    ],
    row: sampleRow,
    title: 'Acciones',
  },
  parameters: {
    docs: {
      description: {
        story: 'Menú con múltiples acciones de peligro, todas agrupadas bajo el separador.',
      },
    },
  },
}

// Sin iconos
export const SinIconos = {
  args: {
    actions: [
      { label: 'Ver detalle', onClick: createAction('Ver detalle') },
      { label: 'Editar', onClick: createAction('Editar') },
      { label: 'Eliminar', onClick: createAction('Eliminar'), variant: 'danger' },
    ],
    row: sampleRow,
    title: 'Acciones',
  },
  parameters: {
    docs: {
      description: {
        story: 'Menú sin iconos, solo texto.',
      },
    },
  },
}

// Título personalizado
export const TituloPersonalizado = {
  args: {
    actions: defaultActions,
    row: sampleRow,
    title: 'Opciones del jugador',
  },
  parameters: {
    docs: {
      description: {
        story: 'Menú con título personalizado.',
      },
    },
  },
}

// Muchas acciones
export const MuchasAcciones = {
  args: {
    actions: [
      { label: 'Ver perfil', icon: 'person', onClick: createAction('Ver perfil') },
      { label: 'Ver estadísticas', icon: 'bar_chart', onClick: createAction('Ver estadísticas') },
      { label: 'Ver historial', icon: 'history', onClick: createAction('Ver historial') },
      { label: 'Editar datos', icon: 'edit', onClick: createAction('Editar datos') },
      { label: 'Cambiar equipo', icon: 'swap_horiz', onClick: createAction('Cambiar equipo') },
      { label: 'Enviar mensaje', icon: 'mail', onClick: createAction('Enviar mensaje') },
      { label: 'Dar de baja', icon: 'person_off', onClick: createAction('Dar de baja'), variant: 'danger' },
    ],
    row: sampleRow,
    title: 'Acciones',
  },
  parameters: {
    docs: {
      description: {
        story: 'Menú con muchas acciones.',
      },
    },
  },
}

// Ejemplo para jugadores
export const AccionesJugador = {
  args: {
    actions: [
      { label: 'Ver detalle', icon: 'visibility', onClick: createAction('Ver detalle') },
      { label: 'Editar', icon: 'edit', onClick: createAction('Editar') },
      { label: 'Dar de baja', icon: 'person_off', onClick: createAction('Dar de baja'), variant: 'danger' },
    ],
    row: {
      id: 2,
      nombre: 'Diego Silva',
      dorsal: 10,
      posicion: 'Centrocampista',
      estado: 'Activo',
    },
    title: 'Acciones',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo típico de acciones para un jugador.',
      },
    },
  },
}
