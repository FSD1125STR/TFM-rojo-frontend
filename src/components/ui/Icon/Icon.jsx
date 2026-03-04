import { IconProps } from './Icon.props';

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
};

export function Icon({ name, size = 'md', className = '', ariaLabel }) {
  if (ariaLabel) {
    return (
      <span test-id="el-i1c2o3n4" className={`material-symbols-outlined ${sizeClasses[size]} ${className}`} role="img" aria-label={ariaLabel}>
        {name}
      </span>
    );
  }
  return (
    <span test-id="el-i1c2o3n4" className={`material-symbols-outlined ${sizeClasses[size]} ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

Icon.propTypes = IconProps;
