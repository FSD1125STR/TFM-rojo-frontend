import { useState } from 'react';
import { RadioChipGroup } from './RadioChipGroup';

export default {
  title: 'UI/RadioChipGroup',
  component: RadioChipGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Selector de opción única en forma de chips. Cada opción es un botón con estilo activo/inactivo. Soporta iconos opcionales por opción.',
      },
    },
  },
  argTypes: {
    options: { description: 'Array de opciones ({value, label, icon?})', control: 'object' },
    value: { description: 'Valor seleccionado actualmente', control: 'text' },
    disabled: { description: 'Deshabilita todos los chips', control: 'boolean' },
  },
};

const reasonOptions = [
  { value: 'DT', label: 'Decisión técnica', icon: 'sports' },
  { value: 'BF', label: 'Baja física', icon: 'fitness_center' },
  { value: 'EN', label: 'Enfermedad', icon: 'sick' },
];

const simpleOptions = [
  { value: 'A', label: 'Opción A' },
  { value: 'B', label: 'Opción B' },
  { value: 'C', label: 'Opción C' },
];

export const Default = {
  render: () => {
    const [value, setValue] = useState('DT');
    return (
      <RadioChipGroup
        options={reasonOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
  parameters: {
    docs: { description: { story: 'Selector con opciones de razón para no convocar, con iconos.' } },
  },
};

export const SinIconos = {
  render: () => {
    const [value, setValue] = useState('A');
    return (
      <RadioChipGroup
        options={simpleOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
  parameters: {
    docs: { description: { story: 'Opciones simples sin iconos.' } },
  },
};

export const Deshabilitado = {
  args: {
    options: reasonOptions,
    value: 'BF',
    disabled: true,
  },
  parameters: {
    docs: { description: { story: 'Grupo deshabilitado — no interactivo.' } },
  },
};

export const SinSeleccion = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <RadioChipGroup
        options={reasonOptions}
        value={value}
        onChange={setValue}
      />
    );
  },
  parameters: {
    docs: { description: { story: 'Sin valor seleccionado inicialmente.' } },
  },
};
