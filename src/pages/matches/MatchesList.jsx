import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../hooks/useAuth';
import { useMatchesList } from './hooks/useMatchesList';
import { useMatchesKpis } from './hooks/useMatchesKpis';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatsCard } from '../../components/ui/StatsCard';
import { CardsList } from '../../components/ui/CardsList/CardsList';
import {
  estadoMatchConfig,
  statusLabels,
  formatFechaRelativa,
  formatFechaAbsoluta,
} from './data/matchesConfig';

export function MatchesList() {
  const navigate = useNavigate();
  const { checkPermission } = usePermissions();
  const { isAdmin, user } = useAuth();
  const categoryId = user?.categoryId?._id || user?.categoryId || null;
  const kpis = useMatchesKpis(isAdmin ? null : categoryId);

  const canCreate = checkPermission('matches.create');
  const { data, search, filters, sort, pagination, isLoading, error, onRetry } = useMatchesList();

  const getActions = (match) => {
    const items = [
      {
        label: 'Ver',
        icon: 'visibility',
        onClick: (row) => navigate(`/partidos/${row._id}`),
      },
    ];

    if (checkPermission('matches.edit')) {
      items.push({
        label: 'Editar',
        icon: 'edit',
        onClick: (row) => console.log('Editar', row._id),
      });
    }

    if (match.status === 'finished') {
      items.push({
        label: 'Informe',
        icon: 'assessment',
        onClick: (row) => console.log('Informe', row._id),
      });
    }

    return items;
  };

  const statusCardClasses = {
    scheduled: '!bg-info/5 border-info/20',
    finished: '!bg-success/5 border-success/20',
    cancelled: '!bg-error/5 border-error/20',
  };

  const renderContent = (match) => {
    const cfg = estadoMatchConfig[match.status] || estadoMatchConfig.scheduled;
    const label = statusLabels[match.status] || match.status;
    const homeName = match.homeTeamId?.name || 'Equipo local';
    const awayName = match.awayTeamId?.name || 'Equipo visitante';

    const badges = [
      { label, variant: cfg.variant, icon: cfg.icon },
    ];

    const metaItems = [
      { icon: 'calendar_today', text: <span className="tooltip tooltip-right" data-tip={formatFechaAbsoluta(match.dateTime)}>{formatFechaRelativa(match.dateTime)}</span> },
      ...(match.venue?.name ? [{ icon: 'location_on', text: match.venue.name }] : []),
      { icon: 'flag', text: `Jornada ${match.journey}` },
    ];

    const content = match.status === 'finished' ? (
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-base-content/50 m-0">{homeName}</p>
          <p className="text-3xl font-bold text-base-content m-0">{match.homeScore ?? '-'}</p>
        </div>
        <span className="text-2xl font-bold text-base-content/30">-</span>
        <div className="text-center">
          <p className="text-sm text-base-content/50 m-0">{awayName}</p>
          <p className="text-3xl font-bold text-base-content m-0">{match.awayScore ?? '-'}</p>
        </div>
      </div>
    ) : (
      <p className="text-sm text-base-content/40 m-0">Partido no disputado</p>
    );

    return {
      title: `${homeName} vs ${awayName}`,
      badges,
      meta: metaItems,
      content,
      className: statusCardClasses[match.status] || '',
    };
  };

  return (
    <div test-id="el-d4e5f6a7">
      <PageHeader
        title="Partidos"
        subtitle="Gestiona los partidos del equipo"
        {...(canCreate && {
          actionLabel: "Crear partido",
          actionIcon: "add",
          onAction: () => console.log('Crear partido'),
        })}
      />

      {!isAdmin && <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatsCard
          title="Partidos jugados"
          value={kpis?.played ?? '–'}
          subtitle={kpis ? `${kpis.wins} G · ${kpis.draws} E · ${kpis.losses} P` : undefined}
          icon="stadium"
          variant="primary"
        />
        <StatsCard
          title="% Victorias"
          value={kpis?.winRate != null ? `${kpis.winRate}%` : '–'}
          icon="emoji_events"
          variant={kpis?.winRate >= 50 ? 'success' : kpis?.winRate >= 35 ? 'warning' : 'error'}
        />
        <StatsCard
          title="GF / Partido"
          value={kpis?.goalsForPerMatch ?? '–'}
          subtitle={kpis ? `${kpis.totalGoalsFor} goles totales` : undefined}
          icon="sports_soccer"
          variant={kpis?.goalsForPerMatch >= 2 ? 'success' : kpis?.goalsForPerMatch >= 1 ? 'warning' : 'error'}
        />
        <StatsCard
          title="GC / Partido"
          value={kpis?.goalsAgainstPerMatch ?? '–'}
          icon="shield"
          variant={kpis?.goalsAgainstPerMatch <= 1 ? 'success' : kpis?.goalsAgainstPerMatch <= 2 ? 'warning' : 'error'}
        />
      </div>}

      <div className="mt-4">
      <CardsList
        data={data}
        keyField="_id"
        renderContent={renderContent}
        actions={getActions}
        actionsMode="buttons"
        search={search}
        filters={filters}
        sort={sort}
        pagination={pagination}
        isLoading={isLoading}
        error={error}
        onRetry={onRetry}
        emptyMessage="No se encontraron partidos"
        emptyIcon="sports_soccer"
        gap="sm"
      />
      </div>
    </div>
  );
}
