import { forwardRef, useEffect, useState } from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useForkRef } from '@mui/material/utils';
import { usePickerContext } from '@mui/x-date-pickers/hooks';
import { format, isValid, parse } from 'date-fns';
import { DatePickerProps } from './DatePicker.props';

const INPUT_CLS = 'input input-bordered input-sm w-full bg-base-200/50 border-base-300 text-sm transition-all placeholder:text-base-content/40 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/15 pl-9 cursor-pointer';
const ERROR_CLS = 'border-error focus:border-error focus:ring-error/15';

function useDaisyTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') === 'dark',
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

function toDate(val) {
  if (!val) return null;
  const d = parse(val, 'yyyy-MM-dd', new Date());
  return isValid(d) ? d : null;
}

const CustomDateField = forwardRef(function CustomDateField(props, ref) {
  const { name, required, disabled, error } = props;
  const { value, setOpen, triggerRef } = usePickerContext();
  const handleRef = useForkRef(triggerRef, ref);
  const displayValue = value && isValid(value) ? format(value, 'dd/MM/yyyy') : '';

  return (
    <div className="relative" ref={handleRef} test-id="el-d4t3p1k2">
      <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-primary text-lg z-[1] pointer-events-none">
        calendar_month
      </span>
      <input
        type="text"
        name={name}
        value={displayValue}
        readOnly
        required={required}
        disabled={disabled}
        className={`${INPUT_CLS} ${error ? ERROR_CLS : ''}`}
        placeholder="dd/mm/aaaa"
        onClick={() => !disabled && setOpen((prev) => !prev)}
      />
    </div>
  );
});

export function DatePicker({ value = '', onChange, required, error, disabled, name }) {
  const isDark = useDaisyTheme();
  const theme = createTheme({ palette: { mode: isDark ? 'dark' : 'light' } });

  const handleChange = (date) => {
    if (!date || !isValid(date)) { onChange(''); return; }
    onChange(format(date, 'yyyy-MM-dd'));
  };

  return (
    <ThemeProvider theme={theme}>
      <MuiDatePicker
        value={toDate(value)}
        onChange={handleChange}
        slots={{ field: CustomDateField }}
        slotProps={{
          field: { name, required, disabled, error },
          popper: {
            disablePortal: false,
            container: () => document.querySelector('dialog[open]') ?? document.body,
            strategy: 'fixed',
            placement: 'top-start',
            modifiers: [
              { name: 'flip', options: { fallbackPlacements: ['bottom-start'] } },
              { name: 'preventOverflow', options: { boundary: 'viewport' } },
            ],
          },
        }}
      />
    </ThemeProvider>
  );
}

DatePicker.propTypes = DatePickerProps;
