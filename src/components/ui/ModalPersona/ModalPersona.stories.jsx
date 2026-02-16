import { useState } from 'react'
import { ModalPersona } from './ModalPersona'

export default {
  title: 'UI/ModalPersona',
  component: ModalPersona,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Modal reutilizable para crear y editar jugadores o usuarios del sistema.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['jugador', 'usuario'],
      description: 'Tipo de persona a gestionar',
      table: {
        defaultValue: { summary: 'jugador' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Controla si el modal está abierto',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: 'Título personalizado del modal (opcional)',
    },
    initialData: {
      control: 'object',
      description: 'Datos iniciales para edición',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback al cerrar el modal',
    },
    onSave: {
      action: 'onSave',
      description: 'Callback al guardar (recibe los datos del formulario)',
    },
  },
}

const NuevoTemplate = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false)

  return (
    <div className="min-h-screen p-8" style={{ background: 'oklch(98% 0.02 175)' }}>
      <button
        className="btn btn-primary gap-2"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-symbols-outlined">add</span>
        {args.mode === 'usuario' ? 'Nuevo Usuario' : 'Nuevo Jugador'}
      </button>

      <ModalPersona
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          args.onClose?.()
        }}
        onSave={(data) => {
          console.log('Datos guardados:', data)
          args.onSave?.(data)
          setIsOpen(false)
        }}
      />
    </div>
  )
}

const EditarTemplate = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false)

  return (
    <div className="min-h-screen p-8" style={{ background: 'oklch(98% 0.02 175)' }}>
      <button
        className="btn btn-primary gap-2"
        onClick={() => setIsOpen(true)}
      >
        <span className="material-symbols-outlined">edit</span>
        {args.mode === 'usuario' ? 'Editar Usuario' : 'Editar Jugador'}
      </button>

      <ModalPersona
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          args.onClose?.()
        }}
        onSave={(data) => {
          console.log('Datos guardados:', data)
          args.onSave?.(data)
          setIsOpen(false)
        }}
      />
    </div>
  )
}

export const NuevoJugador = NuevoTemplate.bind({})
NuevoJugador.args = {
  mode: 'jugador',
  isOpen: true,
  initialData: null,
}

export const NuevoUsuario = NuevoTemplate.bind({})
NuevoUsuario.args = {
  mode: 'usuario',
  isOpen: true,
  initialData: null,
}

export const EditarJugador = EditarTemplate.bind({})
EditarJugador.args = {
  mode: 'jugador',
  isOpen: true,
  initialData: {
    nombre: 'Carlos',
    apellidos: 'Rodríguez Martínez',
    fechaNacimiento: '2010-03-15',
    email: 'carlos.rodriguez@email.com',
    telefono: '+34 666 777 888',
    direccion: 'Calle Mayor 123',
    ciudad: 'Madrid',
    provincia: 'Madrid',
    dorsal: 10,
    posicion: 'Delantero',
    estado: 'Disponible',
  },
}

export const EditarUsuario = EditarTemplate.bind({})
EditarUsuario.args = {
  mode: 'usuario',
  isOpen: true,
  initialData: {
    nombre: 'Juan',
    apellidos: 'Pérez García',
    fechaNacimiento: '1980-05-20',
    email: 'juan.perez@footmind.com',
    telefono: '+34 600 123 456',
    direccion: 'Av. Principal 45',
    ciudad: 'Barcelona',
    provincia: 'Barcelona',
    rol: 'Entrenador',
    estado: 'Activo',
  },
}

export const Interactivo = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  const [savedData, setSavedData] = useState(null)
  const isEditing = args.initialData !== null

  return (
    <div className="min-h-screen p-8" style={{ background: 'oklch(98% 0.02 175)' }}>
      <div className="flex items-center gap-4 mb-6">
        <button
          className="btn btn-primary gap-2"
          onClick={() => setIsOpen(true)}
        >
          <span className="material-symbols-outlined">{isEditing ? 'edit' : 'add'}</span>
          {isEditing
            ? (args.mode === 'usuario' ? 'Editar Usuario' : 'Editar Jugador')
            : (args.mode === 'usuario' ? 'Nuevo Usuario' : 'Nuevo Jugador')
          }
        </button>
      </div>

      {savedData && (
        <div className="p-4 rounded-lg max-w-2xl" style={{ background: 'oklch(92% 0.12 155 / 0.15)' }}>
          <h4 className="font-semibold mb-2 flex items-center gap-2" style={{ color: 'oklch(35% 0.12 145)' }}>
            <span className="material-symbols-outlined">check_circle</span>
            Datos guardados:
          </h4>
          <pre className="text-xs overflow-auto max-h-64 p-3 bg-white rounded-lg">
            {JSON.stringify(savedData, null, 2)}
          </pre>
        </div>
      )}

      <ModalPersona
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={(data) => {
          setSavedData(data)
          setIsOpen(false)
        }}
      />
    </div>
  )
}
Interactivo.args = {
  mode: 'jugador',
  initialData: null,
}
