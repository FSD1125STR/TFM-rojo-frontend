import { ToggleProps } from './Toggle.props';

export function Toggle({
  checked = false,
  onChange,
  label,
  ariaLabel,
  disabled = false,
  size = 'sm',
  variant = 'primary',
}) {
  return (
    <label test-id="el-t0g1l2e3" className="flex items-center gap-2 cursor-pointer w-fit select-none">
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={!label ? ariaLabel : undefined}
        className={`toggle toggle-${variant} toggle-${size}`}
      />
      {label && (
        <span className="text-sm text-base-content/80">{label}</span>
      )}
    </label>
  );
}

Toggle.propTypes = ToggleProps;
