import PropTypes from 'prop-types';

export const NoCallupReasonModalProps = {
  isOpen: PropTypes.bool,
  playerName: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};
