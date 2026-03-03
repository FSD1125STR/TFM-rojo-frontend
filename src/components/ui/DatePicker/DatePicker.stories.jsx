import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { DatePicker } from './DatePicker';

const withProvider = (Story) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
    <Story />
  </LocalizationProvider>
);

export default {
  title: 'UI/DatePicker',
  component: DatePicker,
  decorators: [withProvider],
};

function Controlled(args) {
  const [value, setValue] = useState(args.value ?? '');
  return <DatePicker {...args} value={value} onChange={setValue} />;
}

export const Empty = {
  render: (args) => <Controlled {...args} />,
  args: { required: true },
};

export const WithValue = {
  render: (args) => <Controlled {...args} />,
  args: { value: '1995-06-15' },
};

export const WithError = {
  render: (args) => <Controlled {...args} />,
  args: { value: '', error: true, required: true },
};

export const Disabled = {
  render: (args) => <Controlled {...args} />,
  args: { value: '2000-01-01', disabled: true },
};
