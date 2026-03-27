import { Avatar } from '../../../../components/ui/Avatar';
import { Badge } from '../../../../components/ui/Badge';
import { Card } from '../../../../components/ui/Card';
import { formatMatchDate, formatMatchTime } from '../../data/matchesConfig';
import { useMatchTimer, getHalfDuration } from '../hooks/useMatchTimer';
import { LiveMatchHeaderProps } from './LiveMatchHeader.props';

const STATUS_CONFIG = {
  NOT_STARTED: { label: 'Por comenzar', variant: 'default', pulse: false },
  FIRST_HALF:  { label: '1ª Parte',     variant: 'success', pulse: true  },
  HALF_TIME:   { label: 'Descanso',     variant: 'warning', pulse: false },
  SECOND_HALF: { label: '2ª Parte',     variant: 'success', pulse: true  },
  FINISHED:    { label: 'Finalizado',   variant: 'default', pulse: false },
};

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="flex items-center gap-1 text-[9px] font-bold text-base-content/50 uppercase tracking-wider shrink-0">
        <span className="material-symbols-outlined text-[11px]">{icon}</span>
        {label}
      </span>
      <span className="text-xs font-semibold text-base-content truncate">{value}</span>
    </div>
  );
}

export function LiveMatchHeader({ match, liveStatus }) {
  const homeName = match?.homeTeamId?.name || 'Local';
  const awayName = match?.awayTeamId?.name || 'Visitante';
  const homeScore = match?.homeScore ?? 0;
  const awayScore = match?.awayScore ?? 0;
  const statusCfg = STATUS_CONFIG[liveStatus] ?? STATUS_CONFIG.NOT_STARTED;

  const halfDuration = getHalfDuration(match?.categoryId?.name);
  const minute = useMatchTimer(match?._id, liveStatus, halfDuration);

  return (
    <div test-id="el-lh4x9p2q" className="mb-4">
      <Card padding="none" className="shadow-md">
        {/* Status badge + cronómetro */}
        <div className="px-5 pt-4 pb-2 flex flex-col items-center gap-1">
          <Badge
            variant={statusCfg.variant}
            icon={statusCfg.pulse ? 'radio_button_checked' : undefined}
            className={statusCfg.pulse ? 'animate-pulse' : ''}
          >
            {statusCfg.label}
          </Badge>
          {minute !== null && (
            <span className="text-2xl font-mono font-bold text-base-content/80 leading-none">
              {minute}&apos;
            </span>
          )}
        </div>

        {/* Teams + score */}
        <div className="px-5 py-4 pb-6 flex items-center justify-center gap-6">
          {/* Local */}
          <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
            <div className="text-right min-w-0">
              <p className="text-base font-bold text-base-content leading-tight truncate">{homeName}</p>
              <p className="text-[10px] text-base-content/40 uppercase tracking-wider">(Local)</p>
            </div>
            <Avatar name={homeName} size="xl" variant="primary" />
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-5xl font-black tabular-nums leading-none text-base-content">{homeScore}</span>
            <span className="text-2xl font-bold text-base-content/30 leading-none">-</span>
            <span className="text-5xl font-black tabular-nums leading-none text-base-content">{awayScore}</span>
          </div>

          {/* Visitante */}
          <div className="flex items-center gap-3 flex-1 min-w-0 justify-start">
            <Avatar name={awayName} size="xl" variant="error" />
            <div className="text-left min-w-0">
              <p className="text-base font-bold text-base-content leading-tight truncate">{awayName}</p>
              <p className="text-[10px] text-base-content/40 uppercase tracking-wider">(Visitante)</p>
            </div>
          </div>
        </div>

        {/* Meta info strip */}
        <div className="border-t border-base-300" />
        <div className="bg-base-300 px-4 py-3 flex items-center justify-center gap-3 flex-wrap rounded-b-xl">
          {match?.dateTime && (
            <>
              <InfoItem icon="calendar_month" label="Fecha" value={formatMatchDate(match.dateTime)} />
              <span className="w-px h-5 bg-base-content/20 shrink-0" />
              <InfoItem icon="schedule" label="Hora" value={formatMatchTime(match.dateTime)} />
            </>
          )}
          {match?.categoryId?.name && (
            <>
              <span className="w-px h-5 bg-base-content/20 shrink-0" />
              <InfoItem icon="category" label="Categoría" value={match.categoryId.name} />
            </>
          )}
          {match?.journey != null && (
            <>
              <span className="w-px h-5 bg-base-content/20 shrink-0" />
              <InfoItem icon="tag" label="Jornada" value={`J${match.journey}${match.season ? ` · ${match.season}` : ''}`} />
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

LiveMatchHeader.propTypes = LiveMatchHeaderProps;
