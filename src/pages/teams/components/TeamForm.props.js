import PropTypes from 'prop-types';

export const TeamFormProps = {
  formId: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string,
    categoryIds: PropTypes.arrayOf(PropTypes.string),
    logo: PropTypes.instanceOf(File),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
