import PropTypes from 'prop-types'

export const ModalPersonaProps = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  mode: PropTypes.oneOf(['jugador', 'usuario']),
  initialData: PropTypes.shape({
    nombre: PropTypes.string,
    apellidos: PropTypes.string,
    fechaNacimiento: PropTypes.string,
    email: PropTypes.string,
    telefono: PropTypes.string,
    direccion: PropTypes.string,
    ciudad: PropTypes.string,
    provincia: PropTypes.string,
    dorsal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    posicion: PropTypes.string,
    estado: PropTypes.string,
    rol: PropTypes.string,
  }),
  title: PropTypes.string,
}
