// Configuración de estados, etiquetas y opciones para convocatorias

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
  BF: 'Baja familiar',
  SA: 'Sanción',
  EN: 'Enfermedad',
};

export const callupFilterOptions = [
  { label: 'Con convocatoria', value: 'created' },
  { label: 'Sin convocatoria', value: 'missing' },
];
