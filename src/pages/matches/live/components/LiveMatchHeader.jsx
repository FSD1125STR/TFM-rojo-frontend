import { Icon } from '../../../../components/ui/Icon';
import { Badge } from '../../../../components/ui/Badge';
import { LiveMatchHeaderProps } from './LiveMatchHeader.props';

const STATUS_CONFIG = {
  NOT_STARTED: { label: 'Por comenzar', variant: 'default', pulse: false },
  FIRST_HALF:  { label: '1ª Parte',     variant: 'success', pulse: true  },
  HALF_TIME:   { label: 'Descanso',     variant: 'warning', pulse: false },
  SECOND_HALF: { label: '2ª Parte',     variant: 'success', pulse: true  },
  FINISHED:    { label: 'Finalizado',   variant: 'default', pulse: false },
};

export function LiveMatchHeader({ match, liveStatus }) {
  const homeName = match?.homeTeamId?.name || 'Local';
  const awayName = match?.awayTeamId?.name || 'Visitante';
  const homeScore = match?.homeScore ?? 0;
  const awayScore = match?.awayScore ?? 0;
  const statusCfg = STATUS_CONFIG[liveStatus] || STATUS_CONFIG.NOT_STARTED;

  return (
    <div test-id="el-lh4x9p2q" className="bg-base-200 rounded-2xl p-6 mb-4">
      <div className="flex justify-center mb-3">
        <Badge variant={statusCfg.variant} className={statusCfg.pulse ? 'animate-pulse' : ''}>
          {statusCfg.pulse && <Icon name="radio_button_checked" size="sm" className="mr-1" />}
          {statusCfg.label}
        </Badge>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="text-sm text-base-content/60 mb-1 leading-tight">{homeName}</p>
          <p className="text-5xl font-bold text-base-content">{homeScore}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl font-bold text-base-content/30">-</span>
        </div>

        <div className="flex-1 text-center">
          <p className="text-sm text-base-content/60 mb-1 leading-tight">{awayName}</p>
          <p className="text-5xl font-bold text-base-content">{awayScore}</p>
        </div>
      </div>
    </div>
  );
}

LiveMatchHeader.propTypes = LiveMatchHeaderProps;
