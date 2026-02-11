import { DataTable } from './DataTable'
import { Badge } from '../Badge/Badge'

// Función mock para las acciones
const createAction = (name) => (row) => {
  console.log(`${name} clicked:`, row)
  alert(`${name}: ${row.nombre || row.id}`)
}

// Función mock para acciones masivas
const createBulkAction = (name) => (rows) => {
  console.log(`${name} clicked for ${rows.length} rows:`, rows)
  alert(`${name}: ${rows.length} filas seleccionadas`)
}

// Datos genéricos de ejemplo
const sampleData = [
  { id: 1, nombre: 'Juan García', email: 'juan@email.com', rol: 'Admin', estado: 'Activo' },
  { id: 2, nombre: 'María López', email: 'maria@email.com', rol: 'Editor', estado: 'Activo' },
  { id: 3, nombre: 'Pedro Martín', email: 'pedro@email.com', rol: 'Usuario', estado: 'Inactivo' },
  { id: 4, nombre: 'Ana Ruiz', email: 'ana@email.com', rol: 'Editor', estado: 'Activo' },
  { id: 5, nombre: 'Carlos Sánchez', email: 'carlos@email.com', rol: 'Admin', estado: 'Pendiente' },
  { id: 6, nombre: 'Laura Fernández', email: 'laura@email.com', rol: 'Usuario', estado: 'Activo' },
  { id: 7, nombre: 'Miguel Torres', email: 'miguel@email.com', rol: 'Editor', estado: 'Activo' },
  { id: 8, nombre: 'Sara Díaz', email: 'sara@email.com', rol: 'Usuario', estado: 'Inactivo' },
]

// Configuración de columnas por defecto (editable)
const defaultColumnConfig = [
  { key: 'id', label: 'ID', visible: true, sortable: true, align: 'center', width: '80px' },
  { key: 'nombre', label: 'Nombre', visible: true, sortable: true, align: 'left', width: '' },
  { key: 'email', label: 'Email', visible: true, sortable: true, align: 'left', width: '' },
  { key: 'rol', label: 'Rol', visible: true, sortable: true, align: 'left', width: '' },
  { key: 'estado', label: 'Estado', visible: true, sortable: true, align: 'left', width: '' },
]

// Filtros por defecto
const defaultFilters = [
  {
    key: 'rol',
    placeholder: 'Todos los roles',
    options: [
      { value: 'Admin', label: 'Admin' },
      { value: 'Editor', label: 'Editor' },
      { value: 'Usuario', label: 'Usuario' },
    ],
  },
  {
    key: 'estado',
    placeholder: 'Todos los estados',
    options: [
      { value: 'Activo', label: 'Activo' },
      { value: 'Inactivo', label: 'Inactivo' },
      { value: 'Pendiente', label: 'Pendiente' },
    ],
  },
];

// Acciones por fila por defecto
const defaultActions = [
  { label: 'Ver detalle', icon: 'visibility', onClick: createAction('Ver detalle'), variant: 'default' },
  { label: 'Editar', icon: 'edit', onClick: createAction('Editar'), variant: 'default' },
  { label: 'Eliminar', icon: 'delete', onClick: createAction('Eliminar'), variant: 'danger' },
]

// Acciones masivas por defecto
const defaultBulkActions = [
  { label: 'Exportar', icon: 'download', onClick: createBulkAction('Exportar'), variant: 'default' },
  { label: 'Archivar', icon: 'archive', onClick: createBulkAction('Archivar'), variant: 'default' },
  { label: 'Eliminar', icon: 'delete', onClick: createBulkAction('Eliminar'), variant: 'danger' },
]

// Función para construir columnas desde la configuración
const buildColumnsFromConfig = (columnConfig) => {
  return columnConfig
    .filter(col => col.visible)
    .map(col => ({
      key: col.key,
      label: col.label,
      sortable: col.sortable,
      align: col.align || 'left',
      width: col.width || '',
    }))
}

export default {
  title: 'UI/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `Componente DataTable genérico y reutilizable con soporte para:
- **Columnas configurables**: visibilidad, ordenación, alineación
- **Acciones por fila**: menú dropdown con acciones personalizables
- **Selección de filas**: checkboxes para selección múltiple
- **Acciones masivas**: barra de acciones para filas seleccionadas
- **Búsqueda y filtros**: toolbar con campo de búsqueda y filtros dropdown
- **Paginación**: navegación entre páginas`,
      },
    },
  },
  argTypes: {
    // ============ COLUMNAS ============
    columnConfig: {
      description: `**Configuración de columnas** - Array de objetos con:
- \`key\`: nombre del campo en los datos
- \`label\`: texto a mostrar en el header
- \`visible\`: true/false para mostrar/ocultar
- \`sortable\`: true/false para permitir ordenar
- \`align\`: 'left', 'center', 'right'
- \`width\`: ancho (ej: '100px', '20%')`,
      control: 'object',
      table: { category: '1. Columnas' },
    },
    data: {
      description: 'Array de objetos con los datos.',
      control: 'object',
      table: { category: '1. Columnas' },
    },

    // ============ ACCIONES POR FILA ============
    showActions: {
      description: 'Mostrar columna de acciones por fila',
      control: 'boolean',
      table: { category: '2. Acciones por fila' },
    },
    actionsConfig: {
      description: `**Configuración de acciones** - Array con:
- \`label\`: texto de la acción
- \`icon\`: nombre del icono (Material Symbols)
- \`variant\`: 'default' o 'danger'`,
      control: 'object',
      table: { category: '2. Acciones por fila' },
    },
    actionsTitle: {
      description: 'Título del menú de acciones',
      control: 'text',
      table: { category: '2. Acciones por fila' },
    },

    // ============ SELECCIÓN Y ACCIONES MASIVAS ============
    selectable: {
      description: 'Habilitar checkboxes de selección',
      control: 'boolean',
      table: { category: '3. Selección' },
    },
    showBulkActionsBar: {
      description: 'Mostrar barra de acciones masivas al seleccionar',
      control: 'boolean',
      table: { category: '3. Selección' },
    },
    bulkActionsConfig: {
      description: `**Acciones masivas** - Array con:
- \`label\`: texto de la acción
- \`icon\`: nombre del icono
- \`variant\`: 'default' o 'danger'`,
      control: 'object',
      table: { category: '3. Selección' },
    },

    // ============ BÚSQUEDA ============
    searchable: {
      description: 'Habilitar campo de búsqueda',
      control: 'boolean',
      table: { category: '4. Búsqueda' },
    },
    searchPlaceholder: {
      description: 'Placeholder del campo de búsqueda',
      control: 'text',
      table: { category: '4. Búsqueda' },
    },
    searchKeys: {
      description: 'Keys de los campos donde buscar',
      control: 'object',
      table: { category: '4. Búsqueda' },
    },

    // ============ FILTROS ============
    filters: {
      description: 'Configuración de filtros dropdown',
      control: 'object',
      table: { category: '5. Filtros' },
    },

    // ============ PAGINACIÓN ============
    pagination: {
      description: 'Habilitar paginación',
      control: 'boolean',
      table: { category: '6. Paginación' },
    },
    paginationPerPage: {
      description: 'Filas por página',
      control: { type: 'number', min: 1, max: 50 },
      table: { category: '6. Paginación' },
    },
    paginationRowsPerPageOptions: {
      description: 'Opciones de filas por página',
      control: 'object',
      table: { category: '6. Paginación' },
    },

    // ============ ESTADOS ============
    isLoading: {
      description: 'Mostrar estado de carga',
      control: 'boolean',
      table: { category: '7. Estados' },
    },
    emptyMessage: {
      description: 'Mensaje cuando no hay datos',
      control: 'text',
      table: { category: '7. Estados' },
    },

    // ============ ESTILOS ============
    variant: {
      description: 'Variante de estilos',
      control: 'select',
      options: ['default', 'green'],
      table: { category: '8. Estilos' },
    },
  },
};

// ==========================================
// STORY PRINCIPAL - TODOS LOS CONTROLES
// ==========================================
export const Default = {
  args: {
    // Columnas
    columnConfig: defaultColumnConfig,
    data: sampleData,
    // Acciones por fila
    showActions: true,
    actionsConfig: defaultActions,
    actionsTitle: 'Acciones',
    // Selección
    selectable: true,
    showBulkActionsBar: true,
    bulkActionsConfig: defaultBulkActions,
    // Búsqueda
    searchable: true,
    searchPlaceholder: 'Buscar por nombre o email...',
    searchKeys: ['nombre', 'email'],
    // Filtros
    filters: defaultFilters,
    // Paginación
    pagination: true,
    paginationPerPage: 5,
    paginationRowsPerPageOptions: [5, 10, 25, 50],
    // Estados
    isLoading: false,
    emptyMessage: 'No hay datos disponibles',
    // Estilos
    variant: 'green',
  },
  render: ({ columnConfig, showActions, actionsConfig, bulkActionsConfig, ...args }) => {
    const columns = buildColumnsFromConfig(columnConfig || [])
    const actions = showActions ? actionsConfig.map(a => ({
      ...a,
      onClick: createAction(a.label)
    })) : []
    const bulkActions = bulkActionsConfig.map(a => ({
      ...a,
      onClick: createBulkAction(a.label)
    }))

    return (
      <DataTable
        columns={columns}
        actions={actions}
        bulkActions={bulkActions}
        {...args}
      />
    )
  },
};

// ==========================================
// CON ACCIONES POR FILA
// ==========================================
export const ConAcciones = {
  args: {
    ...Default.args,
    selectable: false,
    showBulkActionsBar: false,
    bulkActionsConfig: [],
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla con menú de acciones en cada fila (sin selección).',
      },
    },
  },
};

// ==========================================
// CON SELECCIÓN DE FILAS
// ==========================================
export const ConSeleccion = {
  args: {
    ...Default.args,
    showActions: false,
    actionsConfig: [],
    bulkActionsConfig: [],
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla con checkboxes para seleccionar filas (sin acciones).',
      },
    },
  },
}

// ==========================================
// CON ACCIONES MASIVAS
// ==========================================
export const ConAccionesMasivas = {
  args: {
    ...Default.args,
    showActions: false,
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla con selección + barra de acciones masivas. Selecciona filas para ver la barra.',
      },
    },
  },
}

// ==========================================
// COMPLETO: ACCIONES + SELECCIÓN + BULK
// ==========================================
export const Completo = {
  args: {
    ...Default.args,
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla completa: acciones por fila + selección + acciones masivas.',
      },
    },
  },
}

// ==========================================
// ACCIONES PERSONALIZADAS
// ==========================================
export const AccionesPersonalizadas = {
  args: {
    ...Default.args,
    actionsConfig: [
      { label: 'Ver perfil', icon: 'person', variant: 'default' },
      { label: 'Enviar email', icon: 'mail', variant: 'default' },
      { label: 'Cambiar rol', icon: 'swap_horiz', variant: 'default' },
      { label: 'Suspender', icon: 'block', variant: 'danger' },
      { label: 'Eliminar cuenta', icon: 'delete_forever', variant: 'danger' },
    ],
    actionsTitle: 'Opciones de usuario',
    bulkActionsConfig: [
      { label: 'Email masivo', icon: 'send', variant: 'default' },
      { label: 'Cambiar rol', icon: 'swap_horiz', variant: 'default' },
      { label: 'Suspender todos', icon: 'block', variant: 'danger' },
    ],
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Personalización de acciones: iconos diferentes, múltiples acciones danger, título personalizado.',
      },
    },
  },
}

// ==========================================
// SIN ACCIONES NI SELECCIÓN
// ==========================================
export const TablaBasica = {
  args: {
    columnConfig: defaultColumnConfig,
    data: sampleData,
    showActions: false,
    actionsConfig: [],
    selectable: false,
    showBulkActionsBar: false,
    bulkActionsConfig: [],
    searchable: true,
    searchPlaceholder: 'Buscar...',
    searchKeys: ['nombre', 'email'],
    filters: defaultFilters,
    pagination: true,
    paginationPerPage: 5,
    variant: 'green',
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla básica sin acciones ni selección. Solo datos, búsqueda y filtros.',
      },
    },
  },
}

// ==========================================
// TABLA MÍNIMA
// ==========================================
export const TablaMinima = {
  args: {
    columnConfig: [
      { key: 'nombre', label: 'Nombre', visible: true, sortable: false },
      { key: 'email', label: 'Email', visible: true, sortable: false },
    ],
    data: sampleData,
    showActions: false,
    actionsConfig: [],
    selectable: false,
    bulkActionsConfig: [],
    searchable: false,
    filters: [],
    pagination: false,
    variant: 'green',
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla mínima: solo columnas y datos.',
      },
    },
  },
}

// ==========================================
// DATOS DE JUGADORES
// ==========================================
export const TablaJugadores = {
  args: {
    columnConfig: [
      { key: 'dorsal', label: '#', visible: true, sortable: true, align: 'center', width: '60px' },
      { key: 'nombre', label: 'Nombre', visible: true, sortable: true },
      { key: 'posicion', label: 'Posición', visible: true, sortable: true },
      { key: 'edad', label: 'Edad', visible: true, sortable: true, align: 'center' },
      { key: 'estado', label: 'Estado', visible: true, sortable: true },
    ],
    data: [
      { id: 1, dorsal: 1, nombre: 'Marc Ter Stegen', posicion: 'Portero', edad: 31, estado: 'Activo' },
      { id: 2, dorsal: 3, nombre: 'Gerard Piqué', posicion: 'Defensa', edad: 36, estado: 'Retirado' },
      { id: 3, dorsal: 8, nombre: 'Pedri', posicion: 'Centrocampista', edad: 20, estado: 'Activo' },
      { id: 4, dorsal: 10, nombre: 'Lionel Messi', posicion: 'Delantero', edad: 36, estado: 'Activo' },
      { id: 5, dorsal: 17, nombre: 'Raphinha', posicion: 'Delantero', edad: 27, estado: 'Lesionado' },
      { id: 6, dorsal: 21, nombre: 'Frenkie de Jong', posicion: 'Centrocampista', edad: 26, estado: 'Activo' },
    ],
    showActions: true,
    actionsConfig: [
      { label: 'Ver ficha', icon: 'badge', variant: 'default' },
      { label: 'Estadísticas', icon: 'bar_chart', variant: 'default' },
      { label: 'Editar', icon: 'edit', variant: 'default' },
      { label: 'Dar de baja', icon: 'person_off', variant: 'danger' },
    ],
    actionsTitle: 'Acciones',
    selectable: true,
    showBulkActionsBar: true,
    bulkActionsConfig: [
      { label: 'Convocar', icon: 'groups', variant: 'default' },
      { label: 'Exportar', icon: 'download', variant: 'default' },
      { label: 'Dar de baja', icon: 'person_off', variant: 'danger' },
    ],
    searchable: true,
    searchPlaceholder: 'Buscar jugador...',
    searchKeys: ['nombre', 'posicion'],
    filters: [
      {
        key: 'posicion',
        placeholder: 'Posición',
        options: [
          { value: 'Portero', label: 'Portero' },
          { value: 'Defensa', label: 'Defensa' },
          { value: 'Centrocampista', label: 'Centrocampista' },
          { value: 'Delantero', label: 'Delantero' },
        ],
      },
      {
        key: 'estado',
        placeholder: 'Estado',
        options: [
          { value: 'Activo', label: 'Activo' },
          { value: 'Lesionado', label: 'Lesionado' },
          { value: 'Retirado', label: 'Retirado' },
        ],
      },
    ],
    pagination: true,
    paginationPerPage: 5,
    variant: 'green',
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo realista: tabla de jugadores con acciones específicas de fútbol.',
      },
    },
  },
}

// ==========================================
// ESTADOS: CARGANDO
// ==========================================
export const Cargando = {
  args: {
    ...Default.args,
    isLoading: true,
    data: [],
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla en estado de carga.',
      },
    },
  },
}

// ==========================================
// ESTADOS: SIN DATOS
// ==========================================
export const SinDatos = {
  args: {
    ...Default.args,
    data: [],
    emptyMessage: 'No se encontraron resultados',
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla sin datos.',
      },
    },
  },
}

// ==========================================
// VARIANTE DEFAULT (sin verde)
// ==========================================
export const VarianteDefault = {
  args: {
    ...Default.args,
    variant: 'default',
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Tabla con estilos por defecto (DaisyUI).',
      },
    },
  },
}

// ==========================================
// CON BADGES EN COLUMNAS
// ==========================================

// Mapeo de estados a variantes de badge
const estadoToBadge = {
  Activo: { variant: 'success', icon: 'check_circle' },
  Inactivo: { variant: 'neutral', icon: 'cancel' },
  Pendiente: { variant: 'warning', icon: 'schedule' },
  Lesionado: { variant: 'error', icon: 'healing' },
  Retirado: { variant: 'neutral', icon: 'logout' },
}

// Mapeo de roles a variantes de badge
const rolToBadge = {
  Admin: { variant: 'primary', icon: 'admin_panel_settings' },
  Editor: { variant: 'info', icon: 'edit' },
  Usuario: { variant: 'default', icon: 'person' },
}

// Mapeo de posiciones a variantes de badge
const posicionToBadge = {
  Portero: { variant: 'custom', customColor: { bg: '#fef3c7', text: '#92400e' }, icon: 'sports_handball' },
  Defensa: { variant: 'custom', customColor: { bg: '#dbeafe', text: '#1e40af' }, icon: 'shield' },
  Centrocampista: { variant: 'custom', customColor: { bg: '#dcfce7', text: '#166534' }, icon: 'sync_alt' },
  Delantero: { variant: 'custom', customColor: { bg: '#fee2e2', text: '#991b1b' }, icon: 'sports_soccer' },
}

// Configuración por defecto de badges
const defaultBadgeConfig = {
  size: 'sm',
  pill: true,
  outline: false,
  showIcon: true,
  minWidth: '90px',
}

export const ConBadges = {
  args: {
    data: sampleData,
    showActions: true,
    actionsConfig: defaultActions,
    actionsTitle: 'Acciones',
    selectable: false,
    searchable: true,
    searchPlaceholder: 'Buscar...',
    searchKeys: ['nombre', 'email'],
    filters: defaultFilters,
    pagination: true,
    paginationPerPage: 5,
    variant: 'green',
    // Configuración de badges
    badgeSize: 'sm',
    badgePill: true,
    badgeOutline: false,
    badgeShowIcon: true,
    badgeMinWidth: '90px',
  },
  argTypes: {
    badgeSize: {
      description: 'Tamaño de todos los badges',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: '9. Badges' },
    },
    badgePill: {
      description: 'Bordes redondeados (pill)',
      control: 'boolean',
      table: { category: '9. Badges' },
    },
    badgeOutline: {
      description: 'Solo borde, sin fondo',
      control: 'boolean',
      table: { category: '9. Badges' },
    },
    badgeShowIcon: {
      description: 'Mostrar iconos en badges',
      control: 'boolean',
      table: { category: '9. Badges' },
    },
    badgeMinWidth: {
      description: 'Ancho mínimo de badges',
      control: 'text',
      table: { category: '9. Badges' },
    },
  },
  render: ({
    showActions,
    actionsConfig,
    bulkActionsConfig = [],
    badgeSize,
    badgePill,
    badgeOutline,
    badgeShowIcon,
    badgeMinWidth,
    ...args
  }) => {
    // Columnas con render personalizado para badges
    const columns = [
      { key: 'id', label: 'ID', sortable: true, align: 'center', width: '80px' },
      { key: 'nombre', label: 'Nombre', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      {
        key: 'rol',
        label: 'Rol',
        sortable: true,
        render: (value) => {
          const config = rolToBadge[value] || { variant: 'default' }
          return (
            <Badge
              variant={config.variant}
              icon={badgeShowIcon ? config.icon : undefined}
              size={badgeSize}
              pill={badgePill}
              outline={badgeOutline}
              minWidth={badgeMinWidth}
            >
              {value}
            </Badge>
          )
        }
      },
      {
        key: 'estado',
        label: 'Estado',
        sortable: true,
        render: (value) => {
          const config = estadoToBadge[value] || { variant: 'default' }
          return (
            <Badge
              variant={config.variant}
              icon={badgeShowIcon ? config.icon : undefined}
              size={badgeSize}
              pill={badgePill}
              outline={badgeOutline}
              minWidth={badgeMinWidth}
            >
              {value}
            </Badge>
          )
        }
      },
    ];

    const actions = showActions ? actionsConfig.map(a => ({
      ...a,
      onClick: createAction(a.label)
    })) : []

    const bulkActions = (bulkActionsConfig || []).map(a => ({
      ...a,
      onClick: createBulkAction(a.label)
    }))

    return (
      <DataTable
        columns={columns}
        actions={actions}
        bulkActions={bulkActions}
        {...args}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: `**Ejemplo con Badge en columnas**

Usa la propiedad \`render\` en la configuración de columnas para mostrar badges:

\`\`\`jsx
{
  key: 'estado',
  label: 'Estado',
  render: (value) => (
    <Badge variant="success" icon="check_circle" size="sm" pill>
      {value}
    </Badge>
  )
}
\`\`\``,
      },
    },
  },
}

// ==========================================
// TABLA DE JUGADORES CON BADGES
// ==========================================
export const JugadoresConBadges = {
  args: {
    data: [
      { id: 1, dorsal: 1, nombre: 'Marc Ter Stegen', posicion: 'Portero', edad: 31, estado: 'Activo' },
      { id: 2, dorsal: 3, nombre: 'Gerard Piqué', posicion: 'Defensa', edad: 36, estado: 'Retirado' },
      { id: 3, dorsal: 8, nombre: 'Pedri', posicion: 'Centrocampista', edad: 20, estado: 'Activo' },
      { id: 4, dorsal: 10, nombre: 'Lionel Messi', posicion: 'Delantero', edad: 36, estado: 'Activo' },
      { id: 5, dorsal: 17, nombre: 'Raphinha', posicion: 'Delantero', edad: 27, estado: 'Lesionado' },
      { id: 6, dorsal: 21, nombre: 'Frenkie de Jong', posicion: 'Centrocampista', edad: 26, estado: 'Activo' },
    ],
    showActions: true,
    actionsConfig: [
      { label: 'Ver ficha', icon: 'badge', variant: 'default' },
      { label: 'Estadísticas', icon: 'bar_chart', variant: 'default' },
      { label: 'Editar', icon: 'edit', variant: 'default' },
      { label: 'Dar de baja', icon: 'person_off', variant: 'danger' },
    ],
    selectable: true,
    showBulkActionsBar: true,
    bulkActionsConfig: [
      { label: 'Convocar', icon: 'groups', variant: 'default' },
      { label: 'Exportar', icon: 'download', variant: 'default' },
    ],
    searchable: true,
    searchPlaceholder: 'Buscar jugador...',
    searchKeys: ['nombre'],
    filters: [
      {
        key: 'posicion',
        placeholder: 'Todas las posiciones',
        options: [
          { value: 'Portero', label: 'Portero' },
          { value: 'Defensa', label: 'Defensa' },
          { value: 'Centrocampista', label: 'Centrocampista' },
          { value: 'Delantero', label: 'Delantero' },
        ],
      },
      {
        key: 'estado',
        placeholder: 'Todos los estados',
        options: [
          { value: 'Activo', label: 'Activo' },
          { value: 'Lesionado', label: 'Lesionado' },
          { value: 'Retirado', label: 'Retirado' },
        ],
      },
    ],
    pagination: true,
    paginationPerPage: 5,
    variant: 'green',
    // Configuración de badges
    badgeSize: 'sm',
    badgePill: false,
    badgeOutline: false,
    badgeShowIcon: true,
    badgePosicionMinWidth: '140px',
    badgeEstadoMinWidth: '100px',
  },
  argTypes: {
    badgeSize: {
      description: 'Tamaño de todos los badges',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { category: '9. Badges' },
    },
    badgePill: {
      description: 'Bordes redondeados (pill)',
      control: 'boolean',
      table: { category: '9. Badges' },
    },
    badgeOutline: {
      description: 'Solo borde, sin fondo',
      control: 'boolean',
      table: { category: '9. Badges' },
    },
    badgeShowIcon: {
      description: 'Mostrar iconos en badges',
      control: 'boolean',
      table: { category: '9. Badges' },
    },
    badgePosicionMinWidth: {
      description: 'Ancho mínimo badges de Posición',
      control: 'text',
      table: { category: '9. Badges' },
    },
    badgeEstadoMinWidth: {
      description: 'Ancho mínimo badges de Estado',
      control: 'text',
      table: { category: '9. Badges' },
    },
  },
  render: ({
    showActions,
    actionsConfig,
    bulkActionsConfig = [],
    badgeSize,
    badgePill,
    badgeOutline,
    badgeShowIcon,
    badgePosicionMinWidth,
    badgeEstadoMinWidth,
    ...args
  }) => {
    // Columnas con badges personalizados
    const columns = [
      { key: 'dorsal', label: '#', sortable: true, align: 'center', width: '60px' },
      { key: 'nombre', label: 'Nombre', sortable: true },
      {
        key: 'posicion',
        label: 'Posición',
        sortable: true,
        render: (value) => {
          const config = posicionToBadge[value] || { variant: 'default' }
          return (
            <Badge
              variant={config.variant}
              customColor={config.customColor}
              icon={badgeShowIcon ? config.icon : undefined}
              size={badgeSize}
              pill={badgePill}
              outline={badgeOutline}
              minWidth={badgePosicionMinWidth}
            >
              {value}
            </Badge>
          )
        }
      },
      { key: 'edad', label: 'Edad', sortable: true, align: 'center' },
      {
        key: 'estado',
        label: 'Estado',
        sortable: true,
        render: (value) => {
          const config = estadoToBadge[value] || { variant: 'default' }
          return (
            <Badge
              variant={config.variant}
              icon={badgeShowIcon ? config.icon : undefined}
              size={badgeSize}
              pill={badgePill}
              outline={badgeOutline}
              minWidth={badgeEstadoMinWidth}
            >
              {value}
            </Badge>
          )
        }
      },
    ];

    const actions = showActions ? actionsConfig.map(a => ({
      ...a,
      onClick: createAction(a.label)
    })) : []

    const bulkActions = (bulkActionsConfig || []).map(a => ({
      ...a,
      onClick: createBulkAction(a.label)
    }))

    return (
      <DataTable
        columns={columns}
        actions={actions}
        bulkActions={bulkActions}
        {...args}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabla de jugadores con badges en posición y estado. Usa `variant="custom"` con `customColor` para colores personalizados.',
      },
    },
  },
}
