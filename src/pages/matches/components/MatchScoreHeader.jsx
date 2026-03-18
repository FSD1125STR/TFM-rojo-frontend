import { useState, useRef } from 'react';
import { Card } from '../../../components/ui/Card';
import { statusLabels } from '../data/matchesConfig';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

function formatTime(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function getShort(name) {
  if (!name) return '?';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name.slice(0, 2).toUpperCase();
  return words.map((w) => w[0]).join('').slice(0, 3).toUpperCase();
}

const STATUS_CONFIG = {
  scheduled: { icon: 'schedule'     },
  finished:  { icon: 'check_circle' },
  cancelled: { icon: 'cancel'       },
};

const RESULT_CONFIG = {
  win:  { badge: 'bg-[var(--result-win)]  text-[var(--result-win-text)]',  label: 'Victoria', icon: 'emoji_events'    },
  draw: { badge: 'bg-[var(--result-draw)] text-[var(--result-draw-text)]', label: 'Empate',   icon: 'equal'           },
  loss: { badge: 'bg-[var(--result-loss)] text-[var(--result-loss-text)]', label: 'Derrota',  icon: 'close'           },
};

function TeamShield({ logoUrl, name, variant }) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={name}
        className="h-14 w-14 object-contain shrink-0"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    );
  }
  return (
    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-${variant} text-${variant}-content text-sm font-black shadow-md`}>
      {getShort(name)}
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center gap-1 text-[9px] font-bold text-base-content/50 uppercase tracking-wider shrink-0">
        <span className="material-symbols-outlined text-[11px]">{icon}</span>{label}
      </span>
      <span className="text-xs font-semibold text-base-content truncate">{value}</span>
    </div>
  );
}

function InfoItemButton({ icon, label, value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 cursor-pointer hover:opacity-70 transition-opacity"
    >
      <span className="flex items-center gap-1 text-[9px] font-bold text-base-content/50 uppercase tracking-wider shrink-0">
        <span className="material-symbols-outlined text-[11px]">{icon}</span>{label}
      </span>
      <span className="flex items-center gap-0.5 text-xs font-semibold text-base-content truncate">
        {value}
        <span className="material-symbols-outlined text-[11px] text-base-content/40">open_in_new</span>
      </span>
    </button>
  );
}

function VenueMap({ lat, lng, className = '' }) {
  const delta = 0.02;
  const bbox  = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src   = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&mlat=${lat}&mlon=${lng}`;
  const href  = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;

  return (
    <div className={`relative rounded-lg overflow-hidden border border-base-300 bg-base-200 ${className}`}>
      <iframe
        title="Mapa del campo"
        src={src}
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-1.5 right-1.5 bg-base-100/90 border border-base-300 rounded-md px-2 py-0.5 text-[10px] font-medium text-base-content/60 hover:text-base-content transition-colors"
      >
        Ver en mapa ↗
      </a>
    </div>
  );
}

export function MatchScoreHeader({ match }) {
  const [mapOpen, setMapOpen] = useState(false);
  const dialogRef = useRef(null);

  const statusCfg = STATUS_CONFIG[match.status] ?? STATUS_CONFIG.finished;

  const isWin  = match.homeTeam.isOurTeam
    ? match.score.home > match.score.away
    : match.score.away > match.score.home;
  const isDraw = match.score.home === match.score.away;
  const result = isDraw ? 'draw' : isWin ? 'win' : 'loss';
  const cfg    = RESULT_CONFIG[result];

  const homeWins = match.score.home > match.score.away;
  const awayWins = match.score.away > match.score.home;

  const hasMap   = match.venue?.lat && match.venue?.lng;
  const hasVenue = match.venue?.displayName;

  function openMap() {
    setMapOpen(true);
    dialogRef.current?.showModal();
  }

  function closeMap() {
    setMapOpen(false);
    dialogRef.current?.close();
  }

  return (
    <>
      <Card padding="none" className="shadow-md">

        {/* Barra superior: estado | resultado */}
        <div className="px-5 py-4 flex justify-center">
          <span className="flex items-center rounded-full border border-base-300 overflow-hidden shadow-md text-[10px] font-bold">
            <span className="flex items-center justify-center gap-0.5 px-2.5 py-0.5 w-24 text-base-content/60">
              <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'wght' 200" }}>{statusCfg.icon}</span>
              {statusLabels[match.status]}
            </span>
            <span className="w-px self-stretch bg-base-300" />
            <span className={`flex items-center justify-center gap-0.5 px-2.5 py-0.5 w-24 ${cfg.badge}`}>
              <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'wght' 200" }}>{cfg.icon}</span>
              {cfg.label}
            </span>
          </span>
        </div>

        {/* Zona central: equipos + marcador */}
        <div className="px-5 py-5 pb-8 flex items-center justify-center gap-8">

          {/* Equipo local */}
          <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
            <div className="text-right min-w-0">
              <p className="text-base font-bold text-base-content leading-tight truncate">{match.homeTeam.name}</p>
              <p className="text-[10px] text-base-content/40 uppercase tracking-wider">(Local)</p>
            </div>
            <TeamShield logoUrl={match.homeTeam.logoUrl} name={match.homeTeam.name} variant="primary" />
          </div>

          {/* Marcador */}
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-5xl font-black tabular-nums leading-none ${homeWins || isDraw ? 'text-base-content' : 'text-base-content/25'}`}>
              {match.score.home}
            </span>
            <span className="text-2xl font-bold text-base-content/30 leading-none">-</span>
            <span className={`text-5xl font-black tabular-nums leading-none ${awayWins || isDraw ? 'text-base-content' : 'text-base-content/25'}`}>
              {match.score.away}
            </span>
          </div>

          {/* Equipo visitante */}
          <div className="flex items-center gap-3 flex-1 min-w-0 justify-start">
            <TeamShield logoUrl={match.awayTeam.logoUrl} name={match.awayTeam.name} variant="error" />
            <div className="text-left min-w-0">
              <p className="text-base font-bold text-base-content leading-tight truncate">{match.awayTeam.name}</p>
              <p className="text-[10px] text-base-content/40 uppercase tracking-wider">(Visitante)</p>
            </div>
          </div>

        </div>

        {/* Franja inferior: meta info */}
        <div className="border-t border-base-300" />
        <div className="bg-base-300 px-4 py-3 flex items-center justify-center gap-4 flex-wrap rounded-b-xl">
          <InfoItem icon="calendar_month" label="Fecha"     value={formatDate(match.dateTime)} />
          <span className="w-px h-6 bg-base-300 shrink-0" />
          <InfoItem icon="schedule"       label="Hora"      value={formatTime(match.dateTime)} />
          <span className="w-px h-6 bg-base-300 shrink-0" />
          <InfoItem icon="category"       label="Categoría" value={match.category?.name ?? '—'} />
          <span className="w-px h-6 bg-base-300 shrink-0" />
          <InfoItem icon="tag"            label="Jornada"   value={`J${match.journey} · ${match.season}`} />
          <span className="w-px h-6 bg-base-300 shrink-0" />
          {hasVenue ? (
            <InfoItemButton
              icon="location_on"
              label="Campo"
              value={match.venue.displayName}
              onClick={openMap}
            />
          ) : (
            <InfoItem icon="location_on" label="Campo" value="Sin asignar" />
          )}
        </div>

      </Card>

      {/* Modal mapa */}
      <dialog ref={dialogRef} className="modal" onClose={closeMap}>
        <div className="modal-box max-w-lg p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-base-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base-content/50 text-[18px]">location_on</span>
              <div>
                <p className="text-[9px] font-bold text-base-content/50 uppercase tracking-wider leading-none mb-0.5">Campo</p>
                <p className="text-sm font-semibold text-base-content leading-tight">{match.venue?.displayName}</p>
              </div>
            </div>
            <button type="button" className="btn btn-ghost btn-sm btn-circle" onClick={closeMap}>
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          {hasMap ? (
            <VenueMap lat={match.venue.lat} lng={match.venue.lng} className="h-72 rounded-none" />
          ) : (
            <div className="h-40 flex items-center justify-center text-sm text-base-content/40 italic">
              Sin coordenadas disponibles
            </div>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">cerrar</button>
        </form>
      </dialog>
    </>
  );
}
