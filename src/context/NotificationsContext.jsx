import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';
import { getMyNotifications, markAsRead, markAllAsRead as markAllAsReadApi } from '../services/notificationsService';
import { showNotification, showError, getApiErrorMsg } from '../utils/alerts';
import { NotificationsContext } from './NotificationsContext.js';

export function NotificationsProvider({ children }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateRef = useRef(navigate);
  const pathnameRef = useRef(location.pathname);
  const [notifications, setNotifications] = useState([]);
  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const socketRef = useRef(null);

  useEffect(() => { navigateRef.current = navigate; }, [navigate]);
  useEffect(() => { pathnameRef.current = location.pathname; }, [location.pathname]);

  const loadNotifications = useCallback(async () => {
    try {
      const data = await getMyNotifications();
      setNotifications(data);
    } catch (err) {
      showError(getApiErrorMsg(err, 'Error al cargar notificaciones'));
    }
  }, []);

  useEffect(() => {
    if (!user || !token) return;

    loadNotifications();

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    const socketUrl = apiUrl.replace(/\/api\/?$/, '');
    const socket = io(socketUrl, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('connect_error', () => {});

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

      showNotification(payload.message, {
        type: payload.type,
        categoryName: payload.categoryName,
        onClick: () => { if (payload.matchId) navigateRef.current(`/convocatorias/${payload.matchId}`); },
      });
    });

    socket.on('match:live', (payload) => {
      if (payload.triggeredBy?.id === user.id) return;
      if (pathnameRef.current === `/directo/${payload.matchId}`) return;

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

      showNotification(payload.message, {
        type: payload.type,
        categoryName: payload.categoryName,
        onClick: () => { if (payload.matchId) navigateRef.current(`/directo/${payload.matchId}`); },
      });
    });

    socket.on('match:event', (payload) => {
      if (payload.triggeredBy?.id === user.id) return;
      // No mostrar toast si el usuario está viendo ese partido en directo
      if (pathnameRef.current === `/directo/${payload.matchId}`) return;

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

      showNotification(payload.message, {
        type: payload.type,
        categoryName: payload.categoryName,
        onClick: () => { if (payload.matchId) navigateRef.current(`/directo/${payload.matchId}`); },
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

    try {
      await markAsRead(notificationId);
    } catch (err) {
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: false } : n))
      );
      showError('No se pudo marcar la notificación como leída');
    }
  }, []);

  const markAllRead = useCallback(async () => {
    const prev = notifications;
    setNotifications((n) => n.map((item) => ({ ...item, read: true })));
    try {
      await markAllAsReadApi();
    } catch (err) {
      setNotifications(prev);
      showError('No se pudieron marcar todas las notificaciones como leídas');
    }
  }, [notifications]);

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markRead, markAllRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

