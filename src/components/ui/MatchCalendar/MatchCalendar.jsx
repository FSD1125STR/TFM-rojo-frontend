import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import './MatchCalendar.css';
import { MatchCalendarProps } from './MatchCalendar.props';

const LIVE_STATUSES = new Set(['FIRST_HALF', 'HALF_TIME', 'SECOND_HALF']);

const STATUS_STYLES = {
  scheduled: { bg: 'bg-info/10',    text: 'text-info'    },
  finished:  { bg: 'bg-success/10', text: 'text-success' },
  cancelled: { bg: 'bg-error/10',   text: 'text-error'   },
  live:      { bg: 'bg-warning/10', text: 'text-warning' },
};

// Props → nombres de vista de FullCalendar
const FC_VIEW_NAME = {
  month:  'dayGridMonth',
  week:   'timeGridWeek',
  agenda: 'listMonth',
};

function matchToEvent(match) {
  const start = new Date(match.dateTime);
  const end   = new Date(start.getTime() + 90 * 60 * 1000);
  const isLive = LIVE_STATUSES.has(match.liveStatus);

  return {
    id: match._id,
    title: `${match.homeTeamId?.name ?? 'Local'} vs ${match.awayTeamId?.name ?? 'Visitante'}`,
    start: start.toISOString(),
    end:   end.toISOString(),
    // Desactivar estilos inline de FC; los aplica nuestro componente
    backgroundColor: 'transparent',
    borderColor:     'transparent',
    extendedProps: {
      match,
      status: isLive ? 'live' : match.status,
    },
  };
}

function formatTime(date) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// ── Renderizado de evento según vista ──────────────────────────

function renderEventContent(arg) {
  const { match, status } = arg.event.extendedProps;
  const styles  = STATUS_STYLES[status] ?? STATUS_STYLES.scheduled;
  const isLive  = status === 'live';
  const showScore = match.status === 'finished' || isLive;
  const viewType  = arg.view.type;

  // Vista semana — bloque vertical
  if (viewType === 'timeGridWeek') {
    return (
      <div className={`flex flex-col gap-0.5 px-1.5 py-1 rounded h-full w-full overflow-hidden ${styles.bg} ${styles.text}`}>
        <div className="flex items-center gap-1">
          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse shrink-0" />}
          <span className="text-[11px] font-semibold truncate leading-tight">{arg.event.title}</span>
        </div>
        <span className="text-[10px] opacity-70 tabular-nums">
          {formatTime(arg.event.start)}
          {showScore && ` · ${match.homeScore ?? 0}–${match.awayScore ?? 0}`}
        </span>
      </div>
    );
  }

  // Vista agenda (listMonth) — fila con venue
  if (viewType === 'listMonth') {
    return (
      <div className={`flex items-center gap-2 px-2 py-1 rounded w-full ${styles.bg}`}>
        <div className="flex flex-col min-w-0 flex-1">
          <span className={`font-medium text-[12px] truncate ${styles.text}`}>{arg.event.title}</span>
          {match.venue?.name && (
            <span className="text-[10px] text-base-content/40 truncate">{match.venue.name}</span>
          )}
        </div>
        {isLive && (
          <span className="text-[10px] font-bold text-warning animate-pulse shrink-0 uppercase tracking-wide">Live</span>
        )}
        <span className={`text-[11px] tabular-nums shrink-0 ${styles.text} opacity-75`}>
          {showScore ? `${match.homeScore ?? 0}–${match.awayScore ?? 0}` : formatTime(arg.event.start)}
        </span>
      </div>
    );
  }

  // Vista mes (dayGridMonth) — pill de una línea
  return (
    <div className={`flex items-center gap-1 px-1.5 py-[2px] rounded text-[11px] font-medium w-full overflow-hidden ${styles.bg} ${styles.text}`}>
      {isLive && <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse shrink-0" />}
      <span className="truncate min-w-0">{arg.event.title}</span>
      <span className="shrink-0 ml-auto pl-1 opacity-75 tabular-nums whitespace-nowrap">
        {showScore ? `${match.homeScore ?? 0}–${match.awayScore ?? 0}` : formatTime(arg.event.start)}
      </span>
    </div>
  );
}

function enableTodayButton(calendarEl) {
  const btn = calendarEl?.querySelector('.fc-today-button');
  if (btn) btn.disabled = false;
}

export function MatchCalendar({ matches = [], defaultView = 'month', onSelectMatch }) {
  const wrapperRef = React.useRef(null);

  return (
    <div ref={wrapperRef} className="match-calendar-wrapper bg-base-100 rounded-xl border border-base-200 overflow-hidden">
      {/* Leyenda */}
      <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2 border-b border-base-200">
        {Object.entries({ scheduled: 'Programado', finished: 'Finalizado', cancelled: 'Cancelado', live: 'En directo' }).map(([key, label]) => (
          <span
            key={key}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${STATUS_STYLES[key].bg} ${STATUS_STYLES[key].text}`}
          >
            {key === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />}
            {label}
          </span>
        ))}
      </div>

      {/* Calendario */}
      <div className="p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView={FC_VIEW_NAME[defaultView] ?? 'dayGridMonth'}
          locale={esLocale}
          firstDay={1}
          headerToolbar={{
            left:   'prev,next today',
            center: 'title',
            right:  'dayGridMonth,timeGridWeek,listMonth',
          }}
          buttonText={{
            today:  'Hoy',
            month:  'Mes',
            week:   'Semana',
            list:   'Agenda',
          }}
          events={matches.map(matchToEvent)}
          eventContent={renderEventContent}
          eventClick={(info) => onSelectMatch?.(info.event.extendedProps.match)}
          dayMaxEvents={3}
          moreLinkText={(n) => `+${n} más`}
          noEventsText="No hay partidos en este período"
          height="auto"
          datesSet={() => enableTodayButton(wrapperRef.current)}
          viewDidMount={() => enableTodayButton(wrapperRef.current)}
        />
      </div>
    </div>
  );
}

MatchCalendar.propTypes = MatchCalendarProps;
