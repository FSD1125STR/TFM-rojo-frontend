import Swal from 'sweetalert2';

const PRIMARY_BUTTON_COLOR = '#5C6F68';

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

export const showNotification = (message, { categoryName, onClick } = {}) => {
  return Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon: 'info',
    title: message,
    html: categoryName
      ? `<span style="font-size:0.75rem;opacity:0.65;">${categoryName}</span>`
      : undefined,
    showConfirmButton: false,
    timer: 10000,
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
    timer: 3000,
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
