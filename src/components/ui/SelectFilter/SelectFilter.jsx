import { SelectFilterProps } from './SelectFilter.props'

export function SelectFilter({
  value = "",
  onChange,
  options,
  placeholder = "Seleccionar",
  className = "",
}) {
  return (
    <select
      test-id="el-s1l2f3t4"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`select select-bordered bg-base-100 h-10 min-h-0 text-sm ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

SelectFilter.propTypes = SelectFilterProps
