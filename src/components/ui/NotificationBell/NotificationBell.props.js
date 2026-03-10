import PropTypes from 'prop-types';

export const NotificationBellProps = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.string,
      read: PropTypes.bool,
      createdAt: PropTypes.string,
      matchId: PropTypes.string,
      categoryName: PropTypes.string,
    })
  ),
  unreadCount: PropTypes.number,
  onNotificationClick: PropTypes.func,
  onMarkAllRead: PropTypes.func,
};

