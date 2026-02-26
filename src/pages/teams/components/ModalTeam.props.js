import PropTypes from 'prop-types';

export const ModalTeamProps = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  initialData: PropTypes.object,
};
