import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../../../components/ui/Icon';
import { Button } from '../../../../components/ui/Button';
import { LiveMatchTimelineProps } from './LiveMatchTimeline.props';

const EVENT_ICON = {
  goal: { name: 'sports_soccer', className: 'text-success' },
  yellow_card: { name: 'square', className: 'text-yellow-400' },
  red_card: { name: 'square', className: 'text-red-500' },
  substitution: { name: 'swap_horiz', className: 'text-info' },
  half_time: { name: 'timer_pause', className: 'text-base-content' },
  full_time: { name: 'flag', className: 'text-base-content' },
};

function EventDescription({ event }) {
  if (event.type === 'substitution') {
    const outName = event.playerOutId?.fullName || event.playerOut || 'Desconocido';
    const inName = event.playerInId?.fullName || event.playerIn || 'Desconocido';
    return (
      <span>
        <span className="text-error">Sale: {outName}</span>
        {' '}
        <span className="text-success">Entra: {inName}</span>
      </span>
    );
  }
  const playerName = event.playerId?.fullName || event.player || 'Desconocido';
  return <span>{playerName}</span>;
}

export function LiveMatchTimeline({ events, isLoading }) {
  const bottomRef = useRef(null);
  const listRef = useRef(null);
  const [unseenCount, setUnseenCount] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setIsAtBottom(atBottom);
    if (atBottom) setUnseenCount(0);
  };

  useEffect(() => {
    if (events.length === 0) return;
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setUnseenCount((n) => n + 1);
    }
  }, [events.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setUnseenCount(0);
    setIsAtBottom(true);
  };

  if (isLoading) {
    return (
      <div test-id="el-tm9c6b0e" className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div test-id="el-tm9c6b0e" className="flex flex-col items-center gap-3 py-10 text-base-content/40">
        <Icon name="sports_soccer" size="lg" />
        <p className="text-sm">Sin eventos registrados</p>
      </div>
    );
  }

  return (
    <div test-id="el-tm9c6b0e" className="relative">
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1"
      >
        {events.map((event, idx) => {
          const iconCfg = EVENT_ICON[event.type] || { name: 'event', className: '' };
          return (
            <div
              key={event._id || idx}
              className="flex items-start gap-3 bg-base-200 rounded-xl px-4 py-3"
            >
              <span className="text-sm font-bold text-base-content/50 w-8 shrink-0 pt-0.5">
                {event.minute !== undefined ? `${event.minute}'` : '–'}
              </span>
              <Icon name={iconCfg.name} size="sm" className={`mt-0.5 ${iconCfg.className}`} />
              <span className="text-sm text-base-content">
                <EventDescription event={event} />
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {!isAtBottom && unseenCount > 0 && (
        <div className="sticky bottom-4 flex justify-center mt-2">
          <Button variant="primary" size="sm" onClick={scrollToBottom} className="shadow-lg gap-1">
            <Icon name="keyboard_double_arrow_down" size="sm" />
            Ir al último ({unseenCount})
          </Button>
        </div>
      )}
    </div>
  );
}

LiveMatchTimeline.propTypes = LiveMatchTimelineProps;
