import PropTypes from 'prop-types';

export const UserFormProps = {
  formId: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    password: PropTypes.string,
    registrationCode: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};
