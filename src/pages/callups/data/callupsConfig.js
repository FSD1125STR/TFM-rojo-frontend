// Configuración de estados, etiquetas y opciones para convocatorias

// ── Callup detail / management (used by callup detail page) ──────────────────

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

// ── Callups list (used by CallupsList page) ──────────────────────────────────

// Teal (hue ~195) para diferenciarlo del verde "Finalizado" (hue ~145)
const TEAL = { bg: 'oklch(87% 0.10 195)', text: 'oklch(28% 0.14 195)' };
const BADGE_WIDTH = '158px';

export const callupStatusConfig = {
  created: { icon: 'how_to_reg', variant: 'custom', customColor: TEAL,    label: 'Convocatoria creada', width: BADGE_WIDTH },
  missing: { icon: 'person_off',  variant: 'warning',                      label: 'Sin convocatoria',    width: BADGE_WIDTH },
};

export const reasonCodeLabels = {
  DT: 'Decisión técnica',
  LE: 'Lesión',
  BF: 'Baja forma',
  SA: 'Sanción',
  EN: 'Enfermedad',
};

export const callupFilterOptions = [
  { label: 'Con convocatoria', value: 'created' },
  { label: 'Sin convocatoria', value: 'missing' },
];
