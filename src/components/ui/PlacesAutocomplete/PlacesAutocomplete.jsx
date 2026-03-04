import { useState, useEffect, useRef } from 'react';
import { Icon } from '../Icon';
import { searchPlaces } from '../../../services/placesService';
import { PlacesAutocompleteProps } from './PlacesAutocomplete.props';

const INPUT_CLS = 'input input-bordered input-sm w-full bg-base-200/50 border-base-300 text-sm transition-all placeholder:text-base-content/40 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15';
const INPUT_ICON_CLS = `${INPUT_CLS} pl-9 pr-8`;
const ICON_CLS = 'absolute left-2.5 top-1/2 -translate-y-1/2 text-primary text-lg z-[1] pointer-events-none';

export function PlacesAutocomplete({
  id,
  name,
  value = null,
  onChange,
  placeholder = 'Buscar estadio o campo...',
  disabled = false,
  required = false,
}) {
  const [inputValue, setInputValue] = useState(value?.name || '');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    setInputValue(value?.name || '');
  }, [value]);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setInputValue(value?.name || '');
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const handleInputChange = (e) => {
    const q = e.target.value;
    setInputValue(q);
    setIsOpen(true);

    clearTimeout(debounceRef.current);

    if (q.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(() => {
      searchPlaces(q)
        .then((data) => {
          setResults(data);
          setIsLoading(false);
        })
        .catch(() => {
          setResults([]);
          setIsLoading(false);
        });
    }, 400);
  };

  const handleSelect = (result) => {
    setInputValue(result.name);
    onChange(name, result);
    setIsOpen(false);
    setResults([]);
  };

  const handleClear = () => {
    setInputValue('');
    onChange(name, null);
    setResults([]);
    setIsOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (containerRef.current && !containerRef.current.querySelector(':focus')) {
        setInputValue(value?.name || '');
        setIsOpen(false);
      }
    }, 150);
  };

  const showDropdown = isOpen && (isLoading || results.length > 0);

  return (
    <div ref={containerRef} className="relative" test-id="el-p7q8r9s0">
      <div className="relative">
        <Icon name="location_on" className={ICON_CLS} />
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required && !value}
          autoComplete="off"
          className={INPUT_ICON_CLS}
        />
        {isLoading && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/40 animate-spin">
            <Icon name="progress_activity" className="text-base" />
          </span>
        )}
        {!isLoading && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpiar ubicación"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-base-content/40 hover:text-base-content transition-colors"
            tabIndex={-1}
          >
            <Icon name="close" className="text-base" />
          </button>
        )}
      </div>

      {showDropdown && (
        <ul className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-48 overflow-y-auto py-1">
          {isLoading && results.length === 0 && (
            <li className="px-3 py-2 text-sm text-base-content/50">Buscando...</li>
          )}
          {results.map((result) => (
            <li key={result.osmId}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                onMouseDown={(e) => { e.preventDefault(); handleSelect(result); }}
              >
                <span className="block font-medium">{result.name}</span>
                <span className="block text-xs text-base-content/50 truncate">{result.displayName}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

PlacesAutocomplete.propTypes = PlacesAutocompleteProps;
