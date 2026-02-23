import PropTypes from 'prop-types';

const optionShape = PropTypes.shape({ value: PropTypes.string, label: PropTypes.string });

export const MatchFormProps = {
  formId: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    categoryId: PropTypes.string,
    opponentId: PropTypes.string,
    isHome: PropTypes.bool,
    dateTime: PropTypes.string,
    journey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    venue: PropTypes.shape({ name: PropTypes.string, lat: PropTypes.number, lng: PropTypes.number }),
    status: PropTypes.string,
  }).isRequired,
  isEditing: PropTypes.bool,
  categoryOptions: PropTypes.arrayOf(optionShape),
  teamOptions: PropTypes.arrayOf(optionShape),
  journeyError: PropTypes.string,
  duplicateError: PropTypes.string,
  dateError: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
