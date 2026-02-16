import { Badge } from '../../../components/ui/Badge'
import { Avatar } from '../../../components/ui/Avatar/Avatar'
import {
  posicionOptions,
  estadoOptions,
  categoriaOptions,
  posicionConfig,
  estadoConfig,
} from '../data/mockData'

export function usePlayersTable({ onVerDetalle, onEditar, onDarDeBaja, isAdmin }) {
  // Admin: 4% check + 88% datos + 8% acciones = 100%
  // No admin: 92% datos + 8% acciones = 100%
  const w = isAdmin
    ? { nombre: '26%', dorsal: '9%', catPos: '14%', edad: '8%', partidos: '9%', goles: '8%', estado: '14%' }
    : { nombre: '28%', dorsal: '10%', catPos: '15%', edad: '9%', partidos: '10%', goles: '8%', estado: '12%' }

  const columns = [
    {
      key: 'nombre',
      label: 'Jugador',
      width: w.nombre,
      sortable: true,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', pointerEvents: 'none' }}>
          <Avatar name={`${row.nombre} ${row.apellidos}`} size="sm" />
          <span style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{row.nombre} {row.apellidos}</span>
        </div>
      ),
    },
    { key: 'dorsal', label: 'Dorsal', width: w.dorsal, align: 'center', sortable: true },
    ...(isAdmin
      ? [{ key: 'categoria', label: 'Categoría', width: w.catPos, align: 'center', sortable: true }]
      : [{
          key: 'posicion',
          label: 'Posición',
          width: w.catPos,
          align: 'center',
          sortable: true,
          render: (value) => (
            <div style={{ pointerEvents: 'none' }}>
              <Badge
                variant="custom"
                size="sm"
                icon={posicionConfig[value]?.icon}
                customColor={posicionConfig[value]?.color}
              >
                {value}
              </Badge>
            </div>
          ),
        }]
    ),
    { key: 'edad', label: 'Edad', width: w.edad, align: 'center', sortable: true },
    { key: 'partidos', label: 'Partidos', width: w.partidos, align: 'center', sortable: true },
    { key: 'goles', label: 'Goles', width: w.goles, align: 'center', sortable: true },
    {
      key: 'estado',
      label: 'Estado',
      width: w.estado,
      align: 'center',
      sortable: true,
      render: (value) => (
        <div style={{ pointerEvents: 'none' }}>
          <Badge
            variant={estadoConfig[value]?.variant || 'neutral'}
            size="sm"
            icon={estadoConfig[value]?.icon}
          >
            {value}
          </Badge>
        </div>
      ),
    },
  ]

  const actions = [
    { label: 'Ver detalle', icon: 'visibility', onClick: onVerDetalle },
    onEditar && { label: 'Editar', icon: 'edit', onClick: onEditar },
    onDarDeBaja && { label: 'Dar de baja', icon: 'person_off', onClick: onDarDeBaja, variant: 'danger' },
  ].filter(Boolean)

  const filters = [
    ...(isAdmin
      ? [{ key: 'categoria', placeholder: 'Todas las categorías', options: categoriaOptions }]
      : [{ key: 'posicion', placeholder: 'Todas las posiciones', options: posicionOptions, multiple: true }]
    ),
    { key: 'estado', placeholder: 'Todos los estados', options: estadoOptions },
  ]

  const searchConfig = {
    searchable: true,
    searchPlaceholder: 'Buscar por nombre o dorsal...',
    searchKeys: ['nombre', 'apellidos', 'dorsal'],
  }

  return { columns, actions, filters, searchConfig }
}
