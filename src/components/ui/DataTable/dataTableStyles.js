export const tableStyles = {
  table: {
    style: {
      backgroundColor: 'var(--color-base-100)',
      borderRadius: 0,
    },
  },
  responsiveWrapper: {
    style: {
      borderRadius: 0,
    },
  },
  tableWrapper: {
    style: {
      borderRadius: 0,
    },
  },
  headRow: {
    style: {
      backgroundColor: 'transparent',
      borderBottomWidth: '1px',
      borderBottomColor: 'var(--color-base-300)',
      minHeight: '48px',
    },
  },
  headCells: {
    style: {
      color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)',
      fontSize: '14px',
      fontWeight: '600',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  rows: {
    style: {
      backgroundColor: 'var(--color-base-100)',
      borderBottomWidth: '1px',
      borderBottomColor: 'var(--color-base-300)',
      minHeight: '56px',
    },
  },
  cells: {
    style: {
      color: 'var(--color-base-content)',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  pagination: {
    style: {
      backgroundColor: 'var(--color-base-100)',
      borderTopWidth: '1px',
      borderTopColor: 'var(--color-base-300)',
      color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)',
      fontSize: '14px',
      minHeight: '56px',
    },
    pageButtonsStyle: {
      borderRadius: '50%',
      height: '32px',
      width: '32px',
      padding: '4px',
      cursor: 'pointer',
      transition: '0.2s',
      fill: 'var(--color-base-content)',
      '&:disabled': {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      '&:hover:not(:disabled)': {
        backgroundColor: 'color-mix(in oklch, var(--color-primary) 15%, transparent)',
      },
    },
  },
  noData: {
    style: {
      backgroundColor: 'var(--color-base-100)',
      color: 'color-mix(in oklch, var(--color-base-content) 60%, transparent)',
    },
  },
}

export const defaultPaginationOptions = {
  rowsPerPageText: 'Filas por página:',
  rangeSeparatorText: 'de',
  selectAllRowsItem: false,
}
