import { Icon } from '../Icon';
import { RadioChipGroupProps } from './RadioChipGroup.props';

export function RadioChipGroup({ options = [], value, onChange, disabled = false, className = '' }) {
  return (
    <div test-id="el-r4d1ch1p" className={`flex gap-2 ${className}`}>
      {options.map((opt) => {
        const isActive = opt.value === value;
        const activeStyle = isActive && opt.activeColor
          ? { backgroundColor: opt.activeColor.bg, color: opt.activeColor.text, borderColor: opt.activeColor.text }
          : {};
        const activeClass = isActive
          ? opt.activeColor
            ? ''
            : 'border-primary bg-primary text-primary-content'
          : 'border-base-300 bg-base-200 text-base-content hover:border-primary/50';

        return (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onChange?.(opt.value)}
            style={activeStyle}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all ${activeClass} ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {opt.icon && <Icon name={opt.icon} className="text-[16px]" />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

RadioChipGroup.propTypes = RadioChipGroupProps;
