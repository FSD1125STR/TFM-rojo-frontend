import { fn, userEvent, within } from '@storybook/test';
import { StrengthPassword } from './StrengthPassword';

export default {
  title: 'UI/StrengthPassword',
  component: StrengthPassword,
  argTypes: {
    onChange: { control: false },
  },
  args: {
    onChange: fn(),
  },
};

// Estado base — input vacío, barra en 0%
export const Default = {
  args: {},
};

// Contraseña muy débil: solo letras minúsculas, longitud <= 6 → 0 puntos
export const VeryWeak = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('••••••••');
    await userEvent.type(input, 'abc');
  },
};

// Contraseña débil: longitud > 6 y dígito → 50 puntos (warning)
export const Weak = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('••••••••');
    await userEvent.type(input, 'abcdef7');
  },
};

// Contraseña segura: longitud > 6, mayúscula + minúscula, dígito → 75 puntos (info)
export const Medium = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('••••••••');
    await userEvent.type(input, 'Abcdef7');
  },
};

// Contraseña muy segura: longitud > 6, mayúscula + minúscula, dígito, símbolo → 100 puntos (success)
export const Strong = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('••••••••');
    await userEvent.type(input, 'Abcdef7@');
  },
};
