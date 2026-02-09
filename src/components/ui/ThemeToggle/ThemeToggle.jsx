import PropTypes from 'prop-types'
import { useTheme } from '../../../hooks/useTheme'
import { useAuth } from '../../../hooks/useAuth'
import { Icon } from '../Icon/Icon'

const sizeClasses = {
  sm: 'btn-sm',
  md: '',
}

export function ThemeToggle({ variant = 'icon', size = 'md' }) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme(user?.id)
  const isDark = theme === 'dark'

  if (variant === 'switch') {
    return (
      <label test-id="el-g3h4i5j6" className="swap swap-rotate">
        <input
          type="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          aria-label="Toggle dark mode"
        />
        <Icon name="light_mode" size="sm" className="swap-off" />
        <Icon name="dark_mode" size="sm" className="swap-on" />
      </label>
    )
  }

  return (
    <label test-id="el-g3h4i5j6" className={`swap swap-rotate btn btn-ghost btn-square ${sizeClasses[size]}`}>
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Icon name="light_mode" size="sm" className="swap-off" />
      <Icon name="dark_mode" size="sm" className="swap-on" />
    </label>
  )
}

ThemeToggle.propTypes = {
  variant: PropTypes.oneOf(['icon', 'switch']),
  size: PropTypes.oneOf(['sm', 'md']),
}
