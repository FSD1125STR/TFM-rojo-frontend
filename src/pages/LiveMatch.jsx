import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useHeader } from '../hooks/useHeader';
import { useTodayMatches } from './matches/live/hooks/useTodayMatches';
import { useLiveMatch } from '../hooks/useLiveMatchContext';
import { updateLiveStatus } from '../services/matchesService';
import { getCallupByMatch } from '../services/callupsService';
import { showError } from '../utils/alerts';
import { formatFechaRelativa, formatFechaAbsoluta, LIVE_STATUSES } from './matches/data/matchesConfig';
import { MatchMinute } from './matches/live/components/MatchMinute';
import { PageHeader } from '../components/ui/PageHeader';
import { CardsList } from '../components/ui/CardsList';

const FIELD_ROLES = ['delegado', 'entrenador'];
const ACTIVE_STATUSES = LIVE_STATUSES;

const LIVE_STATUS_LABELS = {
  FIRST_HALF: '1ª Parte',
  HALF_TIME: 'Descanso',
  SECOND_HALF: '2ª Parte',
};

export function LiveMatch() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notStarted, active, isLoading, error, reload } = useTodayMatches();
  const { liveStatus: globalLiveStatus } = useLiveMatch();
  const [startingId, setStartingId] = useState(null);

  useEffect(() => {
    reload();
  }, [globalLiveStatus, reload]);

  const role = user?.role;

  const canUserStartMatch = (match) => {
    if (!user) return false;
    if (role === 'administrador') return true;
    if (role === 'delegado' || role === 'entrenador') {
      const userCatId = user?.categoryId?._id || user?.categoryId;
      const matchCatId = match?.categoryId?._id || match?.categoryId;
      return userCatId && matchCatId && userCatId.toString() === matchCatId.toString();
    }
    return false;
  };

  const isFieldView = FIELD_ROLES.includes(role);

  useHeader({
    title: 'Partido en Directo',
    breadcrumbs: [],
    actions: null,
  });

  useEffect(() => {
    if (!isFieldView || isLoading) return;
    if (active.length > 0) {
      navigate(`/directo/${active[0]._id}`, { replace: true });
    } else if (notStarted.length > 0) {
      navigate(`/directo/${notStarted[0]._id}`, { replace: true });
    }
  }, [isFieldView, isLoading, active, notStarted, navigate]);

  if (isFieldView && (isLoading || active.length > 0 || notStarted.length > 0)) {
    return (
      <div test-id="el-lv3d1r3c" className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  const handleStart = async (row) => {
    setStartingId(row._id);
    try {
      const callupData = await getCallupByMatch(row._id);
      const starterCount = (callupData.players ?? []).filter(
        (p) => p.callupStatus === 'called' && p.lineupRole === 'starter'
      ).length;
      if (starterCount !== 11) {
        showError('Configura la alineación (11 titulares) antes de iniciar el partido.');
        setStartingId(null);
        return;
      }
      await updateLiveStatus(row._id, { liveStatus: 'FIRST_HALF' });
      navigate(`/directo/${row._id}`);
    } catch {
      showError('No se pudo iniciar el partido. Inténtalo de nuevo.');
      setStartingId(null);
    }
  };

  const getActions = (match) => {
    if (ACTIVE_STATUSES.has(match.liveStatus)) {
      return [
        {
          label: 'Ver en directo',
          icon: 'cell_tower',
          onClick: (row) => navigate(`/directo/${row._id}`),
        },
      ];
    }
    if (!canUserStartMatch(match)) return [];
    return [
      {
        label: startingId === match._id ? 'Iniciando...' : 'Iniciar partido',
        icon: startingId === match._id ? 'hourglass_top' : 'play_arrow',
        onClick: (row) => { if (!startingId) handleStart(row); },
        show: () => !startingId || startingId === match._id,
      },
    ];
  };

  const renderContent = (match) => {
    const isActive = ACTIVE_STATUSES.has(match.liveStatus);
    const homeName = match.homeTeamId?.name || 'Equipo local';
    const awayName = match.awayTeamId?.name || 'Equipo visitante';

    const badges = isActive
      ? [{ label: LIVE_STATUS_LABELS[match.liveStatus] || 'En directo', variant: 'success', icon: 'cell_tower', className: 'animate-pulse' }]
      : [{ label: 'Programado', variant: 'info', icon: 'schedule' }];

    const meta = [
      {
        icon: 'calendar_today',
        text: (
          <span className="tooltip tooltip-right" data-tip={formatFechaAbsoluta(match.dateTime)}>
            {formatFechaRelativa(match.dateTime)}
          </span>
        ),
      },
      ...(match.venue?.name ? [{ icon: 'location_on', text: match.venue.name }] : []),
      { icon: 'flag', text: `Jornada ${match.journey}` },
      ...(match.categoryId?.name ? [{ icon: 'group', text: match.categoryId.name }] : []),
    ];

    const content = isActive ? (
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-base-content/50 m-0">{homeName}</p>
          <p className="text-3xl font-bold text-base-content m-0">{match.homeScore ?? '-'}</p>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-2xl font-bold text-base-content/30">-</span>
          <MatchMinute match={match} />
        </div>
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
      meta,
      content,
      className: isActive ? '!bg-success/5 border-success/20' : '!bg-info/5 border-info/20',
    };
  };

  const allMatches = [...active, ...notStarted];

  return (
    <div test-id="el-lv3d1r3c">
      <PageHeader
        title="Partido en Directo"
        subtitle="Partidos del día"
      />
      <div className="mt-4">
        <CardsList
          data={allMatches}
          keyField="_id"
          renderContent={renderContent}
          actions={getActions}
          actionsMode="buttons"
          isLoading={isLoading}
          error={error}
          onRetry={reload}
          emptyMessage="No hay partidos programados para hoy"
          emptyIcon="sports_soccer"
          gap="sm"
        />
      </div>
    </div>
  );
}
