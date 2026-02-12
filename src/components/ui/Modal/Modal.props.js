import PropTypes from 'prop-types'

export const ModalProps = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  actions: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
}
