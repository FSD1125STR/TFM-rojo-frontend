import PropTypes from 'prop-types';
import ReactDataTable from 'react-data-table-component';
import { Icon } from '../Icon/Icon';
import { DataTableActions } from './DataTableActions';

// Estilos personalizados para DaisyUI
const customStyles = {
  table: {
    style: {
      backgroundColor: 'transparent',
    },
  },
  headRow: {
    style: {
      backgroundColor: 'oklch(var(--b2))',
      borderBottomColor: 'oklch(var(--b3))',
      fontWeight: '600',
      fontSize: '0.875rem',
      minHeight: '3rem',
    },
  },
  headCells: {
    style: {
      color: 'oklch(var(--bc))',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  rows: {
    style: {
      backgroundColor: 'oklch(var(--b1))',
      borderBottomColor: 'oklch(var(--b3))',
      minHeight: '3.25rem',
    },
  },
  cells: {
    style: {
      color: 'oklch(var(--bc))',
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  pagination: {
    style: {
      backgroundColor: 'oklch(var(--b1))',
      borderTopColor: 'oklch(var(--b3))',
      color: 'oklch(var(--bc))',
    },
    pageButtonsStyle: {
      color: 'oklch(var(--bc))',
      fill: 'oklch(var(--bc))',
    },
  },
  noData: {
    style: {
      backgroundColor: 'oklch(var(--b1))',
      color: 'oklch(var(--bc) / 0.6)',
    },
  },
};

// Transforma nuestras columnas al formato de react-data-table-component
function transformColumns(columns, actions) {
  const transformed = columns.map(col => ({
    name: col.label,
    selector: row => row[col.key],
    sortable: col.sortable || false,
    width: col.width,
    center: col.align === 'center',
    right: col.align === 'right',
    cell: col.render
      ? row => col.render(row[col.key], row)
      : undefined,
  }));

  // Añadir columna de acciones si hay actions
  if (actions && actions.length > 0) {
    transformed.push({
      name: '',
      width: '10%',
      cell: row => <DataTableActions actions={actions} row={row} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    });
  }

  return transformed;
}

export function DataTable({
  columns,
  data,
  keyField = 'id',
  selectable = false,
  onSelectionChange,
  actions = [],
  isLoading = false,
  emptyMessage = 'Sin datos',
  pagination = false,
  paginationPerPage = 10,
  onRowClick,
  className = '',
}) {
  const handleSelectionChange = ({ selectedRows: selected }) => {
    if (onSelectionChange) {
      const selectedIds = selected.map(row => row[keyField]);
      onSelectionChange(selectedIds);
    }
  };

  const LoadingComponent = () => (
    <div className="py-10 flex justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  const NoDataComponent = () => (
    <div className="py-10 text-center text-base-content/60">
      <Icon name="inbox" size="lg" className="mb-2 opacity-40" />
      <p>{emptyMessage}</p>
    </div>
  );

  return (
    <div test-id="el-dt1a2b3c" className={`overflow-x-auto ${className}`}>
      <ReactDataTable
        columns={transformColumns(columns, actions)}
        data={data}
        keyField={keyField}
        customStyles={customStyles}
        selectableRows={selectable}
        onSelectedRowsChange={handleSelectionChange}
        pagination={pagination}
        paginationPerPage={paginationPerPage}
        paginationRowsPerPageOptions={[5, 10, 20, 50]}
        paginationComponentOptions={{
          rowsPerPageText: 'Filas por página:',
          rangeSeparatorText: 'de',
        }}
        progressPending={isLoading}
        progressComponent={<LoadingComponent />}
        noDataComponent={<NoDataComponent />}
        highlightOnHover
        pointerOnHover={!!onRowClick}
        onRowClicked={onRowClick}
        responsive
      />
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      render: PropTypes.func,
      width: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string,
  selectable: PropTypes.bool,
  onSelectionChange: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
      show: PropTypes.func,
    })
  ),
  isLoading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  pagination: PropTypes.bool,
  paginationPerPage: PropTypes.number,
  onRowClick: PropTypes.func,
  className: PropTypes.string,
};
