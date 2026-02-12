import { SearchInputProps } from './SearchInput.props'

export function SearchInput({
  value = "",
  onChange,
  placeholder = "Buscar...",
  className = "",
}) {
  return (
    <div test-id="el-s1r2c3h4" className={`relative ${className}`}>
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50 text-xl">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input input-bordered w-full pl-10 bg-base-100 h-10 text-sm"
      />
    </div>
  );
}

SearchInput.propTypes = SearchInputProps
