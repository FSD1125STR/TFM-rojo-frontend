import { BadgeProps } from './Badge.props'

const variantColors = {
  default: { bg: 'oklch(92% 0.02 260)', text: 'oklch(40% 0.02 260)' },
  primary: { bg: 'oklch(88% 0.10 250)', text: 'oklch(45% 0.15 250)' },
  secondary: { bg: 'oklch(88% 0.12 300)', text: 'oklch(45% 0.15 300)' },
  success: { bg: 'oklch(85% 0.15 145)', text: 'oklch(35% 0.12 145)' },
  warning: { bg: 'oklch(90% 0.12 85)', text: 'oklch(45% 0.15 85)' },
  error: { bg: 'oklch(85% 0.15 25)', text: 'oklch(45% 0.18 25)' },
  info: { bg: 'oklch(88% 0.10 230)', text: 'oklch(45% 0.15 230)' },
  neutral: { bg: 'oklch(90% 0.02 260)', text: 'oklch(40% 0.02 260)' },
  custom: null,
}

const sizeConfig = {
  xs: { padding: '2px 6px', fontSize: '11px', iconSize: '12px', minWidth: '36px' },
  sm: { padding: '4px 10px', fontSize: '12px', iconSize: '14px', minWidth: '90px' },
  md: { padding: '6px 14px', fontSize: '14px', iconSize: '18px', minWidth: '100px' },
  lg: { padding: '8px 18px', fontSize: '16px', iconSize: '22px', minWidth: '120px' },
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  pill = false,
  outline = false,
  customColor = { bg: '#e0e0e0', text: '#333333' },
  minWidth,
  className = '',
}) {
  const colors = variant === 'custom'
    ? customColor
    : (variantColors[variant] || variantColors.default)
  const sizes = sizeConfig[size] || sizeConfig.md

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontWeight: 500,
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    minWidth: minWidth || sizes.minWidth,
    borderRadius: pill ? '9999px' : '6px',
    flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row',
    backgroundColor: outline ? 'transparent' : colors.bg,
    color: colors.text,
    border: outline ? `2px solid ${colors.text}` : 'none',
    whiteSpace: 'nowrap',
  }

  return (
    <span test-id="el-b1a2d3g4" className={className} style={style}>
      {icon && (
        <span
          className="material-symbols-outlined"
          style={{ fontSize: sizes.iconSize }}
        >
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  )
}

Badge.propTypes = BadgeProps

export default Badge
