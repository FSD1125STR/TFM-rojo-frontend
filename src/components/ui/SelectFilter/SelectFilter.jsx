import { useRef, useEffect } from 'react';
import { SelectFilterProps } from './SelectFilter.props';

function MultiSelectFilter({ value = [], onChange, options, placeholder, className }) {
  const selectRef = useRef(null);
  const wrapperRef = useRef(null);
  const onChangeRef = useRef(onChange);

  // Keep ref in sync to avoid stale closures
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Sync Preline → React: listen for change on native select
  useEffect(() => {
    const el = selectRef.current;
    if (!el) return;
    const handler = () => {
      const selected = Array.from(el.selectedOptions, (o) => o.value);
      onChangeRef.current(selected);
    };
    el.addEventListener('change', handler);
    return () => el.removeEventListener('change', handler);
  }, []);

  // Initialize Preline select widget after mount
  useEffect(() => {
    window.HSStaticMethods?.autoInit(['select']);
  }, []);

  const hsConfig = JSON.stringify({
    placeholder: placeholder,
    toggleTag: '<button type="button" aria-expanded="false"></button>',
    toggleClasses: 'hs-select-toggle select select-bordered bg-base-100 h-10 min-h-0 text-sm w-full',
    toggleCountText: 'seleccionados',
    toggleCountTextMinItems: 2,
    dropdownClasses: 'mt-1 z-50 w-full max-h-60 p-1 space-y-0.5 bg-base-100 border border-base-300 rounded-lg shadow-lg overflow-y-auto',
    optionClasses: 'py-2 px-3 w-full text-sm text-base-content cursor-pointer rounded-md hover:bg-base-200 hs-selected:bg-primary/10',
    optionTemplate: '<div class="flex justify-between items-center w-full"><span data-title></span><span class="hidden hs-selected:block"><svg class="shrink-0 size-4 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span></div>',
  });

  return (
    <div test-id="el-m5s3f7k2" className={`min-w-48 ${className}`} ref={wrapperRef}>
      <select
        ref={selectRef}
        multiple
        data-hs-select={hsConfig}
        className="hidden"
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SelectFilter({
  value = "",
  onChange,
  options,
  placeholder = "Seleccionar",
  className = "",
  multiple = false,
}) {
  if (multiple) {
    return (
      <MultiSelectFilter
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        className={className}
      />
    );
  }

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

SelectFilter.propTypes = SelectFilterProps;
