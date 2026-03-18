import { Card } from '../../../components/ui/Card';
import { Avatar } from '../../../components/ui/Avatar';
import { statusLabels } from '../data/matchesConfig';

const STATUS_CONFIG = {
  scheduled: { cls: 'text-base-content/50', icon: 'schedule'     },
  finished:  { cls: 'text-base-content/50', icon: 'check_circle' },
  cancelled: { cls: 'text-error/70',        icon: 'cancel'       },
};

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

export function MatchInfoCard({ match }) {
  const statusCfg = STATUS_CONFIG[match.status] ?? STATUS_CONFIG.scheduled;

  return (
    <div className="flex flex-col gap-4">
      <Card padding="none" className="overflow-hidden">
        {/* Accent bar */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-primary" />
          <div className="flex-1 bg-error" />
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Header row */}
          <div className="flex items-center justify-between gap-2">
            <span className={`flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider ${statusCfg.cls}`}>
              <span className="material-symbols-outlined text-[13px]">{statusCfg.icon}</span>
              {statusLabels[match.status]}
            </span>
          </div>

          {/* Teams + VS */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <Avatar name={match.homeTeam.name} size="xl" variant="primary" />
              <p className="font-bold text-base-content text-sm leading-tight">{match.homeTeam.name}</p>
              <span className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider">Local</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 pt-3">
              <span className="text-4xl font-black text-base-content/20 tracking-tight">VS</span>
              <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">Partido Programado</span>
            </div>

            <div className="flex flex-1 flex-col items-center gap-2 text-center">
              <Avatar name={match.awayTeam.name} size="xl" variant="error" />
              <p className="font-bold text-base-content text-sm leading-tight">{match.awayTeam.name}</p>
              <span className="text-[11px] font-semibold text-base-content/50 uppercase tracking-wider">Visitante</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-base-300" />

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-base-content/50 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[12px]">calendar_month</span> Fecha
              </span>
              <span className="text-sm font-semibold text-base-content">{formatDate(match.dateTime)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-base-content/50 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[12px]">schedule</span> Hora
              </span>
              <span className="text-sm font-semibold text-base-content">{formatTime(match.dateTime)}</span>
            </div>
            {match.venue?.displayName && (
              <div className="flex flex-col gap-0.5">
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-base-content/50 uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> Campo
                </span>
                <span className="text-sm font-semibold text-base-content">{match.venue.displayName}</span>
              </div>
            )}
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-base-content/50 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[12px]">category</span> Categoría
              </span>
              <span className="text-sm font-semibold text-base-content">{match.category.name}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-base-content/50 uppercase tracking-wider">
                <span className="material-symbols-outlined text-[12px]">tag</span> Jornada
              </span>
              <span className="text-sm font-semibold text-base-content">
                Jornada {match.journey} · {match.season}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Pending info banner */}
      <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-4">
        <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">motion_photos_paused</span>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-primary">Partido pendiente</p>
          <p className="text-xs text-primary/70 leading-relaxed">
            Este partido aún no se ha jugado. Las estadísticas, timeline y resumen estarán disponibles una vez que el partido finalice.
          </p>
        </div>
      </div>
    </div>
  );
}
