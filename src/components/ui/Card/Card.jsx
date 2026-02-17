import { CardProps } from './Card.props'

const variantClasses = {
  default: 'bg-base-200 border border-base-300',
  primary: 'bg-primary/10 border border-primary/20',
  secondary: 'bg-secondary/10 border border-secondary/20',
  white: 'bg-white border border-base-300',
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

export function Card({
  title,
  icon,
  children,
  variant = 'default',
  padding = 'md',
  className = '',
}) {
  return (
    <div
      test-id="el-c1a2r3d4"
      className={`rounded-xl ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
    >
      {title && (
        <div className={`flex items-center gap-2 ${title ? 'mb-4' : ''}`}>
          {icon && (
            <span className="material-symbols-outlined text-xl text-primary">
              {icon}
            </span>
          )}
          <h3 className="text-base font-semibold text-base-content m-0">{title}</h3>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  )
}

Card.propTypes = CardProps

export default Card
