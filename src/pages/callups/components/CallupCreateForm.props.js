import PropTypes from 'prop-types';

const placeShape = PropTypes.shape({
  name: PropTypes.string,
  displayName: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  type: PropTypes.string,
  osmId: PropTypes.number,
});

export const CallupCreateFormProps = {
  formId: PropTypes.string,
  data: PropTypes.shape({
    callupDateTime: PropTypes.string,
    meetingPoint: placeShape,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
