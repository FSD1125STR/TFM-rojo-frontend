import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { MatchScoreHeader } from './components/MatchScoreHeader';
import { MatchTimeline } from './components/MatchTimeline';
import { MatchPanels } from './components/MatchPanels';
import { getMatchById } from '../../services/matchesService';

export function MatchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMatchById(id)
      .then((data) => {
        if (data?.forbidden) {
          setError('forbidden');
        } else {
          setMatch(data);
        }
      })
      .catch(() => setError('error'))
      .finally(() => setLoading(false));
  }, [id, location.key]);

  if (loading) {
    return <div className="p-6 text-center">Cargando...</div>;
  }

  if (error === 'forbidden') {
    return (
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Sin acceso</h2>
        <p className="text-base-content/60 mb-4">No tienes permisos para ver este partido.</p>
        <Button variant="primary" onClick={() => navigate('/partidos')}>Volver a partidos</Button>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Partido no encontrado</h2>
        <Button variant="primary" onClick={() => navigate('/partidos')}>Volver a partidos</Button>
      </div>
    );
  }


  const homeName = match.homeTeamId?.name || 'Equipo local';
  const awayName = match.awayTeamId?.name || 'Equipo visitante';
  const title = `${homeName} vs ${awayName}`;
  const subtitle = `Jornada ${match.journey ?? ''}`;

  return (
    <div test-id="el-m8t5c3h1">
      <PageHeader
        title={title}
        subtitle={subtitle}
        showBack
        onBack={() => navigate(location.state?.from ?? '/partidos')}
      />

      <div className="flex flex-col gap-4 mt-6">
        <MatchScoreHeader match={match} />
        <div className="grid grid-cols-2 gap-4">
          <MatchTimeline timeline={match.timeline} match={match} />
          <MatchPanels panels={match.panels} match={match} />
        </div>
      </div>
    </div>
  );
}
