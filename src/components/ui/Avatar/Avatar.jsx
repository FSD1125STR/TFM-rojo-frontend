import { AvatarProps } from './Avatar.props';

const sizeClasses = {
  xs: 'w-6',
  sm: 'w-8',
  md: 'w-10',
  lg: 'w-12',
  xl: 'w-20',
};

const textSizeClasses = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-xl',
};

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const variantClasses = {
  neutral: 'bg-neutral text-neutral-content',
  primary: 'bg-primary text-primary-content',
};

export function Avatar({ src, name, size = 'md', variant = 'neutral', className = '' }) {
  const sizeClass = sizeClasses[size];
  const textSize = textSizeClasses[size];

  if (src) {
    return (
      <div test-id="el-a1b2c3d4" className={`avatar ${className}`}>
        <div className={`${sizeClass} rounded-full`}>
          <img src={src} alt={name || 'Avatar'} />
        </div>
      </div>
    );
  }

  return (
    <div test-id="el-a1b2c3d4" className={`avatar placeholder ${className}`}>
      <div className={`${variantClasses[variant]} ${sizeClass} rounded-full flex items-center justify-center`}>
        <span className={textSize}>{getInitials(name)}</span>
      </div>
    </div>
  );
}

Avatar.propTypes = AvatarProps;
