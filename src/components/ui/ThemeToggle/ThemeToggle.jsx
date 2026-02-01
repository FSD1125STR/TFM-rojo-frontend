import PropTypes from 'prop-types'
import { useTheme } from '../../../hooks/useTheme'
import { Icon } from '../Icon/Icon'

const sizeClasses = {
  sm: 'btn-sm',
  md: '',
}

export function ThemeToggle({ variant = 'icon', size = 'md' }) {
  const { theme, toggleTheme } = useTheme()
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
    <button
      test-id="el-g3h4i5j6"
      className={`btn btn-ghost btn-square ${sizeClasses[size]}`}
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <Icon name={isDark ? 'light_mode' : 'dark_mode'} size="sm" />
    </button>
  )
}

ThemeToggle.propTypes = {
  variant: PropTypes.oneOf(['icon', 'switch']),
  size: PropTypes.oneOf(['sm', 'md']),
}
