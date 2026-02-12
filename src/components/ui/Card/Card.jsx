import { CardProps } from './Card.props'

export function Card({
  title,
  icon,
  children,
  variant = 'default',
  padding = 'md',
  className = '',
}) {
  const variantStyles = {
    default: {
      background: 'oklch(95% 0.03 155)',
      border: '1px solid oklch(90% 0.05 155)',
    },
    primary: {
      background: 'oklch(92% 0.08 155)',
      border: '1px solid oklch(85% 0.10 155)',
    },
    secondary: {
      background: 'oklch(95% 0.02 260)',
      border: '1px solid oklch(90% 0.03 260)',
    },
    white: {
      background: '#ffffff',
      border: '1px solid oklch(92% 0.02 260)',
    },
  }

  const paddingStyles = {
    sm: '12px',
    md: '20px',
    lg: '28px',
    none: '0',
  }

  const style = {
    ...variantStyles[variant],
    borderRadius: '12px',
    padding: paddingStyles[padding],
  }

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: title ? '16px' : '0',
  }

  const titleStyle = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'oklch(25% 0.02 260)',
    margin: 0,
  }

  const iconStyle = {
    fontSize: '20px',
    color: 'oklch(45% 0.10 155)',
  }

  return (
    <div test-id="el-c1a2r3d4" className={`card-generic ${className}`} style={style}>
      {title && (
        <div style={headerStyle}>
          {icon && (
            <span className="material-symbols-outlined" style={iconStyle}>
              {icon}
            </span>
          )}
          <h3 style={titleStyle}>{title}</h3>
        </div>
      )}
      <div className="card-generic-content">
        {children}
      </div>
    </div>
  )
}

Card.propTypes = CardProps

export default Card
