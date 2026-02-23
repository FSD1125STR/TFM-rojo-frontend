import { useState, useMemo } from 'react';
import ReactDataTable from 'react-data-table-component';
import { StyleSheetManager } from 'styled-components';

const RDT_CUSTOM_PROPS = new Set([
  'right', 'center', 'compact', 'striped', 'highlightOnHover',
  'pointerOnHover', 'persistTableHead', 'noTableHead', 'fixedHeader',
  'allowOverflow', 'button',
]);

function shouldForwardProp(prop) {
  return !RDT_CUSTOM_PROPS.has(prop);
}
import { NoDataComponentProps, BulkActionsBarProps, DataTableProps } from './DataTable.props';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { SearchInput } from '../SearchInput/SearchInput';
import { SelectFilter } from '../SelectFilter/SelectFilter';
import { DataTableActions } from '../DataTableActions/DataTableActions';
import { tableStyles, defaultPaginationOptions } from './dataTableStyles';
import { normalizeText } from '../../../utils/normalize';

function LoadingComponent() {
  return (
    <div className="py-10 flex justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}

function NoDataComponent({ message }) {
  return (
    <div className="py-10 text-center text-base-content/60">
      <Icon name="inbox" size="lg" className="mb-2 opacity-40" />
      <p>{message}</p>
    </div>
  );
}

NoDataComponent.propTypes = NoDataComponentProps;

function transformColumns(columns, actions, actionsTitle) {
  const transformed = columns.map(col => ({
    name: col.label,
    selector: row => row[col.key],
    sortable: col.sortable || false,
    width: col.width,
    center: col.align === 'center',
    right: col.align === 'right',
    ignoreRowClick: col.ignoreRowClick || false,
    cell: col.render
      ? row => col.render(row[col.key], row)
      : undefined,
  }));

  if (actions && actions.length > 0) {
    transformed.push({
      name: actionsTitle,
      width: '8%',
      center: true,
      cell: row => <DataTableActions actions={actions} row={row} title={actionsTitle} />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    });
  }

  return transformed;
}

function BulkActionsBar({ selectedCount, bulkActions, selectedRows, onClearSelection }) {
  if (selectedCount === 0) return null;

  const normalActions = bulkActions.filter(a => a.variant !== 'danger');
  const dangerActions = bulkActions.filter(a => a.variant === 'danger');

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
        {normalActions.map((action) => (
          <button
            key={action.label || action.key}
            className="btn btn-sm btn-ghost"
            onClick={() => action.onClick(selectedRows)}
          >
            {action.icon && <Icon name={action.icon} size="sm" />}
            {action.label}
          </button>
        ))}
        {dangerActions.map((action) => (
          <button
            key={action.label || action.key}
            className="btn btn-sm btn-error btn-outline"
            onClick={() => action.onClick(selectedRows)}
          >
            {action.icon && <Icon name={action.icon} size="sm" />}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

BulkActionsBar.propTypes = BulkActionsBarProps;

export function DataTable({
  columns,
  data,
  keyField = 'id',
  selectable = false,
  onSelectionChange,
  actions = [],
  actionsTitle = 'Acciones',
  bulkActions = [],
  showBulkActionsBar = true,
  isLoading = false,
  emptyMessage = 'Sin datos',
  pagination = false,
  paginationPerPage = 10,
  paginationRowsPerPageOptions = [5, 10, 20, 50],
  onRowClick,
  className = '',
  searchable = false,
  searchPlaceholder = 'Buscar...',
  searchKeys = [],
  filters = [],
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchable && filters.length === 0) return data;

    return data.filter(item => {
      const matchesSearch = !searchable || !searchTerm || searchKeys.some(key => {
        const value = item[key];
        return normalizeText(value).includes(normalizeText(searchTerm));
      });

      const matchesFilters = filters.every(filter => {
        const filterValue = filterValues[filter.key];
        if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) return true;
        if (Array.isArray(filterValue)) return filterValue.includes(item[filter.key]);
        return item[filter.key] === filterValue;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, searchKeys, searchable, filters, filterValues]);

  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectionChange = ({ selectedRows: selected }) => {
    setSelectedRows(selected);
    if (onSelectionChange) {
      const selectedIds = selected.map(row => row[keyField]);
      onSelectionChange(selectedIds, selected);
    }
  };

  const handleClearSelection = () => {
    setToggleCleared(!toggleCleared);
    setSelectedRows([]);
    if (onSelectionChange) {
      onSelectionChange([], []);
    }
  };

  const hasActiveFilters = searchTerm !== '' || filters.some(f => {
    const v = filterValues[f.key];
    return v && (!Array.isArray(v) || v.length > 0);
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterValues({});
  };

  const hasBulkActions = bulkActions.length > 0 && showBulkActionsBar;
  const hasToolbar = searchable || filters.length > 0;

  const containerClasses = [
    'datatable-root overflow-visible',
    hasToolbar ? '' : 'no-toolbar',
    pagination ? '' : 'no-pagination',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div test-id="el-dtg1a2b3c" className={containerClasses}>
      {hasToolbar && (
        <div className="datatable-toolbar flex items-center gap-3 px-4 py-3 border-b border-base-300 bg-primary/5 rounded-t-xl">
          {searchable && (
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={searchPlaceholder}
              className="flex-1"
            />
          )}
          {filters.map(filter => (
            <SelectFilter
              key={filter.key}
              value={filterValues[filter.key] || (filter.multiple ? [] : '')}
              onChange={(value) => handleFilterChange(filter.key, value)}
              options={filter.options}
              placeholder={filter.placeholder}
              multiple={filter.multiple}
            />
          ))}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              <Icon name="filter_list_off" size="sm" className="mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      )}

      {hasBulkActions && selectedRows.length > 0 && (
        <BulkActionsBar
          selectedCount={selectedRows.length}
          bulkActions={bulkActions}
          selectedRows={selectedRows}
          onClearSelection={handleClearSelection}
        />
      )}

      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <ReactDataTable
          columns={transformColumns(columns, actions, actionsTitle)}
          data={filteredData}
          keyField={keyField}
          customStyles={tableStyles}
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
          pointerOnHover={!!onRowClick}
          onRowClicked={onRowClick}
          responsive
        />
      </StyleSheetManager>
    </div>
  );
}

DataTable.propTypes = DataTableProps;

export default DataTable;
