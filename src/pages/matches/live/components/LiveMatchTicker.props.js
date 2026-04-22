import PropTypes from 'prop-types';

export const LiveMatchTickerProps = {
  currentLiveStatus: PropTypes.oneOf(['NOT_STARTED', 'FIRST_HALF', 'HALF_TIME', 'SECOND_HALF', 'FINISHED']).isRequired,
  matchId: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  isLineupReady: PropTypes.bool,
  hasCallup: PropTypes.bool,
};
