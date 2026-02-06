import { useState } from 'react';
import { DataTable } from './DataTable';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';

// Datos de prueba - Jugadores
const mockPlayers = [
  { id: 1, name: 'Marc Torres', position: 'Portero', number: 1, status: 'Disponible' },
  { id: 2, name: 'Àlex García', position: 'Defensa', number: 4, status: 'Disponible' },
  { id: 3, name: 'Pol Martínez', position: 'Defensa', number: 5, status: 'Lesionado' },
  { id: 4, name: 'Jan Puig', position: 'Centrocampista', number: 8, status: 'Disponible' },
  { id: 5, name: 'Oriol Vila', position: 'Centrocampista', number: 10, status: 'Sancionado' },
  { id: 6, name: 'Biel Roca', position: 'Delantero', number: 9, status: 'Disponible' },
  { id: 7, name: 'Nil Ferrer', position: 'Delantero', number: 11, status: 'Disponible' },
  { id: 8, name: 'Arnau Soler', position: 'Defensa', number: 2, status: 'Disponible' },
  { id: 9, name: 'Pau López', position: 'Centrocampista', number: 6, status: 'Lesionado' },
  { id: 10, name: 'Eric Sánchez', position: 'Delantero', number: 7, status: 'Disponible' },
  { id: 11, name: 'Marc Ruiz', position: 'Defensa', number: 3, status: 'Disponible' },
  { id: 12, name: 'David Moreno', position: 'Portero', number: 13, status: 'Disponible' },
];

// Columnas básicas
const basicColumns = [
  { key: 'number', label: 'Dorsal', width: '10%', align: 'center' },
  { key: 'name', label: 'Nombre', width: '40%', sortable: true },
  { key: 'position', label: 'Posición', width: '40%', sortable: true },
];

// Columnas con render personalizado
const columnsWithRender = [
  { key: 'number', label: 'Dorsal', width: '10%', align: 'center', sortable: true },
  { key: 'name', label: 'Nombre', width: '35%', sortable: true },
  { key: 'position', label: 'Posición', width: '35%', sortable: true },
  {
    key: 'status',
    label: 'Estado',
    width: '20%',
    sortable: true,
    render: (value) => {
      const badgeClass = {
        'Disponible': 'bg-success/20 !text-green-800',
        'Lesionado': 'bg-warning/20 !text-amber-800',
        'Sancionado': 'bg-purple-500/20 !text-purple-800',
      }[value] || 'bg-base-200 text-base-content/60';

      return <span className={`badge badge-sm border-0 ${badgeClass}`}>{value}</span>;
    },
  },
];

// Acciones
const defaultActions = [
  { label: 'Ver perfil', icon: 'person', onClick: (row) => alert(`Ver perfil: ${row.name}`) },
  { label: 'Editar', icon: 'edit', onClick: (row) => alert(`Editar: ${row.name}`) },
  { label: 'Eliminar', icon: 'delete', onClick: (row) => alert(`Eliminar: ${row.name}`), variant: 'danger' },
];

export default {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
};

// 1. Default - Tabla básica
export const Default = {
  render: () => (
    <div className="card bg-base-100 shadow">
      <DataTable
        columns={basicColumns}
        data={mockPlayers}
      />
    </div>
  ),
};

// 2. WithSelection - Con checkboxes
export const WithSelection = {
  render: () => {
    const [selected, setSelected] = useState([]);

    return (
      <div className="space-y-4">
        <div className="card bg-base-100 shadow">
          <DataTable
            columns={basicColumns}
            data={mockPlayers}
            selectable
            onSelectionChange={setSelected}
          />
        </div>
        <p className="text-sm text-base-content/60">
          Seleccionados: {selected.length > 0 ? selected.join(', ') : 'Ninguno'}
        </p>
      </div>
    );
  },
};

// 3. WithSorting - Con ordenación
export const WithSorting = {
  render: () => (
    <div className="card bg-base-100 shadow">
      <DataTable
        columns={columnsWithRender}
        data={mockPlayers}
      />
    </div>
  ),
};

// 4. WithActions - Con menú de acciones
export const WithActions = {
  render: () => (
    <div className="card bg-base-100 shadow">
      <DataTable
        columns={basicColumns}
        data={mockPlayers}
        actions={defaultActions}
      />
    </div>
  ),
};

// 5. WithPagination - Con paginación
export const WithPagination = {
  render: () => (
    <div className="card bg-base-100 shadow">
      <DataTable
        columns={columnsWithRender}
        data={mockPlayers}
        pagination
        paginationPerPage={5}
      />
    </div>
  ),
};

// 6. FullFeatured - Todas las funcionalidades
export const FullFeatured = {
  render: () => {
    const [selected, setSelected] = useState([]);

    return (
      <div className="card bg-base-100 shadow">
        <div className="p-4 border-b border-base-300 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Jugadores</h2>
            {selected.length > 0 && (
              <p className="text-sm text-base-content/60">
                {selected.length} seleccionados
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="primary" size="sm">
              <Icon name="add" size="sm" />
              Añadir jugador
            </Button>
          </div>
        </div>
        <DataTable
          columns={columnsWithRender}
          data={mockPlayers}
          selectable
          onSelectionChange={setSelected}
          actions={defaultActions}
          pagination
          paginationPerPage={5}
        />
      </div>
    );
  },
};

// 7. Loading - Estado de carga
export const Loading = {
  render: () => (
    <div className="card bg-base-100 shadow">
      <DataTable
        columns={basicColumns}
        data={[]}
        isLoading
      />
    </div>
  ),
};

// 8. Empty - Sin datos
export const Empty = {
  render: () => (
    <div className="card bg-base-100 shadow">
      <DataTable
        columns={basicColumns}
        data={[]}
        emptyMessage="No hay jugadores registrados"
      />
    </div>
  ),
};

// 9. CustomRender - Con render personalizado
export const CustomRender = {
  render: () => {
    const columnsCustom = [
      { key: 'number', label: 'Dorsal', width: '10%', align: 'center' },
      {
        key: 'name',
        label: 'Jugador',
        width: '60%',
        render: (value, row) => (
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <span className="text-xs">{row.number}</span>
              </div>
            </div>
            <div>
              <div className="font-medium">{value}</div>
              <div className="text-xs text-base-content/60">{row.position}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'status',
        label: 'Estado',
        width: '30%',
        render: (value) => {
          const config = {
            'Disponible': { class: 'bg-success/20 !text-green-800', icon: 'check_circle' },
            'Lesionado': { class: 'bg-warning/20 !text-amber-800', icon: 'healing' },
            'Sancionado': { class: 'bg-purple-500/20 !text-purple-800', icon: 'block' },
          }[value] || { class: 'bg-base-200', icon: 'help' };

          return (
            <span className={`badge badge-sm border-0 gap-1 ${config.class}`}>
              <Icon name={config.icon} size="sm" />
              {value}
            </span>
          );
        },
      },
    ];

    return (
      <div className="card bg-base-100 shadow">
        <DataTable
          columns={columnsCustom}
          data={mockPlayers}
          actions={defaultActions}
          onRowClick={(row) => alert(`Click en: ${row.name}`)}
        />
      </div>
    );
  },
};

// 10. ConditionalActions - Acciones condicionales
export const ConditionalActions = {
  render: () => {
    const conditionalActions = [
      { label: 'Ver perfil', icon: 'person', onClick: (row) => alert(`Ver: ${row.name}`) },
      { label: 'Editar', icon: 'edit', onClick: (row) => alert(`Editar: ${row.name}`) },
      {
        label: 'Dar de baja',
        icon: 'person_off',
        onClick: (row) => alert(`Baja: ${row.name}`),
        variant: 'danger',
        show: (row) => row.status === 'Disponible',
      },
      {
        label: 'Rehabilitar',
        icon: 'person_add',
        onClick: (row) => alert(`Rehabilitar: ${row.name}`),
        show: (row) => row.status !== 'Disponible',
      },
    ];

    return (
      <div className="card bg-base-100 shadow">
        <DataTable
          columns={columnsWithRender}
          data={mockPlayers}
          actions={conditionalActions}
        />
      </div>
    );
  },
};
