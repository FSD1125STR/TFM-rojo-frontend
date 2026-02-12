import PropTypes from 'prop-types'

export const InfoItemProps = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  badge: PropTypes.node,
}
