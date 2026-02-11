export const defaultStyles = {
  table: {
    style: {
      backgroundColor: 'oklch(98% 0.02 175)',
    },
  },
  headRow: {
    style: {
      backgroundColor: 'transparent',
      borderBottomWidth: '1px',
      borderBottomColor: '#e5e7eb',
      minHeight: '48px',
    },
  },
  headCells: {
    style: {
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '600',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  rows: {
    style: {
      backgroundColor: 'oklch(92% 0.12 155 / 0.15)',
      borderBottomWidth: '1px',
      borderBottomColor: '#f3f4f6',
      minHeight: '56px',
      '&:hover': {
        backgroundColor: 'oklch(92% 0.12 155 / 0.3)',
        cursor: 'pointer',
      },
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },
  pagination: {
    style: {
      backgroundColor: 'transparent',
      borderTopWidth: '1px',
      borderTopColor: '#e5e7eb',
      color: '#6b7280',
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
      fill: '#6b7280',
      '&:disabled': {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      '&:hover:not(:disabled)': {
        backgroundColor: 'oklch(92% 0.12 155 / 0.3)',
      },
    },
  },
};

export const defaultPaginationOptions = {
  rowsPerPageText: 'Filas por página:',
  rangeSeparatorText: 'de',
  selectAllRowsItem: false,
};
