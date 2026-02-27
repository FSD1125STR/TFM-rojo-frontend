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
  multiple = false,
}) {
  const listboxId = useId();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!multiple) {
      const opt = options.find((o) => o.value === value);
      setInputValue(opt?.label ?? '');
    }
  }, [value, options, multiple]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (!multiple) {
          const opt = options.find((o) => o.value === value);
          setInputValue(opt?.label ?? '');
        } else {
          setInputValue('');
        }
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, options, multiple]);

  const selectedValues = multiple ? (Array.isArray(value) ? value : []) : [];
  const selectedOptions = multiple
    ? selectedValues.map((v) => options.find((o) => o.value === v)).filter(Boolean)
    : [];

  const filtered = options.filter((opt) => {
    const matchesSearch = opt.label.toLowerCase().includes(inputValue.toLowerCase());
    const notSelected = multiple ? !selectedValues.includes(opt.value) : true;
    return matchesSearch && notSelected;
  });

  const showDropdown = isOpen && filtered.length > 0;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (!multiple) onChange('');
    setIsOpen(true);
  };

  const handleSelect = (opt) => {
    if (multiple) {
      onChange([...selectedValues, opt.value]);
      setInputValue('');
    } else {
      setInputValue(opt.label);
      onChange(opt.value);
      setIsOpen(false);
    }
  };

  const handleRemoveChip = (val) => {
    onChange(selectedValues.filter((v) => v !== val));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (!multiple) {
        const opt = options.find((o) => o.value === value);
        setInputValue(opt?.label ?? '');
      } else {
        setInputValue('');
      }
      setIsOpen(false);
    }
    if (multiple && e.key === 'Backspace' && inputValue === '' && selectedValues.length > 0) {
      onChange(selectedValues.slice(0, -1));
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange(multiple ? [] : '');
    setIsOpen(false);
  };

  const showClearButton = multiple ? selectedValues.length > 0 : !!value;

  return (
    <div ref={containerRef} className={`relative ${className}`} test-id="el-s3a4b5c6">
      {multiple && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1.5">
          {selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
            >
              {opt.label}
              <button
                type="button"
                onClick={() => handleRemoveChip(opt.value)}
                disabled={disabled}
                aria-label={`Quitar ${opt.label}`}
                className="hover:text-error transition-colors leading-none ml-0.5"
              >
                <Icon name="close" className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}

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
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={multiple && selectedValues.length > 0 ? 'Añadir más...' : placeholder}
          required={required && (multiple ? selectedValues.length === 0 : !value)}
          disabled={disabled}
          autoComplete="off"
          role="combobox"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          aria-controls={showDropdown ? listboxId : undefined}
          aria-autocomplete="list"
          className={`input input-bordered input-sm w-full bg-base-200 text-sm transition-all placeholder:text-base-content/40 focus:outline-none pl-9 pr-8 ${error ? 'border-error focus:border-error focus:ring-3 focus:ring-error/15' : 'border-base-300 focus:border-primary focus:ring-3 focus:ring-primary/15'}`}
        />
        {showClearButton && !disabled && (
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
            <li
              key={opt.value}
              role="option"
              aria-selected={multiple ? selectedValues.includes(opt.value) : opt.value === value}
            >
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
