import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import logoHorizontal from '../../../assets/logo-horizontal.png'
import logo from '../../../assets/logo.png'

export function AppLogo({ collapsed = false }) {
  return (
    <Link test-id="el-k7l8m9n0" to="/" className="flex items-center justify-center px-4 py-3">
      {collapsed ? (
        <img src={logo} alt="FootMind" className="h-10 w-auto [html[data-theme=dark]_&]:brightness-150" />
      ) : (
        <img src={logoHorizontal} alt="FootMind" className="h-10 w-auto [html[data-theme=dark]_&]:brightness-150" />
      )}
    </Link>
  )
}

AppLogo.propTypes = {
  collapsed: PropTypes.bool,
}
