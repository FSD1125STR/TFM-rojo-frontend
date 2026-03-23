import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import { getMyNotifications, markAsRead, markAllAsRead as markAllAsReadApi } from '../services/notificationsService';
import { showNotification } from '../utils/alerts';

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const socketRef = useRef(null);

  const loadNotifications = useCallback(async () => {
    try {
      const data = await getMyNotifications();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    } catch (err) {
      console.error('Error al cargar notificaciones:', err);
    }
  }, []);

  useEffect(() => {
    if (!user || !token) return;

    loadNotifications();

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    const socketUrl = apiUrl.replace(/\/api\/?$/, '');
    console.log('[Socket] Connecting to', socketUrl);
    const socket = io(socketUrl, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('[Socket] Connection error:', err.message);
    });

    socket.on('callup:updated', (payload) => {
      if (payload.triggeredBy?.id === user.id) return;

      const newNotif = {
        _id: payload.notificationId || `temp-${Date.now()}`,
        message: payload.message,
        type: payload.type,
        read: false,
        createdAt: payload.createdAt,
        matchId: payload.matchId,
        categoryName: payload.categoryName,
      };

      setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
      setUnreadCount((prev) => prev + 1);

      showNotification(payload.message, {
        categoryName: payload.categoryName,
        onClick: () => { if (payload.matchId) navigate(`/convocatorias/${payload.matchId}`); },
      });
    });

    socket.on('match:live', (payload) => {
      if (payload.triggeredBy?.id === user.id) return;
      if (location.pathname === `/partidos/${payload.matchId}/live`) return;

      const newNotif = {
        _id: `temp-${Date.now()}`,
        message: payload.message,
        type: payload.type,
        read: false,
        createdAt: payload.createdAt,
        matchId: payload.matchId,
        categoryName: payload.categoryName,
      };

      setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
      setUnreadCount((prev) => prev + 1);

      showNotification(payload.message, {
        categoryName: payload.categoryName,
        onClick: () => { if (payload.matchId) navigate(`/partidos/${payload.matchId}/live`); },
      });
    });

    socket.on('match:event', (payload) => {
      // No mostrar toast si el usuario está viendo ese partido en directo
      if (location.pathname === `/partidos/${payload.matchId}/live`) return;

      const newNotif = {
        _id: `temp-${Date.now()}`,
        message: payload.message,
        type: payload.type,
        read: false,
        createdAt: payload.createdAt,
        matchId: payload.matchId,
        categoryName: payload.categoryName,
      };

      setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
      setUnreadCount((prev) => prev + 1);

      showNotification(payload.message, {
        categoryName: payload.categoryName,
        onClick: () => { if (payload.matchId) navigate(`/partidos/${payload.matchId}/live`); },
      });
    });

    socket.on('reconnect', () => {
      loadNotifications();
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [user, token, loadNotifications]);

  const markRead = useCallback(async (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));

    try {
      await markAsRead(notificationId);
    } catch (err) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: false } : n))
      );
      setUnreadCount((prev) => prev + 1);
      console.error('Error al marcar notificación como leída:', err);
    }
  }, []);

  const markAllRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await markAllAsReadApi();
    } catch (err) {
      console.error('Error al marcar todas como leídas:', err);
    }
  }, []);

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markRead, markAllRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications debe usarse dentro de un NotificationsProvider');
  return context;
}
