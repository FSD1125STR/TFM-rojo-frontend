import PropTypes from "prop-types";

export function SelectFilter({
  value = "",
  onChange,
  options,
  placeholder = "Seleccionar",
  className = "",
}) {
  return (
    <select
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

SelectFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};
