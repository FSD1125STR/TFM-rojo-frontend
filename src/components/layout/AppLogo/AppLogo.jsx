import { Link } from 'react-router-dom';
import { AppLogoProps } from './AppLogo.props';
import { LOGO_URL as logo, LOGO_HORIZONTAL_URL as logoHorizontal } from '../../../assets/brand.js';

export function AppLogo({ collapsed = false }) {
  return (
    <Link test-id="el-k7l8m9n0" to="/" className="flex items-center justify-center px-4 py-3">
      {collapsed ? (
        <img src={logo} alt="FootMind" className="h-10 w-auto [html[data-theme=dark]_&]:brightness-150" />
      ) : (
        <img src={logoHorizontal} alt="FootMind" className="h-10 w-auto [html[data-theme=dark]_&]:brightness-150" />
      )}
    </Link>
  );
}

AppLogo.propTypes = AppLogoProps;
