import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchesCalendar } from './hooks/useMatchesCalendar';
import { MatchCalendar } from '../../components/ui/MatchCalendar';
import { PageHeader } from '../../components/ui/PageHeader';
import { Icon } from '../../components/ui/Icon';
import { Button } from '../../components/ui/Button';

export function MatchesCalendar() {
  const navigate = useNavigate();
  const { matches, isLoading, error, onRetry } = useMatchesCalendar();

  const handleSelectMatch = useCallback(
    (match) => navigate(`/partidos/${match._id}`, { state: { from: '/partidos/calendario' } }),
    [navigate],
  );

  const handleGoToList = useCallback(() => navigate('/partidos'), [navigate]);

  return (
    <div test-id="el-3r8w1q6j">
      <PageHeader
        title="Calendario de partidos"
        subtitle="Vista mensual de todos los partidos de la temporada"
        actionLabel="Ver partidos"
        actionIcon="list"
        onAction={handleGoToList}
      />

      <div className="mt-6" aria-live="polite" aria-atomic="true">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <span role="status" aria-label="Cargando partidos" className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {!isLoading && error && (
          <div role="alert" className="alert alert-error">
            <Icon name="error" />
            <span>{error}</span>
            <Button variant="ghost" size="sm" onClick={onRetry}>Reintentar</Button>
          </div>
        )}

        {!isLoading && !error && (
          <MatchCalendar
            matches={matches}
            defaultView="month"
            onSelectMatch={handleSelectMatch}
          />
        )}
      </div>
    </div>
  );
}
