import { useState, useEffect, useRef, useId } from 'react';
import { Icon } from '../Icon';
import { SearchableSelectProps } from './SearchableSelect.props';

export function SearchableSelect({
  value = '',
  onChange,
  options = [],
  placeholder = 'Buscar...',
  id,
  name,
  required = false,
  disabled = false,
  error = false,
  className = '',
}) {
  const listboxId = useId();
  const selectedOption = options.find((opt) => opt.value === value) || null;
  const [inputValue, setInputValue] = useState(selectedOption?.label ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const opt = options.find((o) => o.value === value);
    setInputValue(opt?.label ?? '');
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        const opt = options.find((o) => o.value === value);
        setInputValue(opt?.label ?? '');
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, options]);

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const showDropdown = isOpen && filtered.length > 0;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange('');
    setIsOpen(true);
  };

  const handleSelect = (opt) => {
    setInputValue(opt.label);
    onChange(opt.value);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      const opt = options.find((o) => o.value === value);
      setInputValue(opt?.label ?? '');
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} test-id="el-s3a4b5c6">
      <div className="relative">
        <Icon
          name="search"
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-primary text-lg z-[1] pointer-events-none"
        />
        <input
          type="text"
          id={id}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required && !value}
          disabled={disabled}
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-controls={showDropdown ? listboxId : undefined}
          aria-autocomplete="list"
          className={`input input-bordered input-sm w-full bg-base-200 text-sm transition-all placeholder:text-base-content/40 focus:outline-none pl-9 pr-8 ${error ? 'border-error focus:border-error focus:ring-3 focus:ring-error/15' : 'border-base-300 focus:border-primary focus:ring-3 focus:ring-primary/15'}`}
        />
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar selección"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-base-content/40 hover:text-base-content transition-colors"
            tabIndex={-1}
          >
            <Icon name="close" className="text-base" />
          </button>
        )}
      </div>

      {showDropdown && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-48 overflow-y-auto py-1"
        >
          {filtered.map((opt) => (
            <li key={opt.value} role="option" aria-selected={opt.value === value}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                onMouseDown={(e) => { e.preventDefault(); handleSelect(opt); }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

SearchableSelect.propTypes = SearchableSelectProps;
