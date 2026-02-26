import { useRef, useEffect, useId } from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { ModalProps } from './Modal.props';

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-3xl min-w-[600px] max-md:min-w-0',
};

export function Modal({
  isOpen = false,
  onClose,
  title,
  subtitle,
  icon,
  size = 'md',
  actions,
  children,
  className = '',
}) {
  const modalRef = useRef(null);
  const titleId = useId();
  const subtitleId = useId();

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose?.();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose?.();
    }
  };

  return (
    <dialog
      test-id="el-m0d4l1b2"
      ref={modalRef}
      className={`modal ${className}`}
      onClick={handleBackdropClick}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={subtitle ? subtitleId : undefined}
    >
      <div className={`modal-box ${sizeClasses[size] || sizeClasses.md} w-[95%] p-0 rounded-2xl overflow-visible`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 bg-base-200/50 rounded-t-2xl overflow-hidden">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-md">
                  <Icon name={icon} className="text-primary-content text-2xl" />
                </div>
              )}
              <div>
                <h3 id={titleId} className="text-lg font-bold">{title}</h3>
                {subtitle && <p id={subtitleId} className="text-xs text-base-content/60">{subtitle}</p>}
              </div>
            </div>
            <IconButton icon="close" size="sm" ariaLabel="Cerrar" onClick={() => onClose?.()} />
          </div>
        )}

        <div className="px-6 py-4">
          {children}
        </div>

        {actions && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-base-300 bg-base-200/30 rounded-b-2xl overflow-hidden">
            {actions}
          </div>
        )}
      </div>
    </dialog>
  );
}

Modal.propTypes = ModalProps;
