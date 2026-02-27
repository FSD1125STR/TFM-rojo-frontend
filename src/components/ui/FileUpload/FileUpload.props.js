import PropTypes from 'prop-types';

export const FileUploadProps = {
  value: PropTypes.instanceOf(File),
  onChange: PropTypes.func,
  accept: PropTypes.string,
  currentImageUrl: PropTypes.string,
  disabled: PropTypes.bool,
  'aria-labelledby': PropTypes.string,
};
