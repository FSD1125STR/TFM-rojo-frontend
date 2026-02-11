import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import ReactDataTable from 'react-data-table-component'
import { Icon } from '../Icon/Icon'
import { DataTableActions } from '../DataTableActions/DataTableActions'
import { defaultStyles, defaultPaginationOptions } from './dataTableStyles'

// Estilos por defecto para DaisyUI (compatibilidad hacia atrás)
const legacyStyles = {
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
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'oklch(var(--b2))',
      },
    },
  },
  cells: {
    style: {
      color: 'oklch(var(--bc))',
      paddingLeft: '1rem',
      paddingRight: '1rem',
      cursor: 'pointer',
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
}

// Componente de loading
function LoadingComponent() {
  return (
    <div className="py-10 flex justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )
}

// Componente cuando no hay datos
function NoDataComponent({ message }) {
  return (
    <div className="py-10 text-center text-base-content/60">
      <Icon name="inbox" size="lg" className="mb-2 opacity-40" />
      <p>{message}</p>
    </div>
  )
}

NoDataComponent.propTypes = {
  message: PropTypes.string,
}

// Transforma nuestras columnas al formato de react-data-table-component
function transformColumns(columns, actions, actionsTitle) {
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
  }))

  // Añadir columna de acciones si hay actions
  if (actions && actions.length > 0) {
    transformed.push({
      name: actionsTitle,
      width: '100px',
      center: true,
      cell: row => <DataTableActions actions={actions} row={row} title={actionsTitle} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    })
  }

  return transformed
}

// Componente de barra de acciones masivas
function BulkActionsBar({ selectedCount, bulkActions, selectedRows, onClearSelection }) {
  if (selectedCount === 0) return null

  const normalActions = bulkActions.filter(a => a.variant !== 'danger')
  const dangerActions = bulkActions.filter(a => a.variant === 'danger')

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 bg-primary/10 border-b border-primary/20">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-primary">
          <Icon name="check_box" size="sm" className="mr-1 align-middle" />
          {selectedCount} {selectedCount === 1 ? 'fila seleccionada' : 'filas seleccionadas'}
        </span>
        <button
          className="btn btn-ghost btn-xs text-base-content/60"
          onClick={onClearSelection}
        >
          Deseleccionar
        </button>
      </div>
      <div className="flex items-center gap-2">
        {normalActions.map((action, index) => (
          <button
            key={index}
            className="btn btn-sm btn-ghost"
            onClick={() => action.onClick(selectedRows)}
          >
            {action.icon && <Icon name={action.icon} size="sm" />}
            {action.label}
          </button>
        ))}
        {dangerActions.map((action, index) => (
          <button
            key={index}
            className="btn btn-sm btn-error btn-outline"
            onClick={() => action.onClick(selectedRows)}
          >
            {action.icon && <Icon name={action.icon} size="sm" />}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}

BulkActionsBar.propTypes = {
  selectedCount: PropTypes.number.isRequired,
  bulkActions: PropTypes.array.isRequired,
  selectedRows: PropTypes.array.isRequired,
  onClearSelection: PropTypes.func.isRequired,
}

export function DataTableGeneric({
  columns,
  data,
  keyField = 'id',
  // Selección
  selectable = false,
  onSelectionChange,
  // Acciones por fila
  actions = [],
  actionsTitle = 'Acciones',
  // Acciones masivas
  bulkActions = [],
  showBulkActionsBar = true,
  // Estados
  isLoading = false,
  emptyMessage = 'Sin datos',
  // Paginación
  pagination = false,
  paginationPerPage = 10,
  paginationRowsPerPageOptions = [5, 10, 20, 50],
  onRowClick,
  className = '',
  // Búsqueda y filtros
  searchable = false,
  searchPlaceholder = 'Buscar...',
  searchKeys = [],
  filters = [],
  // Variante de estilos
  variant = 'default', // 'default' | 'green'
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterValues, setFilterValues] = useState(
    filters.reduce((acc, filter) => ({ ...acc, [filter.key]: '' }), {})
  )
  const [selectedRows, setSelectedRows] = useState([])
  const [toggleCleared, setToggleCleared] = useState(false)

  // Choose styles based on variant
  const customStyles = variant === 'green' ? defaultStyles : legacyStyles

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }))
  }

  // Filtered data
  const filteredData = useMemo(() => {
    if (!searchable && filters.length === 0) return data

    return data.filter(item => {
      // Search filter
      const matchesSearch = !searchable || !searchTerm || searchKeys.some(key => {
        const value = item[key]
        return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })

      // Custom filters
      const matchesFilters = filters.every(filter => {
        const filterValue = filterValues[filter.key]
        if (!filterValue) return true
        return item[filter.key] === filterValue
      })

      return matchesSearch && matchesFilters
    })
  }, [data, searchTerm, searchKeys, searchable, filters, filterValues])

  // Handle selection change
  const handleSelectionChange = ({ selectedRows: selected }) => {
    setSelectedRows(selected)
    if (onSelectionChange) {
      const selectedIds = selected.map(row => row[keyField])
      onSelectionChange(selectedIds, selected)
    }
  }

  // Clear selection
  const handleClearSelection = () => {
    setToggleCleared(!toggleCleared)
    setSelectedRows([])
    if (onSelectionChange) {
      onSelectionChange([], [])
    }
  }

  const hasToolbar = searchable || filters.length > 0
  const hasBulkActions = bulkActions.length > 0 && showBulkActionsBar
  const containerClass = variant === 'green'
    ? 'rounded-xl shadow-sm overflow-visible'
    : `overflow-x-auto ${className}`
  const containerStyle = variant === 'green'
    ? { backgroundColor: 'oklch(98% 0.02 175)' }
    : {}

  return (
    <div test-id="el-dtg1a2b3c" className={containerClass} style={containerStyle}>
      {/* Barra de acciones masivas */}
      {hasBulkActions && selectedRows.length > 0 && (
        <BulkActionsBar
          selectedCount={selectedRows.length}
          bulkActions={bulkActions}
          selectedRows={selectedRows}
          onClearSelection={handleClearSelection}
        />
      )}

      {/* Toolbar: Search + Filters */}
      {hasToolbar && (
        <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200">
          {/* Search */}
          {searchable && (
            <div className="relative flex-1 max-w-lg">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                search
              </span>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-lg text-sm bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          )}

          {/* Filters */}
          {filters.length > 0 && (
            <div className="flex items-center gap-3">
              {filters.map(filter => (
                <select
                  key={filter.key}
                  value={filterValues[filter.key]}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="h-10 px-4 pr-8 rounded-lg text-sm bg-white border border-gray-300 cursor-pointer"
                >
                  <option value="">{filter.placeholder}</option>
                  {filter.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          )}
        </div>
      )}

      <ReactDataTable
        columns={transformColumns(columns, actions, actionsTitle)}
        data={filteredData}
        keyField={keyField}
        customStyles={customStyles}
        selectableRows={selectable}
        onSelectedRowsChange={handleSelectionChange}
        clearSelectedRows={toggleCleared}
        pagination={pagination}
        paginationPerPage={paginationPerPage}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationComponentOptions={defaultPaginationOptions}
        progressPending={isLoading}
        progressComponent={<LoadingComponent />}
        noDataComponent={<NoDataComponent message={emptyMessage} />}
        highlightOnHover
        pointerOnHover={!!onRowClick}
        onRowClicked={onRowClick}
        responsive
      />
    </div>
  )
}

DataTableGeneric.propTypes = {
  /** Configuración de columnas */
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
  /** Datos de la tabla */
  data: PropTypes.array.isRequired,
  /** Campo único para identificar filas */
  keyField: PropTypes.string,
  /** Habilitar selección de filas */
  selectable: PropTypes.bool,
  /** Callback cuando cambia la selección (ids, rows) */
  onSelectionChange: PropTypes.func,
  /** Acciones por fila (menú dropdown) */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
      show: PropTypes.func,
    })
  ),
  /** Título del menú de acciones */
  actionsTitle: PropTypes.string,
  /** Acciones masivas para filas seleccionadas */
  bulkActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
    })
  ),
  /** Mostrar barra de acciones masivas */
  showBulkActionsBar: PropTypes.bool,
  /** Estado de carga */
  isLoading: PropTypes.bool,
  /** Mensaje cuando no hay datos */
  emptyMessage: PropTypes.string,
  /** Habilitar paginación */
  pagination: PropTypes.bool,
  /** Filas por página */
  paginationPerPage: PropTypes.number,
  /** Opciones de filas por página */
  paginationRowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  /** Callback al hacer clic en una fila */
  onRowClick: PropTypes.func,
  /** Clase CSS adicional */
  className: PropTypes.string,
  /** Habilitar búsqueda */
  searchable: PropTypes.bool,
  /** Placeholder del input de búsqueda */
  searchPlaceholder: PropTypes.string,
  /** Keys del objeto a buscar */
  searchKeys: PropTypes.arrayOf(PropTypes.string),
  /** Configuración de filtros */
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  /** Variante de estilos: 'default' o 'green' */
  variant: PropTypes.oneOf(['default', 'green']),
}

export default DataTableGeneric
