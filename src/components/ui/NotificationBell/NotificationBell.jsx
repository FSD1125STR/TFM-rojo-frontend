import { useRef, useState, useEffect } from 'react';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import { NotificationBellProps } from './NotificationBell.props';

function formatDate(createdAt) {
  if (!createdAt) return '';
  return new Date(createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function NotificationBell({
  notifications = [],
  unreadCount = 0,
  onNotificationClick = () => {},
  onMarkAllRead = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleMouseDown(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <div test-id="el-n7b2k1p9" ref={wrapperRef} className="relative">
      <div className="relative inline-block">
        <IconButton
          icon="notifications"
          ariaLabel="Abrir notificaciones"
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-primary text-primary-content text-[10px] font-bold leading-none pointer-events-none">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-base-100 border border-base-300 rounded-box shadow-lg z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-base-300">
            <span className="font-semibold text-sm">Notificaciones</span>
            <button className="btn btn-ghost btn-xs" onClick={onMarkAllRead}>
              Marcar todo leído
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-base-content/50">
                <Icon name="notifications_off" size="lg" />
                <p className="text-sm mt-2">Sin notificaciones</p>
              </div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n._id}
                  className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-base-200 text-left transition-colors cursor-pointer ${n.read ? 'opacity-60' : ''}`}
                  onClick={() => { onNotificationClick(n); setIsOpen(false); }}
                >
                  <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${n.read ? 'bg-transparent' : 'bg-primary'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">{n.message}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {n.categoryName && (
                        <span className="text-xs font-medium text-primary/70">{n.categoryName}</span>
                      )}
                      <p className="text-xs text-base-content/50">{formatDate(n.createdAt)}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

NotificationBell.propTypes = NotificationBellProps;
