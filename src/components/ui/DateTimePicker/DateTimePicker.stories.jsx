import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { DateTimePicker } from './DateTimePicker';

const withProvider = (Story) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
    <Story />
  </LocalizationProvider>
);

export default {
  title: 'UI/DateTimePicker',
  component: DateTimePicker,
  decorators: [withProvider],
};

function Controlled(args) {
  const [value, setValue] = useState(args.value ?? '');
  return <DateTimePicker {...args} value={value} onChange={setValue} />;
}

export const Empty = {
  render: (args) => <Controlled {...args} />,
  args: { required: true },
};

export const WithValue = {
  render: (args) => <Controlled {...args} />,
  args: { value: '2025-04-20T18:30' },
};

export const WithError = {
  render: (args) => <Controlled {...args} />,
  args: { value: '', error: true, required: true },
};

export const Disabled = {
  render: (args) => <Controlled {...args} />,
  args: { value: '2025-04-20T18:30', disabled: true },
};
