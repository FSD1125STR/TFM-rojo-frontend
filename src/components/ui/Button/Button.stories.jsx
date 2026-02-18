import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export const Primary = {
  args: {
    children: 'Guardar',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Cancelar',
    variant: 'secondary',
  },
};

export const Ghost = {
  args: {
    children: 'Ver más',
    variant: 'ghost',
  },
};

export const Danger = {
  args: {
    children: 'Eliminar',
    variant: 'danger',
  },
};

export const Small = {
  args: {
    children: 'Pequeño',
    variant: 'primary',
    size: 'sm',
  },
};

export const Large = {
  args: {
    children: 'Grande',
    variant: 'primary',
    size: 'lg',
  },
};

export const Loading = {
  args: {
    children: 'Guardando...',
    variant: 'primary',
    isLoading: true,
  },
};

export const Disabled = {
  args: {
    children: 'Deshabilitado',
    variant: 'primary',
    isDisabled: true,
  },
};
