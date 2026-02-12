import { useState, useEffect, useRef } from 'react'
import { ModalPersonaProps } from './ModalPersona.props'
import './ModalPersona.styles.css'

const posicionesJugador = [
  { value: 'Portero', label: 'Portero' },
  { value: 'Defensa', label: 'Defensa' },
  { value: 'Centrocampista', label: 'Centrocampista' },
  { value: 'Delantero', label: 'Delantero' },
]

const estadosJugador = [
  { value: 'Disponible', label: 'Disponible' },
  { value: 'Lesionado', label: 'Lesionado' },
  { value: 'Sancionado', label: 'Sancionado' },
  { value: 'No disponible', label: 'No disponible' },
]

const rolesUsuario = [
  { value: 'Entrenador', label: 'Entrenador' },
  { value: 'Cuerpo Técnico', label: 'Cuerpo Técnico' },
  { value: 'Dirección', label: 'Dirección' },
  { value: 'Administrador', label: 'Administrador' },
]

const estadosUsuario = [
  { value: 'Activo', label: 'Activo' },
  { value: 'Inactivo', label: 'Inactivo' },
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

const getInitialFormData = (mode) => ({
  nombre: '',
  apellidos: '',
  fechaNacimiento: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  provincia: '',
  ...(mode === 'jugador' ? {
    dorsal: '',
    posicion: '',
    estado: 'Disponible',
  } : {
    rol: '',
    estado: 'Activo',
  }),
})

export function ModalPersona({
  isOpen = false,
  onClose,
  onSave,
  mode = 'jugador',
  initialData = null,
  title,
}) {
  const modalRef = useRef(null)
  const [formData, setFormData] = useState(getInitialFormData(mode))
  const [edad, setEdad] = useState(null)

  const isEditing = initialData !== null

  const modalTitle = title || (isEditing
    ? (mode === 'jugador' ? 'Editar Jugador' : 'Editar Usuario')
    : (mode === 'jugador' ? 'Nuevo Jugador' : 'Nuevo Usuario'))

  const modalSubtitle = isEditing
    ? (mode === 'jugador' ? 'Modifica los datos del jugador' : 'Modifica los datos del usuario')
    : (mode === 'jugador' ? 'Completa los datos del jugador' : 'Completa los datos del usuario')

  const saveButtonText = isEditing ? 'Guardar Cambios' : (mode === 'jugador' ? 'Guardar Jugador' : 'Guardar Usuario')

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({ ...getInitialFormData(mode), ...initialData })
        setEdad(calcularEdad(initialData.fechaNacimiento))
      } else {
        setFormData(getInitialFormData(mode))
        setEdad(null)
      }
    }
  }, [isOpen, initialData, mode])

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal()
      } else {
        modalRef.current.close()
      }
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === 'fechaNacimiento') {
      setEdad(calcularEdad(value))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dataToSave = {
      ...formData,
      edad: edad,
      ...(mode === 'jugador' && formData.dorsal ? { dorsal: parseInt(formData.dorsal) } : {}),
    }
    onSave?.(dataToSave)
    onClose?.()
  }

  const handleClose = () => {
    onClose?.()
  }

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      handleClose()
    }
  }

  const rowStyle = { display: 'grid', gap: '12px', marginBottom: '12px' }
  const row3Cols = { ...rowStyle, gridTemplateColumns: mode === 'jugador' ? '1fr 1.3fr 0.7fr' : '1fr 1.5fr' }
  const row2Cols = { ...rowStyle, gridTemplateColumns: '1fr 1fr' }

  return (
    <dialog
      test-id="el-m1d2l3p4"
      ref={modalRef}
      className="modal modal-persona"
      onClick={handleBackdropClick}
    >
      <div className="modal-box">
        <div className="modal-persona-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="modal-persona-header-icon">
              <span className="material-symbols-outlined">
                {isEditing ? 'edit' : 'person_add'}
              </span>
            </div>
            <div>
              <h3 className="modal-persona-header-title">{modalTitle}</h3>
              <p className="modal-persona-header-subtitle">{modalSubtitle}</p>
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-circle btn-ghost" onClick={handleClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-persona-body">
            <div style={row3Cols}>
              <div className="form-control">
                <label className="label py-1">
                  <span>Nombre <span className="text-error">*</span></span>
                </label>
                <div className="modal-persona-input-icon">
                  <span className="material-symbols-outlined icon">person</span>
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
              {mode === 'jugador' && (
                <div className="form-control">
                  <label className="label py-1">
                    <span>Dorsal</span>
                  </label>
                  <div className="modal-persona-input-icon">
                    <span className="material-symbols-outlined icon">tag</span>
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
              )}
            </div>

            <div style={row2Cols}>
              <div className="form-control">
                <label className="label py-1">
                  <span>Fecha de nacimiento <span className="text-error">*</span></span>
                </label>
                <div className="modal-persona-input-icon">
                  <span className="material-symbols-outlined icon">calendar_month</span>
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
                <div className="input input-bordered input-sm w-full modal-persona-edad-badge">
                  <span className="material-symbols-outlined">cake</span>
                  <span>{edad !== null ? `${edad} años` : '-- años'}</span>
                </div>
              </div>
            </div>

            <div style={row2Cols}>
              <div className="form-control">
                <label className="label py-1">
                  <span>Email <span className="text-error">*</span></span>
                </label>
                <div className="modal-persona-input-icon">
                  <span className="material-symbols-outlined icon">mail</span>
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
                <div className="modal-persona-input-icon">
                  <span className="material-symbols-outlined icon">phone</span>
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

            <div style={{ marginBottom: '12px' }}>
              <div className="form-control">
                <label className="label py-1">
                  <span>Dirección <span className="text-error">*</span></span>
                </label>
                <div className="modal-persona-input-icon">
                  <span className="material-symbols-outlined icon">location_on</span>
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

            <div style={row2Cols}>
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

            <div style={{ ...row2Cols, marginBottom: 0 }}>
              {mode === 'jugador' ? (
                <>
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
                      {posicionesJugador.map((pos) => (
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
                      {estadosJugador.map((est) => (
                        <option key={est.value} value={est.value}>{est.label}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-control">
                    <label className="label py-1">
                      <span>Rol <span className="text-error">*</span></span>
                    </label>
                    <select
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                      className="select select-bordered select-sm w-full"
                      required
                    >
                      <option value="">Seleccionar rol</option>
                      {rolesUsuario.map((rol) => (
                        <option key={rol.value} value={rol.value}>{rol.label}</option>
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
                      {estadosUsuario.map((est) => (
                        <option key={est.value} value={est.value}>{est.label}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="modal-persona-footer">
            <button type="button" className="btn btn-outline btn-error btn-sm" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary btn-sm gap-2">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
              {saveButtonText}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}

ModalPersona.propTypes = ModalPersonaProps

export default ModalPersona
