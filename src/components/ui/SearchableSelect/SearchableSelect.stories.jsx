import { useState } from 'react';
import { SearchableSelect } from './SearchableSelect';

export default {
  title: 'UI/SearchableSelect',
  component: SearchableSelect,
  tags: ['autodocs'],
};

const teamOptions = [
  { value: 'cd-ejemplo', label: 'CD Ejemplo' },
  { value: 'atletico-x', label: 'Atlético X' },
  { value: 'deportivo-norte', label: 'Deportivo Norte' },
  { value: 'real-sur', label: 'Real Sur' },
  { value: 'union-este', label: 'Unión Este' },
];

const Controlled = (args) => {
  const [value, setValue] = useState('');
  return (
    <div className="w-72">
      <SearchableSelect {...args} value={value} onChange={setValue} />
      <p className="text-sm mt-2 text-base-content/50">Valor: {value || '(vacío)'}</p>
    </div>
  );
};

export const Default = Controlled.bind({});
Default.args = {
  options: teamOptions,
  placeholder: 'Buscar equipo...',
};

export const WithSelection = () => {
  const [value, setValue] = useState('CD Ejemplo');
  return (
    <div className="w-72">
      <SearchableSelect
        value={value}
        onChange={setValue}
        options={teamOptions}
        placeholder="Buscar equipo..."
      />
    </div>
  );
};

export const NoOptions = Controlled.bind({});
NoOptions.args = {
  options: [],
  placeholder: 'Escribe el nombre del equipo...',
};

export const Disabled = () => (
  <div className="w-72">
    <SearchableSelect
      value="CD Ejemplo"
      onChange={() => {}}
      options={teamOptions}
      placeholder="Buscar equipo..."
      disabled
    />
  </div>
);
