import PropTypes from 'prop-types'
import { Icon } from '../../../components/ui/Icon'
import './PlayerForm.styles.css'

const posiciones = [
  { value: 'Portero', label: 'Portero' },
  { value: 'Defensa', label: 'Defensa' },
  { value: 'Centrocampista', label: 'Centrocampista' },
  { value: 'Delantero', label: 'Delantero' },
]

const estados = [
  { value: 'Disponible', label: 'Disponible' },
  { value: 'Lesionado', label: 'Lesionado' },
  { value: 'Sancionado', label: 'Sancionado' },
  { value: 'No disponible', label: 'No disponible' },
]

const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return null
  const fecha = new Date(fechaNacimiento)
  const hoy = new Date()
  let edad = hoy.getFullYear() - fecha.getFullYear()
  const mes = hoy.getMonth() - fecha.getMonth()
  if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
    edad--
  }
  return edad
}

export function PlayerForm({ formId, formData, edad, onChange, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  return (
    <form id={formId} onSubmit={onSubmit} className="player-form">
      <div className="grid grid-cols-[1fr_1.3fr_0.7fr] gap-3 mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span>Nombre <span className="text-error">*</span></span>
          </label>
          <div className="player-form-input-icon">
            <Icon name="person" className="icon" />
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="input input-bordered input-sm w-full"
              placeholder="Nombre"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span>Apellidos <span className="text-error">*</span></span>
          </label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="input input-bordered input-sm w-full"
            placeholder="Apellidos"
            required
          />
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span>Dorsal</span>
          </label>
          <div className="player-form-input-icon">
            <Icon name="tag" className="icon" />
            <input
              type="number"
              name="dorsal"
              value={formData.dorsal}
              onChange={handleChange}
              className="input input-bordered input-sm w-full"
              placeholder="--"
              min="1"
              max="99"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span>Fecha de nacimiento <span className="text-error">*</span></span>
          </label>
          <div className="player-form-input-icon">
            <Icon name="calendar_month" className="icon" />
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="input input-bordered input-sm w-full"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span>Edad</span>
          </label>
          <div className="input input-bordered input-sm w-full player-form-edad-badge">
            <Icon name="cake" />
            <span>{edad !== null ? `${edad} años` : '-- años'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span>Email <span className="text-error">*</span></span>
          </label>
          <div className="player-form-input-icon">
            <Icon name="mail" className="icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered input-sm w-full"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span>Teléfono <span className="text-error">*</span></span>
          </label>
          <div className="player-form-input-icon">
            <Icon name="phone" className="icon" />
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="input input-bordered input-sm w-full"
              placeholder="+34 600 000 000"
              required
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span>Dirección <span className="text-error">*</span></span>
          </label>
          <div className="player-form-input-icon">
            <Icon name="location_on" className="icon" />
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="input input-bordered input-sm w-full"
              placeholder="Calle, número, piso..."
              required
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="form-control">
          <label className="label py-1">
            <span>Ciudad <span className="text-error">*</span></span>
          </label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className="input input-bordered input-sm w-full"
            placeholder="Ciudad"
            required
          />
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span>Provincia <span className="text-error">*</span></span>
          </label>
          <input
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className="input input-bordered input-sm w-full"
            placeholder="Provincia"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="form-control">
          <label className="label py-1">
            <span>Posición <span className="text-error">*</span></span>
          </label>
          <select
            name="posicion"
            value={formData.posicion}
            onChange={handleChange}
            className="select select-bordered select-sm w-full"
            required
          >
            <option value="">Seleccionar posición</option>
            {posiciones.map((pos) => (
              <option key={pos.value} value={pos.value}>{pos.label}</option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label py-1">
            <span>Estado <span className="text-error">*</span></span>
          </label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="select select-bordered select-sm w-full"
            required
          >
            <option value="">Seleccionar estado</option>
            {estados.map((est) => (
              <option key={est.value} value={est.value}>{est.label}</option>
            ))}
          </select>
        </div>
      </div>
    </form>
  )
}

PlayerForm.calcularEdad = calcularEdad

PlayerForm.INITIAL_DATA = {
  nombre: '',
  apellidos: '',
  fechaNacimiento: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  provincia: '',
  dorsal: '',
  posicion: '',
  estado: 'Disponible',
}

PlayerForm.propTypes = {
  formId: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  edad: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
