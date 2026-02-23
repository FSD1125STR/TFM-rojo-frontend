import PropTypes from 'prop-types';

export const CardsListPaginationProps = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func,
};
