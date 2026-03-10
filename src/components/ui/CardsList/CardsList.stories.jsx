import { useState } from 'react';
import { fn } from 'storybook/test';
import { CardsList } from './CardsList';

export default {
  title: 'UI/CardsList',
  component: CardsList,
  parameters: { layout: 'padded' },
};

const sampleData = Array.from({ length: 15 }, (_, i) => {
  let status;
  if (i % 3 === 0) {
    status = 'finished';
  } else if (i % 3 === 1) {
    status = 'scheduled';
  } else {
    status = 'cancelled';
  }
  return {
    _id: String(i + 1),
    homeTeam: `Equipo Local ${i + 1}`,
    awayTeam: `Equipo Visitante ${i + 1}`,
    date: '2025-03-15',
    status,
    venue: `Campo ${i + 1}`,
  };
});

const statusConfig = {
  scheduled: { label: 'Programado', variant: 'info', icon: 'schedule' },
  finished: { label: 'Finalizado', variant: 'success', icon: 'check_circle' },
  cancelled: { label: 'Cancelado', variant: 'error', icon: 'cancel' },
};

const actions = [
  { label: 'Ver', icon: 'visibility', onClick: fn() },
  { label: 'Editar', icon: 'edit', onClick: fn() },
];

const emptyRenderContent = () => ({});

function renderContent(item) {
  const cfg = statusConfig[item.status];
  return {
    title: `${item.homeTeam} vs ${item.awayTeam}`,
    badges: [{ label: cfg.label, variant: cfg.variant, icon: cfg.icon }],
    meta: [
      { icon: 'calendar_today', text: item.date },
      { icon: 'location_on', text: item.venue },
    ],
    content: item.status === 'finished'
      ? <p className="text-sm text-base-content/50 m-0">Resultado: 2 - 1</p>
      : <p className="text-sm text-base-content/40 m-0">Partido no disputado</p>,
  };
}

function CardsListWithState(props) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState({});

  const filtered = sampleData.filter((item) => {
    if (searchValue && !item.homeTeam.toLowerCase().includes(searchValue.toLowerCase())) return false;
    if (filterValues.status && item.status !== filterValues.status) return false;
    return true;
  });

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <CardsList
      {...props}
      data={paginated}
      renderContent={renderContent}
      actions={actions}
      search={{
        enabled: true,
        value: searchValue,
        onChange: (v) => { setSearchValue(v); setPage(1); },
      }}
      filters={{
        items: [
          {
            key: 'status',
            placeholder: 'Estado',
            value: filterValues.status || '',
            options: [
              { label: 'Programado', value: 'scheduled' },
              { label: 'Finalizado', value: 'finished' },
              { label: 'Cancelado', value: 'cancelled' },
            ],
          },
        ],
        onChange: (key, value) => { setFilterValues((p) => ({ ...p, [key]: value })); setPage(1); },
        onClear: () => { setFilterValues({}); setPage(1); },
        hasActive: !!filterValues.status,
      }}
      pagination={{
        page,
        totalPages: Math.ceil(filtered.length / itemsPerPage),
        totalItems: filtered.length,
        onChange: setPage,
        itemsPerPage,
        itemsPerPageOptions: [6, 10, 20],
        onItemsPerPageChange: (v) => { setItemsPerPage(v); setPage(1); },
      }}
    />
  );
}

export const Default = {
  render: () => <CardsListWithState />,
};

export const Loading = {
  args: {
    data: [],
    renderContent: emptyRenderContent,
    isLoading: true,
  },
};

export const ErrorState = {
  args: {
    data: [],
    renderContent: emptyRenderContent,
    error: 'No se pudo cargar los datos',
    onRetry: fn(),
  },
};

export const Empty = {
  args: {
    data: [],
    renderContent: emptyRenderContent,
    emptyMessage: 'No hay partidos disponibles',
  },
};

export const EmptyWithFilters = {
  args: {
    data: [],
    renderContent: emptyRenderContent,
    emptyMessage: 'No se encontraron resultados',
    filters: {
      hasActive: true,
      onClear: fn(),
    },
  },
};
