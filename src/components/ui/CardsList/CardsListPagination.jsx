import { Icon } from '../Icon';
import { CardsListPaginationProps } from './CardsListPagination.props';

function PaginationButton({ onClick, disabled, ariaLabel, icon }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      className={[
        'btn btn-ghost btn-sm btn-circle',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
      ].filter(Boolean).join(' ')}
    >
      <Icon name={icon} size="sm" />
    </button>
  );
}

export function CardsListPagination({
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}) {
  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, totalItems);

  return (
    <nav test-id="el-pg1n2t3n" className="flex items-center justify-end gap-2 bg-base-100 border-t border-base-300 text-sm text-base-content/60 min-h-14 px-2 rounded-b-xl">
      {itemsPerPageOptions && onItemsPerPageChange && (
        <>
          <span>Filas por página:</span>
          <div className="relative flex items-center">
            <select
              aria-label="Filas por página:"
              className="appearance-none bg-transparent border-none text-inherit text-sm pr-6 cursor-pointer outline-none"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
              {itemsPerPageOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <Icon name="arrow_drop_down" size="sm" className="absolute right-0 pointer-events-none" />
          </div>
        </>
      )}

      <span>{start}-{end} de {totalItems}</span>

      <div className="flex items-center">
        <PaginationButton onClick={() => onPageChange(1)} disabled={page <= 1} ariaLabel="Primera página" icon="first_page" />
        <PaginationButton onClick={() => onPageChange(page - 1)} disabled={page <= 1} ariaLabel="Página anterior" icon="chevron_left" />
        <PaginationButton onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} ariaLabel="Página siguiente" icon="chevron_right" />
        <PaginationButton onClick={() => onPageChange(totalPages)} disabled={page >= totalPages} ariaLabel="Última página" icon="last_page" />
      </div>
    </nav>
  );
}

CardsListPagination.propTypes = CardsListPaginationProps;
