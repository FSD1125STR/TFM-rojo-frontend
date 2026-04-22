import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useHeader } from '../../../hooks/useHeader';
import { useLiveMatch } from './hooks/useLiveMatch';
import { useMatchEvents } from './hooks/useMatchEvents';
import { useMatchLineup } from './hooks/useMatchLineup';
import { LiveMatchHeader } from './components/LiveMatchHeader';
import { LiveMatchTicker } from './components/LiveMatchTicker';
import { LiveMatchActions } from './components/LiveMatchActions';
import { MatchTimeline } from '../components/MatchTimeline';
import { MatchPanels } from '../components/MatchPanels';
import { LineupEditor } from '../../callups/components/LineupEditor';
import { Icon } from '../../../components/ui/Icon';
import { Badge } from '../../../components/ui/Badge';

const TICKER_ROLES = ['administrador', 'delegado'];

// Los eventos de la API tienen playerId/playerOutId/playerInId como objetos populados.
// Los eventos de socket los tienen como strings. Esta función normaliza ambos casos.
// También infiere teamId para eventos antiguos creados sin él.
function normalizeEvent(event, match) {
  let teamId = event.teamId ? String(event.teamId) : null;

  if (!teamId && match) {
    const homeIsOurs = !!match.homeTeamId?.isOurTeam;
    const homeId = String(match.homeTeamId?._id);
    const awayId = String(match.awayTeamId?._id);

    if (event.type === 'goal') {
      // isOpponentGoal=false → gol de nuestro equipo; isOpponentGoal=true → gol del rival
      const isHomeGoal = homeIsOurs ? !event.isOpponentGoal : !!event.isOpponentGoal;
      teamId = isHomeGoal ? homeId : awayId;
    } else {
      // tarjetas y cambios son siempre de nuestro equipo
      teamId = homeIsOurs ? homeId : awayId;
    }
  }

  const playerName = event.playerName
    || event.playerId?.fullName
    || (event.type === 'goal' && event.isOpponentGoal ? 'Gol visitante' : null);

  return {
    ...event,
    teamId,
    playerName,
    playerOutName: event.playerOutName || event.playerOutId?.fullName || null,
    playerInName: event.playerInName || event.playerInId?.fullName || null,
  };
}

function processGoalEvent(event, pid, scorersMap) {
  const isAnonymousRival = event.isOpponentGoal && !pid && !event.playerName;
  const key = isAnonymousRival ? '__rival__' : (pid || event.playerName);
  if (!key) return;
  if (!scorersMap[key]) {
    scorersMap[key] = { playerId: pid, playerName: isAnonymousRival ? 'Gol del rival' : event.playerName, teamId: event.teamId, goals: 0 };
  }
  scorersMap[key].goals++;
}

function processCardEvent(event, pid, cardsMap) {
  const key = pid || event.playerName;
  if (!key) return;
  if (!cardsMap[key]) {
    cardsMap[key] = { playerId: pid, playerName: event.playerName, teamId: event.teamId, yellowCards: 0, redCards: 0 };
  }
  if (event.type === 'yellow_card') cardsMap[key].yellowCards++;
  else cardsMap[key].redCards++;
}

function computeLivePanels(events) {
  const scorersMap = {};
  const cardsMap = {};
  const substitutions = [];

  for (const event of events) {
    // playerId puede ser objeto {_id} (API) o string (socket); normalizamos a string
    const pid = event.playerId ? String(event.playerId._id ?? event.playerId) : null;

    switch (event.type) {
      case 'goal':
        processGoalEvent(event, pid, scorersMap);
        break;
      case 'yellow_card':
      case 'red_card':
        processCardEvent(event, pid, cardsMap);
        break;
      case 'substitution':
        substitutions.push({ teamId: event.teamId, minute: event.minute, playerInName: event.playerInName, playerOutName: event.playerOutName });
        break;
    }
  }

  return {
    scorers: Object.values(scorersMap),
    // 2 amarillas = expulsión automática: se muestra como 2A + 1R
    cards: Object.values(cardsMap).map((c) => ({
      ...c,
      redCards: c.yellowCards >= 2 ? Math.max(c.redCards, 1) : c.redCards,
    })),
    substitutions,
  };
}

function getExpelledIds(events) {
  const yellowCount = {};
  const expelled = new Set();
  for (const e of events) {
    const id = e.playerId ? String(e.playerId._id ?? e.playerId) : null;
    if (!id) continue;
    if (e.type === 'red_card') {
      expelled.add(id);
    } else if (e.type === 'yellow_card') {
      yellowCount[id] = (yellowCount[id] || 0) + 1;
      if (yellowCount[id] >= 2) expelled.add(id);
    }
  }
  return expelled;
}

export function LiveMatchPage() {
  const { id: matchId } = useParams();
  const { user } = useAuth();
  const { match, liveStatus, isLoading, error } = useLiveMatch(matchId);
  const { events } = useMatchEvents(matchId);
  const { callupId, calledPlayers, starterCount, isValid, saving: savingLineup, toggleStarter, confirmLineup } = useMatchLineup(matchId);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [lineupOpen, setLineupOpen] = useState(false);

  useHeader({
    title: 'Partido en Directo',
    breadcrumbs: [
      { label: 'Partidos', href: '/partidos' },
      { label: 'En directo' },
    ],
    actions: null,
  });

  // Inicializa desde la DB al cargar el partido
  useEffect(() => {
    if (match?.liveStatus) setCurrentStatus(match.liveStatus);
  }, [match?.liveStatus]);

  // Actualizaciones en tiempo real via socket
  useEffect(() => {
    if (liveStatus) setCurrentStatus(liveStatus);
  }, [liveStatus]);

  const canControlTicker = TICKER_ROLES.includes(user?.role);

  const matchNormalized = match
    ? {
        homeTeam: { id: String(match.homeTeamId?._id), name: match.homeTeamId?.name },
        awayTeam: { id: String(match.awayTeamId?._id), name: match.awayTeamId?.name },
      }
    : null;

  const normalizedEvents = useMemo(() => events.map((e) => normalizeEvent(e, match)), [events, match]);
  const livePanels = useMemo(() => computeLivePanels(normalizedEvents), [normalizedEvents]);
  const expelledIds = useMemo(() => getExpelledIds(normalizedEvents), [normalizedEvents]);

  const subEvents = useMemo(() => normalizedEvents.filter((e) => e.type === 'substitution'), [normalizedEvents]);
  const subWindowsFull = useMemo(() => {
    const minutes = new Set(subEvents.filter((e) => !e.atHalfTime).map((e) => e.minute));
    return minutes.size >= 3;
  }, [subEvents]);

  if (isLoading) {
    return (
      <div test-id="el-lp3x7q9m" className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div test-id="el-lp3x7q9m" className="flex flex-col items-center gap-3 py-20 text-error">
        <Icon name="error" size="lg" />
        <p className="text-sm">No se pudo cargar el partido en directo</p>
      </div>
    );
  }

  return (
    <div test-id="el-lp3x7q9m" className="px-4 py-4 max-sm:px-0 max-sm:py-2">
      <LiveMatchHeader match={match} liveStatus={currentStatus || match?.liveStatus} />

      {/* Fila unificada: control de estado + eventos */}
      {canControlTicker && (
        <div className="flex gap-2 flex-wrap items-center justify-center mb-4 max-sm:gap-1.5">
          {currentStatus !== null && currentStatus !== 'FINISHED' && (
            <LiveMatchTicker
              currentLiveStatus={currentStatus}
              matchId={matchId}
              onStatusChange={setCurrentStatus}
              isLineupReady={isValid}
              hasCallup={!!callupId}
              categoryName={match?.categoryId?.name}
            />
          )}
          <LiveMatchActions matchId={matchId} match={match} liveStatus={currentStatus} expelledIds={expelledIds} subWindowsFull={subWindowsFull} subEvents={subEvents} />
        </div>
      )}

      {/* Panel de alineación colapsable */}
      {callupId && (canControlTicker ? currentStatus === 'NOT_STARTED' : isValid) && (
        <div className="mb-4 border border-base-300 rounded-xl overflow-hidden">
          <button
            onClick={() => setLineupOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 bg-base-200 hover:bg-base-300 transition-colors text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              <Icon name="sports_soccer" />
              Alineación
              {starterCount > 0 && (
                <Badge variant={isValid ? 'success' : 'warning'} size="xs">
                  {starterCount}/11
                </Badge>
              )}
            </span>
            <Icon name={lineupOpen ? 'expand_less' : 'expand_more'} />
          </button>
          {lineupOpen && (
            <div className="p-4">
              <LineupEditor
                calledPlayers={calledPlayers}
                onToggle={toggleStarter}
                onSave={confirmLineup}
                starterCount={starterCount}
                isValid={isValid}
                saving={savingLineup}
                editable={canControlTicker && currentStatus !== 'FINISHED'}
              />
            </div>
          )}
        </div>
      )}

      {/* Grid 2 columnas: timeline + paneles */}
      {matchNormalized && (
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <MatchTimeline timeline={normalizedEvents} match={matchNormalized} />
          <MatchPanels panels={livePanels} match={matchNormalized} />
        </div>
      )}
    </div>
  );
}
