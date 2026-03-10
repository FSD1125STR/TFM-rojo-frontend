import { NotificationBell } from './NotificationBell';

const now = Date.now();

const mockNotifs = [
  { _id: '1', message: 'Convocatoria guardada — J12: Barça B vs Valencia B', type: 'CALLUP_SAVED', read: false, createdAt: new Date(now - 5 * 60000).toISOString(), matchId: 'm1' },
  { _id: '2', message: 'Convocatoria creada — J11: Barça B vs Español B', type: 'CALLUP_CREATED', read: true, createdAt: new Date(now - 3600000).toISOString(), matchId: 'm2' },
  { _id: '3', message: 'Convocatoria guardada — J10: Girona B vs Barça B', type: 'CALLUP_SAVED', read: false, createdAt: new Date(now - 2 * 3600000).toISOString(), matchId: 'm3' },
  { _id: '4', message: 'Convocatoria creada — J9: Barça B vs Espanyol B', type: 'CALLUP_CREATED', read: true, createdAt: new Date(now - 24 * 3600000).toISOString(), matchId: 'm4' },
  { _id: '5', message: 'Convocatoria guardada — J8: Barça B vs Lleida FC', type: 'CALLUP_SAVED', read: false, createdAt: new Date(now - 30 * 60000).toISOString(), matchId: 'm5' },
];

const allUnread = Array.from({ length: 10 }, (_, i) => ({
  _id: String(i + 1),
  message: `Convocatoria guardada — J${12 - i}: Barça B vs Rival ${i + 1}`,
  type: 'CALLUP_SAVED',
  read: false,
  createdAt: new Date(now - i * 600000).toISOString(),
  matchId: `m${i + 1}`,
}));

export default {
  title: 'UI/NotificationBell',
  component: NotificationBell,
  argTypes: {
    unreadCount: { control: { type: 'number', min: 0, max: 99 } },
    onMarkRead: { action: 'onMarkRead' },
    onMarkAllRead: { action: 'onMarkAllRead' },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-end p-8">
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  name: 'Sin notificaciones',
  args: {
    notifications: [],
    unreadCount: 0,
  },
};

export const ConNotificaciones = {
  name: 'Con notificaciones (3 sin leer)',
  args: {
    notifications: mockNotifs,
    unreadCount: 3,
  },
};

export const TodasSinLeer = {
  name: 'Todas sin leer (10)',
  args: {
    notifications: allUnread,
    unreadCount: 10,
  },
};
