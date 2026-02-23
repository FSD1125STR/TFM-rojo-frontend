import PropTypes from 'prop-types';

export const MatchFormProps = {
  formId: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  isEditing: PropTypes.bool,
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),
  teamOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),
  journeyError: PropTypes.string,
  duplicateError: PropTypes.string,
  dateError: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
