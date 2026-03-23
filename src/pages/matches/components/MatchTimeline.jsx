import { Card } from '../../../components/ui/Card';

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

function EventContent({ event, align = 'left' }) {
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
  if (!timeline?.length) {
    return (
      <Card test-id="el-b5c6d7e8" title="Timeline" className="shadow-md">
        <p className="text-sm text-base-content/50 text-center py-6">Sin eventos registrados</p>
      </Card>
    );
  }

  return (
    <Card test-id="el-b5c6d7e8" title="Timeline" className="shadow-md">
      <div className="relative flex flex-col gap-1">
        {/* Línea vertical central */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-base-300 z-0 pointer-events-none" />

        {timeline.map((event, i) => {
          const isSystem = event.type === 'half_time' || event.type === 'full_time';
          const isLocal = event.teamId && event.teamId === match.homeTeam.id;

          if (isSystem) {
            return (
              <div key={i} className="relative z-10 flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-base-300" />
                <div className="flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-3 py-1">
                  <EventIcon type={event.type} />
                  <span className="text-xs font-bold text-base-content/40 uppercase tracking-wide">
                    {event.type === 'half_time' ? 'Descanso' : `Final · ${event.minute}'`}
                  </span>
                </div>
                <div className="flex-1 h-px bg-base-300" />
              </div>
            );
          }

          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_2rem_1fr] items-center gap-x-2 px-1 py-1.5 rounded-xl hover:bg-base-200/50 transition-colors"
            >
              {/* Columna izquierda — equipo local */}
              <div className="flex items-center justify-end gap-2 min-w-0">
                {isLocal && (
                  <>
                    <EventContent event={event} align="right" />
                    <EventIcon type={event.type} />
                  </>
                )}
              </div>

              {/* Centro — minuto (fondo para tapar la línea vertical) */}
              <div className="relative z-10 flex items-center justify-center">
                <span className="relative text-xs font-black text-base-content/40 bg-base-200 px-2">
                  {event.minute}
                  <span className="absolute left-full text-xs font-black text-base-content/40">&apos;</span>
                </span>
              </div>

              {/* Columna derecha — equipo visitante */}
              <div className="flex items-center justify-start gap-2 min-w-0">
                {!isLocal && event.teamId && (
                  <>
                    <EventIcon type={event.type} />
                    <EventContent event={event} align="left" />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
