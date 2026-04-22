import Swal from 'sweetalert2';

const PRIMARY_BUTTON_COLOR = '#5C6F68';
const NOTIF_TIMEOUT_MS = 10_000;
const TOAST_TIMEOUT_MS = 3_000;

export const showError = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: PRIMARY_BUTTON_COLOR,
  });
};

export const showErrorList = (title, items) => {
  const html = `<ul class="text-left text-sm space-y-1 mt-1">${items.map((i) => `<li>• ${i}</li>`).join('')}</ul>`;
  return Swal.fire({
    icon: 'error',
    title,
    html,
    confirmButtonColor: PRIMARY_BUTTON_COLOR,
  });
};

export const showErrorInModal = (message, title = 'Error') => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: PRIMARY_BUTTON_COLOR,
    target: document.querySelector('dialog[open]'),
  });
};

export const showWarning = (message) => {
  return Swal.fire({
    icon: 'warning',
    title: '¡Advertencia!',
    text: message,
    confirmButtonColor: PRIMARY_BUTTON_COLOR,
  });
};

export const showSuccess = (message) => {
  return Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: message,
    confirmButtonColor: PRIMARY_BUTTON_COLOR,
  });
};

const NOTIF_TOAST_ICONS = {
  MATCH_LIVE:        { icon: 'sports',        color: '#22c55e' },
  MATCH_HALF_TIME:   { icon: 'pause_circle',  color: '#f59e0b' },
  MATCH_SECOND_HALF: { icon: 'sports',        color: '#22c55e' },
  MATCH_FINISHED:    { icon: 'flag',          color: '#6b7280' },
  MATCH_GOAL_HOME:  { icon: 'sports_soccer', color: '#3b82f6' },
  MATCH_GOAL_AWAY:  { icon: 'sports_soccer', color: '#8b5cf6' },
  MATCH_RED:        { icon: 'square',        color: '#ef4444' },
  CALLUP_CREATED:   { icon: 'group',         color: '#0ea5e9' },
  CALLUP_SAVED:     { icon: 'check_circle',  color: '#22c55e' },
};

export const showNotification = (message, { categoryName, onClick, type } = {}) => {
  const notifIcon = type ? NOTIF_TOAST_ICONS[type] : null;
  const iconConfig = notifIcon
    ? {
        iconHtml: `<span class="material-symbols-outlined" style="font-size:1.75rem;color:${notifIcon.color}">${notifIcon.icon}</span>`,
        iconColor: 'transparent',
      }
    : { icon: 'info' };

  return Swal.fire({
    toast: true,
    position: 'bottom-end',
    ...iconConfig,
    title: message,
    html: categoryName
      ? `<span style="font-size:0.75rem;opacity:0.65;">${categoryName}</span>`
      : undefined,
    showConfirmButton: false,
    timer: NOTIF_TIMEOUT_MS,
    timerProgressBar: true,
    didOpen: (toast) => {
      if (onClick) {
        toast.style.cursor = 'pointer';
        toast.querySelectorAll('*').forEach((el) => { el.style.cursor = 'pointer'; });
        toast.addEventListener('click', () => {
          onClick();
          Swal.close();
        });
      }
    },
  });
};

export const showToast = (message, icon = 'success') => {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title: message,
    showConfirmButton: false,
    timer: TOAST_TIMEOUT_MS,
    timerProgressBar: true,
  });
};

export const showInputPrompt = ({ title, text, input = 'text', inputValue = '', confirmButtonText = 'Confirmar', cancelButtonText = 'Cancelar' }) => {
  return Swal.fire({
    title,
    text,
    input,
    inputValue,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: PRIMARY_BUTTON_COLOR,
    cancelButtonColor: '#d33',
  }).then((result) => ({ isConfirmed: result.isConfirmed, value: result.value }));
};

export const showLoadingInModal = (message = 'Guardando...') => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    target: document.querySelector('dialog[open]'),
    didOpen: () => Swal.showLoading(),
  });
};

export const closeLoading = () => Swal.close();

export const getApiErrorMsg = (err, fallback = 'Ha ocurrido un error') =>
  err?.response?.data?.message || err?.response?.data?.error || fallback;

export const showConfirmInModal = (message, title = '¿Estás seguro?') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: PRIMARY_BUTTON_COLOR,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    target: document.querySelector('dialog[open]'),
  }).then((result) => result.isConfirmed);
};

export const showConfirm = (message, title = '¿Estás seguro?') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: PRIMARY_BUTTON_COLOR,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then((result) => result.isConfirmed);
};
