export const statusLabels = {
  scheduled: 'Programado',
  finished: 'Finalizado',
  cancelled: 'Cancelado',
};

export const estadoMatchConfig = {
  scheduled: { icon: 'schedule', variant: 'info' },
  finished: { icon: 'check_circle', variant: 'success' },
  cancelled: { icon: 'cancel', variant: 'error' },
};

export const estadoOptions = [
  { label: 'Programado', value: 'scheduled' },
  { label: 'Finalizado', value: 'finished' },
  { label: 'Cancelado', value: 'cancelled' },
];

export const tipoOptions = [
  { label: 'Local', value: 'local' },
  { label: 'Visitante', value: 'visitante' },
];

import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatFechaRelativa(dateStr) {
  if (!dateStr) return '';
  return formatDistance(new Date(dateStr), new Date(), { addSuffix: true, locale: es });
}

export function formatFechaAbsoluta(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const fecha = date.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const hora = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  return `${fecha} - ${hora}`;
}
