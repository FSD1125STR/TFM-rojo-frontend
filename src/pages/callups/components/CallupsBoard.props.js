import PropTypes from 'prop-types';

const playerShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  photoUrl: PropTypes.string,
  position: PropTypes.string,
  dorsal: PropTypes.number,
  playerStatus: PropTypes.string,
  callupStatus: PropTypes.string,
  reasonCode: PropTypes.string,
  isBlocked: PropTypes.bool,
});

export const CallusBoardProps = {
  availablePlayers: PropTypes.arrayOf(playerShape),
  calledPlayers: PropTypes.arrayOf(playerShape),
  notCalledPlayers: PropTypes.arrayOf(playerShape),
  calledCount: PropTypes.number,
  maxPlayers: PropTypes.number,
  editable: PropTypes.bool,
  movePlayer: PropTypes.func,
};
