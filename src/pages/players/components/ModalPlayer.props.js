import PropTypes from 'prop-types';

export const ModalPlayerProps = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  isAdmin: PropTypes.bool,
  categoryId: PropTypes.string,
  initialData: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nombre: PropTypes.string,
    apellidos: PropTypes.string,
    dorsal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
