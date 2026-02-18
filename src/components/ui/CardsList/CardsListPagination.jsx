import { Icon } from '../Icon/Icon';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    backgroundColor: 'var(--color-base-100)',
    borderTop: '1px solid var(--color-base-300)',
    color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)',
    fontSize: '14px',
    minHeight: '56px',
    paddingRight: '8px',
    paddingLeft: '8px',
    borderRadius: '0 0 12px 12px',
  },
  selectWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  select: {
    appearance: 'none',
    border: 'none',
    background: 'transparent',
    color: 'inherit',
    fontSize: '14px',
    paddingRight: '24px',
    cursor: 'pointer',
    outline: 'none',
  },
  pageButton: {
    borderRadius: '50%',
    height: '32px',
    width: '32px',
    padding: '4px',
    cursor: 'pointer',
    transition: '0.2s',
    background: 'none',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-base-content)',
  },
  pageButtonDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
};

function PaginationButton({ onClick, disabled, ariaLabel, icon }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...styles.pageButton,
        ...(disabled ? styles.pageButtonDisabled : {}),
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.backgroundColor = 'color-mix(in oklch, var(--color-primary) 15%, transparent)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
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
    <nav style={styles.wrapper}>
      {itemsPerPageOptions && onItemsPerPageChange && (
        <>
          <span>Filas por página:</span>
          <div style={styles.selectWrapper}>
            <select
              aria-label="Filas por página:"
              style={styles.select}
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

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PaginationButton onClick={() => onPageChange(1)} disabled={page <= 1} ariaLabel="Primera página" icon="first_page" />
        <PaginationButton onClick={() => onPageChange(page - 1)} disabled={page <= 1} ariaLabel="Página anterior" icon="chevron_left" />
        <PaginationButton onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} ariaLabel="Página siguiente" icon="chevron_right" />
        <PaginationButton onClick={() => onPageChange(totalPages)} disabled={page >= totalPages} ariaLabel="Última página" icon="last_page" />
      </div>
    </nav>
  );
}
