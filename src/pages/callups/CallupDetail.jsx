import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { showError } from '../../utils/alerts';
import { PageHeader } from '../../components/ui/PageHeader';
import { useCallupDetail } from './hooks/useCallupDetail';
import { usePermissions } from '../../hooks/usePermissions';
import { CallupsBoard } from './components/CallupsBoard';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { Badge } from '../../components/ui/Badge';

function formatMatchDateTime(dt) {
  if (!dt) return '';
  return new Date(dt).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' });
}

function MapsLink({ name, lat, lng }) {
  if (!name) return null;
  if (!lat || !lng) return <span>{name}</span>;
  return (
    <a
      href={`https://www.google.com/maps?q=${lat},${lng}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary hover:underline"
    >
      {name}
    </a>
  );
}

export function CallupDetail() {
  const { id: matchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { checkPermission } = usePermissions();
  const {
    match,
    callup,
    availablePlayers,
    calledPlayers,
    notCalledPlayers,
    calledCount,
    maxPlayers,
    minPlayers,
    loading,
    saving,
    error,
    isDirty,
    movePlayer,
    saveAllPlayers,
    discardChanges,
  } = useCallupDetail(matchId, location.key);

  useEffect(() => {
    if (error === 'MATCH_CANCELLED') {
      showError('Este partido está cancelado y no tiene convocatoria.');
      navigate('/convocatorias', { replace: true });
    }
  }, [error, navigate]);

  const isMatchScheduled = match?.status === 'scheduled';
  const canEdit = checkPermission('callups.edit') && isMatchScheduled;

  if (!loading && !error && !callup) {
    navigate('/convocatorias', { replace: true });
    return null;
  }

  if (loading) {
    return (
      <div test-id="el-c4l2u8p6" className="flex items-center justify-center h-64">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div test-id="el-c4l2u8p6" className="flex flex-col items-center justify-center h-64 gap-3">
        <Icon name="error" className="text-error text-5xl" />
        <p className="text-base-content/70">{error}</p>
      </div>
    );
  }

  const homeTeamName = match?.homeTeam?.name || '—';
  const awayTeamName = match?.awayTeam?.name || '—';
  const matchLabel = `Jornada ${match?.journey ?? ''}: ${homeTeamName} vs ${awayTeamName}`;

  return (
    <div test-id="el-c4l2u8p6" className="flex flex-col gap-6 h-full">
      <PageHeader
        title={matchLabel}
        showBack
        onBack={() => navigate('/convocatorias')}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
            <div className="bg-base-200 rounded-xl px-4 py-3 flex flex-col gap-1.5">
              <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-widest">Partido</p>
              <span className="flex items-center gap-1.5 text-sm text-base-content/70">
                <Icon name="calendar_today" className="text-[14px] shrink-0" />
                {formatMatchDateTime(match?.dateTime)}
              </span>
              {match?.venue?.name && (
                <span className="flex items-center gap-1.5 text-sm text-base-content/70">
                  <Icon name="stadium" className="text-[14px] shrink-0" />
                  <MapsLink name={match.venue.name} lat={match.venue.lat} lng={match.venue.lng} />
                </span>
              )}
            </div>
            {callup && (
              <div className="bg-base-200 rounded-xl px-4 py-3 flex flex-col gap-1.5">
                <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-widest">Convocatoria</p>
                <span className="flex items-center gap-1.5 text-sm text-base-content/70">
                  <Icon name="schedule" className="text-[14px] shrink-0" />
                  {formatMatchDateTime(callup.callupDateTime)}
                </span>
                {callup.meetingPoint?.place && (
                  <span className="flex items-center gap-1.5 text-sm text-base-content/70">
                    <Icon name="location_on" className="text-[14px] shrink-0" />
                    <MapsLink
                      name={callup.meetingPoint.place}
                      lat={callup.meetingPoint.lat}
                      lng={callup.meetingPoint.lng}
                    />
                  </span>
                )}
              </div>
            )}
          </div>
        <div className="flex items-center gap-3 shrink-0">
          {callup && (
            <Badge
              variant={calledCount >= minPlayers ? 'success' : 'warning'}
              icon={calledCount >= minPlayers ? 'check_circle' : 'warning'}
              size="sm"
            >
              {calledCount}/{maxPlayers} convocados
            </Badge>
          )}
        </div>
      </div>

      {/* Banner de cambios sin guardar */}
      {callup && isDirty && (
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 bg-warning/10 border border-warning/30 rounded-xl text-sm">
          <span className="flex items-center gap-2 text-base-content/70">
            <Icon name="edit_note" className="text-[16px] text-warning" />
            Cambios sin guardar
          </span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={discardChanges}>
              Descartar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={saveAllPlayers}
              isLoading={saving}
              isDisabled={calledCount < minPlayers}
              title={calledCount < minPlayers ? `Mínimo ${minPlayers} jugadores convocados` : undefined}
            >
              Guardar convocatoria
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 flex flex-col gap-3">
        {callup && !isMatchScheduled && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200 text-base-content/60 text-sm">
            <Icon name="lock" className="text-[16px]" />
            <span>
              {match?.status === 'finished' ? 'Partido finalizado' : 'Partido cancelado'} — la convocatoria es de solo lectura
            </span>
          </div>
        )}
        <div className="flex-1 min-h-0">
          <CallupsBoard
            availablePlayers={availablePlayers}
            calledPlayers={calledPlayers}
            notCalledPlayers={notCalledPlayers}
            calledCount={calledCount}
            maxPlayers={maxPlayers}
            editable={canEdit}
            movePlayer={movePlayer}
          />
        </div>
      </div>
    </div>
  );
}
