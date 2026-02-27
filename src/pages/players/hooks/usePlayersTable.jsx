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
    ? { name: '22%', dorsal: '9%', catPos: '15%', age: '8%', goals: '8%', cards: '10%', status: '15%' }
    : { name: '26%', dorsal: '10%', catPos: '16%', age: '9%', goals: '8%', cards: '10%', status: '12%' };

  const columns = [
    {
      key: 'firstName',
      label: 'Jugador',
      width: w.name,
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3 pointer-events-none">
          <Avatar name={`${row.firstName} ${row.lastName}`} size="sm" />
          <span className="font-medium whitespace-nowrap">{row.firstName} {row.lastName}</span>
        </div>
      ),
    },
    { key: 'dorsal', label: 'Dorsal', width: w.dorsal, align: 'center', sortable: true },
    ...(isAdmin
      ? [{ key: 'category', label: 'Categoría', width: w.catPos, align: 'center', sortable: true }]
      : [{
          key: 'position',
          label: 'Posición',
          width: w.catPos,
          align: 'center',
          sortable: true,
          render: (value) => (
            <div className='pointer-events-none'>
              <Badge
                variant="custom"
                size="sm"
                width="140px"
                icon={posicionConfig[value]?.icon}
                customColor={posicionConfig[value]?.color}
              >
                {value}
              </Badge>
            </div>
          ),
        }]
    ),
    { key: 'age', label: 'Edad', width: w.age, align: 'center', sortable: true },
    { key: 'goals', label: 'Goles', width: w.goals, align: 'center', sortable: true },
    {
      key: 'cards',
      label: 'Tarjetas',
      width: w.cards,
      align: 'center',
      render: (_, row) => {
        if (!row.yellowCards && !row.redCards)
          return <span className="pointer-events-none text-base-content/30">—</span>;
        return (
          <div className="flex items-center justify-center gap-1 pointer-events-none">
            {row.yellowCards > 0 && (
              <Badge variant="custom" shape="card" customColor={{ bg: '#F59E0B', text: '#fff' }}>{row.yellowCards}</Badge>
            )}
            {row.redCards > 0 && (
              <Badge variant="custom" shape="card" customColor={{ bg: '#EF4444', text: '#fff' }}>{row.redCards}</Badge>
            )}
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Estado',
      width: w.status,
      align: 'center',
      sortable: true,
      render: (value, row) => {
        const badge = (
          <Badge
            variant={estadoConfig[value]?.variant || 'neutral'}
            size="sm"
            width="140px"
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
    onMarcarRecuperado && { label: 'Marcar recuperado', icon: 'health_and_safety', onClick: onMarcarRecuperado, show: (row) => row.status === 'Lesionado' },
    onDarDeBaja && { label: 'Dar de baja', icon: 'person_off', onClick: onDarDeBaja, variant: 'danger' },
  ].filter(Boolean);

  const filters = [
    ...(isAdmin
      ? [{ key: 'category', placeholder: 'Todas las categorías', options: categoriaOptions }]
      : [{ key: 'position', placeholder: 'Todas las posiciones', options: posicionOptions, multiple: true }]
    ),
    { key: 'estado', placeholder: 'Todos los estados', options: estadoOptions },
  ];

  const searchConfig = {
    searchable: true,
    searchPlaceholder: 'Buscar por nombre o dorsal...',
    searchKeys: ['firstName', 'lastName', 'dorsal'],
  };

  return { columns, actions, filters, searchConfig };
}
