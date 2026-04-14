import { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/Button';
import { Icon } from '../../../../components/ui/Icon';
import { getCallupByMatch } from '../../../../services/callupsService';
import { useMatchTimer, getHalfDuration } from '../hooks/useMatchTimer';
import { useLiveMatch } from '../../../../hooks/useLiveMatchContext';
import { ModalLiveGoal } from './ModalLiveGoal';
import { ModalLiveCard } from './ModalLiveCard';
import { ModalLiveSub } from './ModalLiveSub';
import { LIVE_STATUSES as ACTIVE_STATUSES } from '../../data/matchesConfig';

export function LiveMatchActions({ matchId, match, liveStatus, expelledIds = new Set(), subWindowsFull = false, subEvents = [] }) {
  const [players, setPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const { matchStartTimestamps } = useLiveMatch();
  const currentMinute = useMatchTimer(matchId, liveStatus, getHalfDuration(match?.categoryId?.name), matchStartTimestamps.firstHalfStartAt, matchStartTimestamps.secondHalfStartAt);
  const isHalfTime = liveStatus === 'HALF_TIME';
  const activePlayers = players.filter((p) => !expelledIds.has(String(p.id)));

  const leftIds = new Set(subEvents.map((e) => String(e.playerOutId?._id ?? e.playerOutId)).filter(Boolean));
  const enteredIds = new Set(subEvents.map((e) => String(e.playerInId?._id ?? e.playerInId)).filter(Boolean));
  const outPlayers = activePlayers.filter((p) =>
    enteredIds.has(String(p.id)) || (p.lineupRole === 'starter' && !leftIds.has(String(p.id)))
  );
  const inPlayers = activePlayers.filter((p) =>
    p.lineupRole === 'substitute' && !enteredIds.has(String(p.id))
  );

  useEffect(() => {
    if (!matchId) return;
    getCallupByMatch(matchId)
      .then(({ players: p }) => setPlayers(p ?? []))
      .catch(() => setPlayers([]));
  }, [matchId]);

  if (!ACTIVE_STATUSES.has(liveStatus)) return null;

  const close = () => setOpenModal(null);

  return (
    <>
      <span test-id="el-la7x3k9m" className="w-px h-6 bg-base-300 shrink-0 self-center max-sm:hidden" />

      {!isHalfTime && (
        <>
          <Button
            size="sm"
            variant="ghost"
            className="border border-base-300 gap-1"
            onClick={() => setOpenModal('goal')}
          >
            <Icon name="sports_soccer" size="sm" />
            Gol
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="border border-warning/50 text-warning gap-1"
            onClick={() => setOpenModal('yellow')}
          >
            <span className="w-3 h-4 rounded-sm bg-warning inline-block shrink-0" />
            Amarilla
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="border border-error/50 text-error gap-1"
            onClick={() => setOpenModal('red')}
          >
            <span className="w-3 h-4 rounded-sm bg-error inline-block shrink-0" />
            Roja
          </Button>
        </>
      )}

      <span
        className={!isHalfTime && subWindowsFull ? 'tooltip tooltip-top' : undefined}
        data-tip={!isHalfTime && subWindowsFull ? 'Máximo de 3 ventanas alcanzado' : undefined}
      >
        <Button
          size="sm"
          variant="ghost"
          className={`border gap-1 ${!isHalfTime && subWindowsFull ? 'border-base-300 text-base-content/30 opacity-40' : 'border-info/50 text-info'}`}
          onClick={() => setOpenModal('sub')}
          isDisabled={!isHalfTime && subWindowsFull}
        >
          <Icon name="swap_horiz" size="sm" />
          Cambio
        </Button>
      </span>

      <ModalLiveGoal
        isOpen={openModal === 'goal'}
        onClose={close}
        matchId={matchId}
        match={match}
        players={outPlayers.length > 0 ? outPlayers : activePlayers}
        currentMinute={currentMinute}
      />
      <ModalLiveCard
        isOpen={openModal === 'yellow'}
        onClose={close}
        matchId={matchId}
        match={match}
        players={outPlayers.length > 0 ? outPlayers : activePlayers}
        cardType="yellow_card"
        currentMinute={currentMinute}
      />
      <ModalLiveCard
        isOpen={openModal === 'red'}
        onClose={close}
        matchId={matchId}
        match={match}
        players={outPlayers.length > 0 ? outPlayers : activePlayers}
        cardType="red_card"
        currentMinute={currentMinute}
      />
      <ModalLiveSub
        isOpen={openModal === 'sub'}
        onClose={close}
        matchId={matchId}
        match={match}
        outPlayers={outPlayers}
        inPlayers={inPlayers}
        currentMinute={currentMinute}
      />
    </>
  );
}
