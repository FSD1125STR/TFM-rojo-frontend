import { Badge } from '../../../components/ui/Badge';
import { Avatar } from '../../../components/ui/Avatar';
import {
  posicionOptions,
  estadoOptions,
  categoriaOptions,
  posicionConfig,
  estadoConfig,
} from '../data/mockData';

export function usePlayersTable({ onVerDetalle, onEditar, onDarDeBaja, onMarcarRecuperado, isAdmin }) {
  const w = isAdmin
    ? { nombre: '26%', dorsal: '9%', catPos: '14%', edad: '8%', partidos: '9%', goles: '8%', estado: '14%' }
    : { nombre: '28%', dorsal: '10%', catPos: '15%', edad: '9%', partidos: '10%', goles: '8%', estado: '12%' };

  const columns = [
    {
      key: 'nombre',
      label: 'Jugador',
      width: w.nombre,
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3 pointer-events-none">
          <Avatar name={`${row.nombre} ${row.apellidos}`} size="sm" />
          <span className="font-medium whitespace-nowrap">{row.nombre} {row.apellidos}</span>
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
            <div className='pointer-events-none'>
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
      render: (value, row) => {
        const badge = (
          <Badge
            variant={estadoConfig[value]?.variant || 'neutral'}
            size="sm"
            icon={estadoConfig[value]?.icon}
          >
            {value}
          </Badge>
        );

        if (row.sanction) {
          return (
            <div
              className="tooltip tooltip-left"
              data-tip={`${row.sanction.remainingMatches} de ${row.sanction.totalMatches} partidos restantes`}
            >
              <div className="pointer-events-none">{badge}</div>
            </div>
          );
        }

        return <div className="pointer-events-none">{badge}</div>;
      },
    },
  ];

  const actions = [
    { label: 'Ver detalle', icon: 'visibility', onClick: onVerDetalle },
    onEditar && { label: 'Editar', icon: 'edit', onClick: onEditar },
    onMarcarRecuperado && { label: 'Marcar recuperado', icon: 'health_and_safety', onClick: onMarcarRecuperado, show: (row) => row.estado === 'Lesionado' },
    onDarDeBaja && { label: 'Dar de baja', icon: 'person_off', onClick: onDarDeBaja, variant: 'danger' },
  ].filter(Boolean);

  const filters = [
    ...(isAdmin
      ? [{ key: 'categoria', placeholder: 'Todas las categorías', options: categoriaOptions }]
      : [{ key: 'posicion', placeholder: 'Todas las posiciones', options: posicionOptions, multiple: true }]
    ),
    { key: 'estado', placeholder: 'Todos los estados', options: estadoOptions },
  ];

  const searchConfig = {
    searchable: true,
    searchPlaceholder: 'Buscar por nombre o dorsal...',
    searchKeys: ['nombre', 'apellidos', 'dorsal'],
  };

  return { columns, actions, filters, searchConfig };
}
