import Swal from 'sweetalert2';

export const showError = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: '#5C6F68',
  });
};

export const showErrorInModal = (message, title = 'Error') => {
  return Swal.fire({
    icon: 'error',
    title,
    text: message,
    confirmButtonColor: '#5C6F68',
    target: document.querySelector('dialog[open]'),
  });
};

export const showWarning = (message) => {
  return Swal.fire({
    icon: 'warning',
    title: '¡Advertencia!',
    text: message,
    confirmButtonColor: '#5C6F68',
  });
};

export const showSuccess = (message) => {
  return Swal.fire({
    icon: 'success',
    title: '¡Éxito!',
    text: message,
    confirmButtonColor: '#5C6F68',
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
    confirmButtonColor: '#5C6F68',
    cancelButtonColor: '#d33',
  }).then((result) => ({ isConfirmed: result.isConfirmed, value: result.value }));
};

export const showConfirm = (message, title = '¿Estás seguro?') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#5C6F68',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  }).then((result) => result.isConfirmed);
};
