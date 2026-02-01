import PropTypes from 'prop-types'

export function PageTitle({ children, className = '' }) {
  return (
    <h1 test-id="el-s5t6u7v8" className={`text-2xl font-bold ${className}`}>
      {children}
    </h1>
  )
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
