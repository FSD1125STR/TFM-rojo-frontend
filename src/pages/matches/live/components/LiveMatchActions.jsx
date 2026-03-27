import { useState, useEffect } from 'react';
import { Button } from '../../../../components/ui/Button';
import { Icon } from '../../../../components/ui/Icon';
import { getCallupByMatch } from '../../../../services/callupsService';
import { useMatchTimer, getHalfDuration } from '../hooks/useMatchTimer';
import { ModalLiveGoal } from './ModalLiveGoal';
import { ModalLiveCard } from './ModalLiveCard';
import { ModalLiveSub } from './ModalLiveSub';

const ACTIVE_STATUSES = new Set(['FIRST_HALF', 'SECOND_HALF', 'HALF_TIME']);

export function LiveMatchActions({ matchId, match, liveStatus }) {
  const [players, setPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const currentMinute = useMatchTimer(matchId, liveStatus, getHalfDuration(match?.categoryId?.name));
  const isHalfTime = liveStatus === 'HALF_TIME';

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
      <span test-id="el-la7x3k9m" className="w-px h-6 bg-base-300 shrink-0 self-center" />

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

      <Button
        size="sm"
        variant="ghost"
        className="border border-info/50 text-info gap-1"
        onClick={() => setOpenModal('sub')}
      >
        <Icon name="swap_horiz" size="sm" />
        Cambio
      </Button>

      <ModalLiveGoal
        isOpen={openModal === 'goal'}
        onClose={close}
        matchId={matchId}
        match={match}
        players={players}
        currentMinute={currentMinute}
      />
      <ModalLiveCard
        isOpen={openModal === 'yellow'}
        onClose={close}
        matchId={matchId}
        match={match}
        players={players}
        cardType="yellow_card"
        currentMinute={currentMinute}
      />
      <ModalLiveCard
        isOpen={openModal === 'red'}
        onClose={close}
        matchId={matchId}
        match={match}
        players={players}
        cardType="red_card"
        currentMinute={currentMinute}
      />
      <ModalLiveSub
        isOpen={openModal === 'sub'}
        onClose={close}
        matchId={matchId}
        match={match}
        players={players}
        currentMinute={currentMinute}
      />
    </>
  );
}
