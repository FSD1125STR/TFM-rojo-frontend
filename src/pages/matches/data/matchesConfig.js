import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

export const LIVE_STATUSES = new Set(['FIRST_HALF', 'HALF_TIME', 'SECOND_HALF']);

export const statusLabels = {
  scheduled: 'Programado',
  finished: 'Finalizado',
  cancelled: 'Cancelado',
};

export const estadoMatchConfig = {
  scheduled: { icon: 'schedule',     variant: 'info',    width: '108px' },
  finished:  { icon: 'check_circle', variant: 'success', width: '108px' },
  cancelled: { icon: 'cancel',       variant: 'error',   width: '108px' },
};

export const estadoOptions = [
  { label: 'Programado', value: 'scheduled' },
  { label: 'En curso', value: 'live' },
  { label: 'Finalizado', value: 'finished' },
  { label: 'Cancelado', value: 'cancelled' },
];

export const tipoOptions = [
  { label: 'Local', value: 'local' },
  { label: 'Visitante', value: 'visitante' },
];

export function toLocalDateTimeInput(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

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

export function formatMatchDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

export function formatMatchTime(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}
