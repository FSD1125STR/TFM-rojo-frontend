import PropTypes from 'prop-types';

export const PlacesAutocompleteProps = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
    type: PropTypes.string,
    osmId: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};
