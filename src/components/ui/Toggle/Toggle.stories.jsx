import { useState } from 'react';
import { Toggle } from './Toggle';

export default {
  title: 'UI/Toggle',
  component: Toggle,
};

export const Default = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Toggle
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Activar opción"
      />
    );
  },
};

export const Checked = {
  render: () => (
    <Toggle checked={true} onChange={() => {}} label="Nuestro equipo" />
  ),
};

export const Disabled = {
  render: () => (
    <Toggle checked={true} onChange={() => {}} label="Deshabilitado" disabled />
  ),
};

export const WithoutLabel = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Toggle checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Variants = {
  render: () => (
    <div className="flex flex-col gap-3">
      {['primary', 'secondary', 'success', 'warning', 'error'].map((variant) => (
        <Toggle key={variant} checked={true} onChange={() => {}} label={variant} variant={variant} />
      ))}
    </div>
  ),
};
