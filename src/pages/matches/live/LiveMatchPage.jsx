import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useHeader } from '../../../hooks/useHeader';
import { useLiveMatch } from './hooks/useLiveMatch';
import { useMatchEvents } from './hooks/useMatchEvents';
import { LiveMatchHeader } from './components/LiveMatchHeader';
import { LiveMatchTicker } from './components/LiveMatchTicker';
import { LiveMatchActions } from './components/LiveMatchActions';
import { MatchTimeline } from '../components/MatchTimeline';
import { MatchPanels } from '../components/MatchPanels';
import { Icon } from '../../../components/ui/Icon';

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

function computeLivePanels(events) {
  const scorersMap = {};
  const cardsMap = {};
  const substitutions = [];

  for (const event of events) {
    if (event.type === 'goal') {
      const key = event.playerId || event.playerName;
      if (key) {
        if (!scorersMap[key]) {
          scorersMap[key] = { playerId: event.playerId, playerName: event.playerName, teamId: event.teamId, goals: 0 };
        }
        scorersMap[key].goals++;
      }
    } else if (event.type === 'yellow_card' || event.type === 'red_card') {
      const key = event.playerId || event.playerName;
      if (key) {
        if (!cardsMap[key]) {
          cardsMap[key] = { playerId: event.playerId, playerName: event.playerName, teamId: event.teamId, yellowCards: 0, redCards: 0 };
        }
        if (event.type === 'yellow_card') cardsMap[key].yellowCards++;
        else cardsMap[key].redCards++;
      }
    } else if (event.type === 'substitution') {
      substitutions.push({
        teamId: event.teamId,
        minute: event.minute,
        playerInName: event.playerInName,
        playerOutName: event.playerOutName,
      });
    }
  }

  return {
    scorers: Object.values(scorersMap),
    cards: Object.values(cardsMap),
    substitutions,
  };
}

export function LiveMatchPage() {
  const { id: matchId } = useParams();
  const { user } = useAuth();
  const { match, liveStatus, isLoading, error } = useLiveMatch(matchId);
  const { events } = useMatchEvents(matchId);
  const [currentStatus, setCurrentStatus] = useState('');

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

  const normalizedEvents = events.map((e) => normalizeEvent(e, match));
  const livePanels = computeLivePanels(normalizedEvents);

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
    <div test-id="el-lp3x7q9m" className="px-4 py-4">
      <LiveMatchHeader match={match} liveStatus={currentStatus || match?.liveStatus} />

      {/* Fila unificada: control de estado + eventos */}
      {canControlTicker && (
        <div className="flex gap-2 flex-wrap items-center mb-4">
          {currentStatus !== 'FINISHED' && (
            <LiveMatchTicker
              currentLiveStatus={currentStatus}
              matchId={matchId}
              onStatusChange={setCurrentStatus}
            />
          )}
          <LiveMatchActions matchId={matchId} match={match} liveStatus={currentStatus} />
        </div>
      )}

      {/* Grid 2 columnas: timeline + paneles */}
      {matchNormalized && (
        <div className="grid grid-cols-2 gap-4">
          <MatchTimeline timeline={normalizedEvents} match={matchNormalized} />
          <MatchPanels panels={livePanels} match={matchNormalized} />
        </div>
      )}
    </div>
  );
}
