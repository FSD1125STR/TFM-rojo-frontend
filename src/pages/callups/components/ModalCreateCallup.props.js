import PropTypes from 'prop-types';

export const ModalCreateCallupProps = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  match: PropTypes.shape({
    dateTime: PropTypes.string,
    isHome: PropTypes.bool,
  }),
};
