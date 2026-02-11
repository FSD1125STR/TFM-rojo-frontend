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

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const menuHeight = 250
      const spaceBelow = window.innerHeight - rect.bottom

      if (spaceBelow < menuHeight && rect.top > menuHeight) {
        setPosition({
          top: rect.top - 8,
          left: rect.right - 192,
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
          {title && (
            <div className="px-4 py-2.5 border-b border-base-200 bg-base-100">
              <span className="font-semibold text-sm text-base-content">{title}</span>
            </div>
          )}

          {normalActions.length > 0 && (
            <div className="py-1">
              {normalActions.map((action, index) => (
                <a
                  key={index}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200 transition-colors cursor-pointer"
                  onClick={(e) => handleAction(e, action)}
                >
                  {action.icon && (
                    <Icon name={action.icon} size="sm" className="text-base-content/70" />
                  )}
                  <span>{action.label}</span>
                </a>
              ))}
            </div>
          )}

          {dangerActions.length > 0 && (
            <>
              {normalActions.length > 0 && (
                <div className="border-t border-base-200"></div>
              )}
              <div className="py-1">
                {dangerActions.map((action, index) => (
                  <a
                    key={index}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors cursor-pointer"
                    onClick={(e) => handleAction(e, action)}
                  >
                    {action.icon && (
                      <Icon name={action.icon} size="sm" />
                    )}
                    <span>{action.label}</span>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

DataTableActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
      show: PropTypes.func,
    })
  ).isRequired,
  row: PropTypes.object.isRequired,
  title: PropTypes.string,
}

export default DataTableActions
