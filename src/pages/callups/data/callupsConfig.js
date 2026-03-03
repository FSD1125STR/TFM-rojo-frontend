export const MAX_PLAYERS = 18;
export const MIN_PLAYERS = 11;

export const REASON_CONFIG = {
  DT: {
    label: 'D. Técnica',
    icon: 'sports',
    variant: 'secondary',
    activeColor: { bg: 'oklch(88% 0.12 300)', text: 'oklch(45% 0.15 300)' },
  },
  LE: {
    label: 'Lesión',
    icon: 'healing',
    variant: 'error',
    activeColor: { bg: 'oklch(85% 0.15 25)', text: 'oklch(45% 0.18 25)' },
  },
  BF: {
    label: 'Baja forma',
    icon: 'fitness_center',
    variant: 'warning',
    activeColor: { bg: 'oklch(90% 0.12 85)', text: 'oklch(45% 0.15 85)' },
  },
  SA: {
    label: 'Sanción',
    icon: 'gavel',
    variant: 'custom',
    customColor: { bg: '#FEF9C3', text: '#78350F' },
    activeColor: { bg: '#FEF9C3', text: '#78350F' },
  },
  EN: {
    label: 'Enfermedad',
    icon: 'sick',
    variant: 'info',
    activeColor: { bg: 'oklch(88% 0.10 230)', text: 'oklch(45% 0.15 230)' },
  },
};

export const REASON_CODES = Object.fromEntries(
  Object.entries(REASON_CONFIG).map(([k, v]) => [k, v.label])
);

export const MANUAL_REASON_CODES = ['DT', 'BF', 'EN'];

export const COLUMN_IDS = {
  AVAILABLE: null,
  CALLED: 'called',
  NOT_CALLED: 'notCalled',
};
