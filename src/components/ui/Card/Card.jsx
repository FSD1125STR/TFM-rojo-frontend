import PropTypes from 'prop-types'

const variantClasses = {
  default: 'bg-base-100 shadow-xl',
  outlined: 'bg-base-100 border border-base-300',
  flat: 'bg-base-200',
}

export function Card({ children, variant = 'default', className = '' }) {
  const classes = [
    'card',
    variantClasses[variant],
    className,
  ].filter(Boolean).join(' ')

  return (
    <div test-id="el-i9j0k1l2" className={classes}>
      {children}
    </div>
  )
}

Card.Body = function CardBody({ children, className = '' }) {
  return <div test-id="el-m3n4o5p6" className={`card-body ${className}`}>{children}</div>
}

Card.Title = function CardTitle({ children, className = '' }) {
  return <h2 test-id="el-q7r8s9t0" className={`card-title ${className}`}>{children}</h2>
}

Card.Actions = function CardActions({ children, className = '' }) {
  return <div test-id="el-u1v2w3x4" className={`card-actions ${className}`}>{children}</div>
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'flat']),
  className: PropTypes.string,
}

Card.Body.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Card.Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Card.Actions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
