import { Avatar } from '../../../components/ui/Avatar';

export function useTeamsTable({ onEditar, onEliminar }) {
  const columns = [
    {
      key: 'logoUrl',
      label: 'Logo',
      width: '70px',
      render: (_, row) => (
        <div className="pointer-events-none">
          <Avatar src={row.logoUrl || undefined} name={row.name} size="sm" />
        </div>
      ),
    },
    {
      key: 'name',
      label: 'Nombre',
      sortable: true,
    },
    {
      key: 'categoryIds',
      label: 'Categorías',
      render: (cats) => {
        if (!cats?.length) return <span className="pointer-events-none text-base-content/30">—</span>;

        const visible = cats.slice(0, 2);
        const rest = cats.slice(2);
        const tipText = rest.map((c) => c.name).join(', ');

        return (
          <div className="flex items-center gap-1 flex-wrap pointer-events-none">
            <span className="text-sm">
              {visible.map((c) => c.name).join(', ')}
            </span>
            {rest.length > 0 && (
              <div
                className="tooltip tooltip-right pointer-events-auto cursor-help"
                data-tip={tipText}
              >
                <span
                  className="inline-flex items-center justify-center text-[10px] font-semibold bg-base-300 text-base-content/60 rounded-full w-5 h-5"
                  aria-label={`${rest.length} categorías más: ${tipText}`}
                >
                  +{rest.length}
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'createdAt',
      label: 'Creado',
      sortable: true,
      render: (value) => (
        <span className="pointer-events-none text-sm text-base-content/60">
          {value ? new Date(value).toLocaleDateString('es-ES') : '—'}
        </span>
      ),
    },
  ];

  const actions = [
    onEditar && { label: 'Editar', icon: 'edit', onClick: onEditar },
    onEliminar && { label: 'Eliminar', icon: 'delete', onClick: onEliminar, variant: 'danger' },
  ].filter(Boolean);

  const searchConfig = {
    searchable: true,
    searchPlaceholder: 'Buscar por nombre...',
    searchKeys: ['name'],
  };

  return { columns, actions, searchConfig };
}
