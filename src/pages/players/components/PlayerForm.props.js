import PropTypes from 'prop-types';

export const PlayerFormProps = {
  formId: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  edad: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
