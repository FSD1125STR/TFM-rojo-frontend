import PropTypes from 'prop-types';

export const ModalPlayerProps = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  initialData: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    apellidos: PropTypes.string,
    dorsal: PropTypes.number,
    posicion: PropTypes.string,
    fechaNacimiento: PropTypes.string,
    email: PropTypes.string,
    telefono: PropTypes.string,
    ciudad: PropTypes.string,
    provincia: PropTypes.string,
    direccion: PropTypes.string,
    estado: PropTypes.string,
  }),
};
