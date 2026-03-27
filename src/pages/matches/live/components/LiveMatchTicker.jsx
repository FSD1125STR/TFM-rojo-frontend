import { useState } from 'react';
import Swal from 'sweetalert2';
import { Button } from '../../../../components/ui/Button';
import { Icon } from '../../../../components/ui/Icon';
import { updateLiveStatus, createMatchEvent } from '../../../../services/matchesService';
import { showError, showToast } from '../../../../utils/alerts';
import { LiveMatchTickerProps } from './LiveMatchTicker.props';

const TRANSITIONS = {
  NOT_STARTED: { next: 'FIRST_HALF',  label: 'Iniciar 1ª Parte',  icon: 'play_arrow', systemEvent: { type: 'match_start', minute: 0  } },
  FIRST_HALF:  { next: 'HALF_TIME',   label: 'Descanso',          icon: 'pause',      systemEvent: { type: 'half_time',   minute: 45 } },
  HALF_TIME:   { next: 'SECOND_HALF', label: 'Iniciar 2ª Parte',  icon: 'play_arrow', systemEvent: null },
  SECOND_HALF: { next: 'FINISHED',    label: 'Finalizar Partido', icon: 'stop',       systemEvent: { type: 'full_time',   minute: 90 } },
};

export function LiveMatchTicker({ currentLiveStatus, matchId, onStatusChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const transition = TRANSITIONS[currentLiveStatus];

  if (!transition) return null;

  const handleClick = async () => {
    const { next } = transition;

    if (next === 'FINISHED') {
      const { isConfirmed, value } = await Swal.fire({
        title: 'Finalizar Partido',
        text: 'Añade un comentario opcional sobre el partido',
        input: 'textarea',
        inputPlaceholder: 'Comentarios del partido...',
        showCancelButton: true,
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#5C6F68',
        cancelButtonColor: '#d33',
      });
      if (!isConfirmed) return;

      setIsLoading(true);
      try {
        if (transition.systemEvent) await createMatchEvent(matchId, transition.systemEvent);
        await updateLiveStatus(matchId, { liveStatus: next, comments: value || '' });
        onStatusChange(next);
        showToast('Partido finalizado');
      } catch {
        showError('No se pudo actualizar el estado del partido');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    try {
      if (transition.systemEvent) await createMatchEvent(matchId, transition.systemEvent);
      await updateLiveStatus(matchId, { liveStatus: next });
      onStatusChange(next);
    } catch {
      showError('No se pudo actualizar el estado del partido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      test-id="el-tk7m3n5r"
      variant={transition.next === 'FINISHED' ? 'danger' : 'primary'}
      size="sm"
      isLoading={isLoading}
      onClick={handleClick}
      className="gap-1 shrink-0"
    >
      <Icon name={transition.icon} size="sm" />
      {transition.label}
    </Button>
  );
}

LiveMatchTicker.propTypes = LiveMatchTickerProps;
