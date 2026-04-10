import PropTypes from 'prop-types';

export const LineupEditorProps = {
  calledPlayers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      dorsal: PropTypes.number,
      position: PropTypes.string,
      lineupRole: PropTypes.oneOf(['starter', 'substitute', null]),
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  starterCount: PropTypes.number.isRequired,
  isValid: PropTypes.bool.isRequired,
  saving: PropTypes.bool,
  editable: PropTypes.bool,
};
