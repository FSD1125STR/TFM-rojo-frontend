import { useNavigate } from 'react-router-dom';
import { useMatchesCalendar } from './hooks/useMatchesCalendar';
import { MatchCalendar } from '../../components/ui/MatchCalendar';
import { PageHeader } from '../../components/ui/PageHeader';

export function MatchesCalendar() {
  const navigate = useNavigate();
  const { matches, isLoading, error, onRetry } = useMatchesCalendar();

  const handleSelectMatch = (match) => {
    navigate(`/partidos/${match._id}`, { state: { from: '/partidos/calendario' } });
  };

  return (
    <div>
      <PageHeader
        title="Calendario de partidos"
        subtitle="Vista mensual de todos los partidos de la temporada"
        actionLabel="Ver partidos"
        actionIcon="list"
        onAction={() => navigate('/partidos')}
      />

      <div className="mt-6">
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {!isLoading && error && (
          <div className="alert alert-error">
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
            <button className="btn btn-sm" onClick={onRetry}>Reintentar</button>
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
