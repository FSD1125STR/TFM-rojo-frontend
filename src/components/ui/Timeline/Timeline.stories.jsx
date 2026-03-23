import { Timeline } from './Timeline';

export default {
  title: 'UI/Timeline',
  component: Timeline,
};

const EVENTS = [
  { id: 1, minute: 10, side: 'left',   label: 'Gol',            player: 'García, M.' },
  { id: 2, minute: 35, side: 'right',  label: 'Tarjeta amarilla', player: 'López, J.' },
  { id: 3, minute: 45, side: 'system', label: 'Descanso' },
  { id: 4, minute: 67, side: 'left',   label: 'Cambio',         player: 'Martín, P.' },
  { id: 5, minute: 90, side: 'system', label: 'Final' },
];

export const Default = {
  args: {
    title: 'Timeline',
    items: EVENTS,
    getKey: (e) => e.id,
    isSystem: (e) => e.side === 'system',
    isLeft: (e) => e.side === 'left',
    renderMarker: (e) => (
      <span className="relative text-xs font-black text-base-content/40 bg-base-200 px-2">
        {e.minute}&apos;
      </span>
    ),
    renderSlot: (e, align) => (
      <span className={`text-sm font-semibold text-base-content ${align === 'left' ? 'text-right' : 'text-left'}`}>
        {e.player} — {e.label}
      </span>
    ),
    renderSystem: (e) => (
      <div className="flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-3 py-1">
        <span className="text-xs font-bold text-base-content/40 uppercase tracking-wide">{e.label}</span>
      </div>
    ),
    emptyMessage: 'Sin eventos registrados',
  },
};

export const Empty = {
  args: {
    ...Default.args,
    items: [],
  },
};
