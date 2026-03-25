import { Timeline } from '../../../components/ui/Timeline';

const EVENT_LABELS = {
  goal:         'Gol',
  yellow_card:  'Tarjeta amarilla',
  red_card:     'Tarjeta roja',
  substitution: 'Cambio',
  half_time:    'Descanso',
  full_time:    'Final del partido',
};

function EventIcon({ type }) {
  if (type === 'yellow_card') {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/15 shrink-0">
        <span className="w-3 h-4 rounded-sm bg-warning inline-block" />
      </div>
    );
  }
  if (type === 'red_card') {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error/15 shrink-0">
        <span className="w-3 h-4 rounded-sm bg-error inline-block" />
      </div>
    );
  }
  if (type === 'goal') {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 shrink-0">
        <span className="material-symbols-outlined text-[18px] text-success">sports_soccer</span>
      </div>
    );
  }
  if (type === 'substitution') {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-info/15 shrink-0">
        <span className="material-symbols-outlined text-[18px] text-info">swap_vert</span>
      </div>
    );
  }
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-base-300 shrink-0">
      <span className="material-symbols-outlined text-[16px] text-base-content/40">pause_circle</span>
    </div>
  );
}

function EventContent({ event, align }) {
  const label = EVENT_LABELS[event.type] ?? event.type;
  const isRight = align === 'right';

  if (event.type === 'substitution') {
    return (
      <div className={`flex flex-col min-w-0 ${isRight ? 'items-end text-right' : ''}`}>
        <span className="text-sm font-bold text-base-content truncate">{event.playerInName ?? '—'}</span>
        <span className="text-xs text-base-content/50">{label}</span>
        {event.playerOutName && (
          <span className="text-xs text-error/70 truncate">Sale: {event.playerOutName}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col min-w-0 ${isRight ? 'items-end text-right' : ''}`}>
      <span className="text-sm font-bold text-base-content truncate">{event.playerName ?? '—'}</span>
      <span className="text-xs text-base-content/50">{label}</span>
    </div>
  );
}

export function MatchTimeline({ timeline, match }) {
  return (
    <Timeline
      title="Timeline"
      className="shadow-md"
      items={timeline ?? []}
      getKey={(_, i) => i}
      isSystem={(e) => e.type === 'half_time' || e.type === 'full_time' || e.type === 'match_start'}
      isLeft={(e) => !!(e.teamId && e.teamId === match.homeTeam.id)}
      renderMarker={(e) => (
        <span className="relative text-xs font-black text-base-content/40 bg-base-200 px-2">
          {e.minute}
          <span className="absolute left-full text-xs font-black text-base-content/40">&apos;</span>
        </span>
      )}
      renderSlot={(e, align) =>
        align === 'left' ? (
          <>
            <EventContent event={e} align="right" />
            <EventIcon type={e.type} />
          </>
        ) : (
          <>
            <EventIcon type={e.type} />
            <EventContent event={e} align="left" />
          </>
        )
      }
      renderSystem={(e) => (
        <div className="flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-3 py-1">
          <EventIcon type={e.type} />
          <span className="text-xs font-bold text-base-content/40 uppercase tracking-wide">
            {e.type === 'match_start' ? 'Inicio' : e.type === 'half_time' ? 'Descanso' : `Final · ${e.minute}'`}
          </span>
        </div>
      )}
      emptyMessage="Sin eventos registrados"
    />
  );
}
