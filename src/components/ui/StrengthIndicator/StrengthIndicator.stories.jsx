import { StrengthIndicator } from './StrengthIndicator';

export default {
  title: 'UI/StrengthIndicator',
  component: StrengthIndicator,
  argTypes: {
    password: {
      control: 'text',
    },
  },
};

// Estado base — contraseña vacía, ningún criterio cumplido
export const Empty = {
  args: {
    password: '',
  },
};

// 1 criterio cumplido (solo longitud) — barra roja
export const Weak = {
  args: {
    password: 'contraseña',
  },
};

// 2 criterios cumplidos (longitud + mayúscula) — barra amarilla
export const Fair = {
  args: {
    password: 'Contraseña',
  },
};

// 3 criterios cumplidos (longitud + mayúscula + número) — barra amarilla
export const Medium = {
  args: {
    password: 'Contrasena1',
  },
};

// 4 criterios cumplidos (longitud + mayúscula + número + símbolo) — barra verde
export const Strong = {
  args: {
    password: 'Contrasena1!',
  },
};
