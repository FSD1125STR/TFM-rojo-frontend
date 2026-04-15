import PropTypes from 'prop-types';

export const MatchCalendarProps = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      dateTime: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['scheduled', 'finished', 'cancelled']).isRequired,
      liveStatus: PropTypes.string,
      homeScore: PropTypes.number,
      awayScore: PropTypes.number,
      journey: PropTypes.number,
      homeTeamId: PropTypes.shape({ name: PropTypes.string }),
      awayTeamId: PropTypes.shape({ name: PropTypes.string }),
      venue: PropTypes.shape({ name: PropTypes.string }),
    })
  ),
  defaultView: PropTypes.oneOf(['month', 'week', 'agenda']),
  onSelectMatch: PropTypes.func,
};
