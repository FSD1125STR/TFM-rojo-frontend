import PropTypes from 'prop-types'

export function HeaderActions({ children }) {
  return (
    <div test-id="el-w9x0y1z2" className="flex items-center gap-2">
      {children}
    </div>
  )
}

HeaderActions.propTypes = {
  children: PropTypes.node,
}
