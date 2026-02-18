import PropTypes from 'prop-types';

export const CardsListProps = {
  data: PropTypes.array.isRequired,
  keyField: PropTypes.string,
  renderContent: PropTypes.func.isRequired,
  actions: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
  actionsMode: PropTypes.oneOf(['menu', 'buttons']),
  onCardClick: PropTypes.func,
  cardVariant: PropTypes.oneOf(['default', 'white']),
  cardPadding: PropTypes.oneOf(['sm', 'md', 'lg']),

  search: PropTypes.shape({
    enabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  }),

  filters: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
          })
        ).isRequired,
        multiple: PropTypes.bool,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        className: PropTypes.string,
      })
    ),
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    hasActive: PropTypes.bool,
  }),

  sort: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),

  statsContent: PropTypes.node,

  pagination: PropTypes.shape({
    page: PropTypes.number,
    totalPages: PropTypes.number,
    totalItems: PropTypes.number,
    onChange: PropTypes.func,
    itemsPerPage: PropTypes.number,
    itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    onItemsPerPageChange: PropTypes.func,
  }),

  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRetry: PropTypes.func,
  emptyMessage: PropTypes.string,
  emptyIcon: PropTypes.string,

  className: PropTypes.string,
  gap: PropTypes.oneOf(['sm', 'md', 'lg']),
};
