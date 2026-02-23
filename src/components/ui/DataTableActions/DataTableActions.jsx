import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '../Icon/Icon';
import { DataTableActionsProps } from './DataTableActions.props';

const MENU_WIDTH = 192;

export function DataTableActions({ actions, row, title = 'Acciones' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const visibleActions = actions.filter((action) => !action.show || action.show(row));
  const normalActions = visibleActions.filter((a) => a.variant !== 'danger');
  const dangerActions = visibleActions.filter((a) => a.variant === 'danger');

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + 4, left: rect.right - MENU_WIDTH });
      setIsVisible(false);
    }
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen || !menuRef.current || !buttonRef.current) return;
    const menuRect = menuRef.current.getBoundingClientRect();
    const btnRect = buttonRef.current.getBoundingClientRect();
    if (menuRect.bottom > window.innerHeight - 8) {
      setPosition({
        top: btnRect.top - menuRect.height - 4,
        left: btnRect.right - MENU_WIDTH,
      });
    }
    setIsVisible(true);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const handleAction = (e, action) => {
    e.stopPropagation();
    action.onClick(row);
    setIsOpen(false);
  };

  if (visibleActions.length === 0) return null;

  return (
    <div test-id="el-dta4d5e6">
      <button
        ref={buttonRef}
        test-id="el-dta7f8g9"
        className="btn btn-ghost btn-sm btn-square"
        onClick={handleButtonClick}
      >
        <Icon name="more_vert" size="sm" />
      </button>

      {isOpen && createPortal(
        <ul
          ref={menuRef}
          style={{
            position: 'fixed',
            top: position.top,
            left: position.left,
            zIndex: 9999,
            width: MENU_WIDTH,
            visibility: isVisible ? 'visible' : 'hidden',
          }}
          className="menu bg-base-100 rounded-xl shadow-lg border border-base-300 py-1"
        >
          {title && (
            <li className="menu-title">
              <span className="font-semibold text-sm">{title}</span>
            </li>
          )}

          {normalActions.map((action, index) => (
            <li key={index}>
              <button
                className="flex items-center gap-3 text-sm"
                onClick={(e) => handleAction(e, action)}
              >
                {action.icon && <Icon name={action.icon} size="sm" className="text-base-content/70" />}
                <span>{action.label}</span>
              </button>
            </li>
          ))}

          {dangerActions.length > 0 && normalActions.length > 0 && (
            <div className="divider my-0" />
          )}

          {dangerActions.map((action, index) => (
            <li key={index}>
              <button
                className="flex items-center gap-3 text-sm text-error hover:bg-error/10"
                onClick={(e) => handleAction(e, action)}
              >
                {action.icon && <Icon name={action.icon} size="sm" />}
                <span>{action.label}</span>
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )}
    </div>
  );
}

DataTableActions.propTypes = DataTableActionsProps;

export default DataTableActions;
