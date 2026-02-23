import PropTypes from 'prop-types';

export const ModalMatchProps = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  initialData: PropTypes.shape({
    _id: PropTypes.string,
    categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string })]),
    dateTime: PropTypes.string,
    journey: PropTypes.number,
    venue: PropTypes.shape({ name: PropTypes.string, lat: PropTypes.number, lng: PropTypes.number }),
    status: PropTypes.string,
  }),
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),
};
