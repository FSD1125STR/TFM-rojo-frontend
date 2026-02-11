import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '../Icon/Icon'

export function DataTableActions({ actions, row, title = 'Acciones' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef(null)
  const menuRef = useRef(null)

  const visibleActions = actions.filter(action =>
    !action.show || action.show(row)
  )

  // Calcular posición del menú
  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const menuHeight = 250 // Altura aproximada del menú
      const spaceBelow = window.innerHeight - rect.bottom

      // Si no hay espacio abajo, mostrar arriba
      if (spaceBelow < menuHeight && rect.top > menuHeight) {
        setPosition({
          top: rect.top - 8,
          left: rect.right - 192, // 192px = w-48
          openUp: true
        })
      } else {
        setPosition({
          top: rect.bottom + 8,
          left: rect.right - 192,
          openUp: false
        })
      }
    }
  }

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('scroll', handleScroll, true)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
    }
  }, [isOpen])

  const handleToggle = (e) => {
    e.stopPropagation()
    if (!isOpen) {
      updatePosition()
    }
    setIsOpen(!isOpen)
  }

  const handleAction = (e, action) => {
    e.stopPropagation()
    action.onClick(row)
    setIsOpen(false)
  }

  if (visibleActions.length === 0) return null

  // Separar acciones normales de las danger
  const normalActions = visibleActions.filter(a => a.variant !== 'danger')
  const dangerActions = visibleActions.filter(a => a.variant === 'danger')

  return (
    <div test-id="el-dta4d5e6" className="relative mr-2.5">
      <button
        ref={buttonRef}
        test-id="el-dta7f8g9"
        className="btn btn-ghost btn-sm btn-square"
        onClick={handleToggle}
      >
        <Icon name="more_vert" size="sm" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bg-base-100 rounded-xl shadow-lg w-48 overflow-hidden border border-base-300"
          style={{
            top: position.openUp ? 'auto' : position.top,
            bottom: position.openUp ? window.innerHeight - position.top : 'auto',
            left: position.left,
            zIndex: 99999,
          }}
        >
          {/* Header */}
          {title && (
            <div className="px-4 py-2.5 border-b border-base-200 bg-base-100">
              <span className="font-semibold text-sm text-base-content">{title}</span>
            </div>
          )}

          {/* Acciones normales */}
          {normalActions.length > 0 && (
            <ul className="menu p-2 gap-0.5">
              {normalActions.map((action, index) => (
                <li key={index}>
                  <a
                    className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-base-200 transition-colors cursor-pointer"
                    onClick={(e) => handleAction(e, action)}
                  >
                    {action.icon && (
                      <Icon name={action.icon} size="sm" className="text-base-content/70" />
                    )}
                    <span>{action.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Separador y acciones danger */}
          {dangerActions.length > 0 && (
            <>
              {normalActions.length > 0 && (
                <div className="border-t border-base-200 mx-2"></div>
              )}
              <ul className="menu p-2 gap-0.5">
                {dangerActions.map((action, index) => (
                  <li key={index}>
                    <a
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-error hover:bg-error/10 transition-colors cursor-pointer"
                      onClick={(e) => handleAction(e, action)}
                    >
                      {action.icon && (
                        <Icon name={action.icon} size="sm" />
                      )}
                      <span>{action.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}

DataTableActions.propTypes = {
  /** Array de acciones disponibles */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      /** Texto de la acción */
      label: PropTypes.string.isRequired,
      /** Nombre del icono (Material Symbols) */
      icon: PropTypes.string,
      /** Función a ejecutar al hacer clic */
      onClick: PropTypes.func.isRequired,
      /** Variante de estilo: 'default' o 'danger' (rojo) */
      variant: PropTypes.oneOf(['default', 'danger']),
      /** Función para mostrar/ocultar la acción según la fila */
      show: PropTypes.func,
    })
  ).isRequired,
  /** Datos de la fila actual */
  row: PropTypes.object.isRequired,
  /** Título del dropdown (por defecto: 'Acciones') */
  title: PropTypes.string,
}

export default DataTableActions
