import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useHeader } from '../hooks/useHeader';
import { getLiveMatches } from '../services/liveMatchService';
import { PageHeader } from '../components/ui/PageHeader';
import { CardsList } from '../components/ui/CardsList';
import { Icon } from '../components/ui/Icon';

const ADMIN_ROLES = ['administrador', 'direccion'];
const FIELD_ROLES = ['delegado', 'entrenador'];

const LIVE_STATUS_LABELS = {
  FIRST_HALF: '1ª Parte',
  HALF_TIME: 'Descanso',
  SECOND_HALF: '2ª Parte',
};

const LIVE_STATUS_BADGE = {
  FIRST_HALF: 'success',
  HALF_TIME: 'warning',
  SECOND_HALF: 'success',
};

export function LiveMatch() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const role = user?.role;
  const isFieldView = FIELD_ROLES.includes(role);

  useHeader({
    title: 'Partido en Directo',
    breadcrumbs: [],
    actions: null,
  });

  useEffect(() => {
    getLiveMatches()
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.matches || [];
        setMatches(list);
        if (isFieldView && list.length > 0) {
          navigate(`/directo/${list[0]._id}`, { replace: true });
        }
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getActions = (match) => [
    {
      label: 'Ver en directo',
      icon: 'cell_tower',
      onClick: (row) => navigate(`/directo/${row._id}`),
    },
  ];

  const renderContent = (match) => {
    const homeName = match.homeTeamId?.name || 'Local';
    const awayName = match.awayTeamId?.name || 'Visitante';
    const statusLabel = LIVE_STATUS_LABELS[match.liveStatus] || match.liveStatus;
    const badgeVariant = LIVE_STATUS_BADGE[match.liveStatus] || 'ghost';
    const isPulse = match.liveStatus === 'FIRST_HALF' || match.liveStatus === 'SECOND_HALF';

    return {
      title: `${homeName} vs ${awayName}`,
      badges: [
        {
          label: statusLabel,
          variant: badgeVariant,
          icon: 'cell_tower',
          className: isPulse ? 'animate-pulse' : undefined,
        },
      ],
      meta: [
        ...(match.categoryId?.name ? [{ icon: 'group', text: match.categoryId.name }] : []),
        { icon: 'flag', text: `Jornada ${match.journey}` },
      ],
    };
  };

  if (isLoading) {
    return (
      <div test-id="el-lv3d1r3c" className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div test-id="el-lv3d1r3c" className="flex flex-col items-center gap-3 py-20 text-error">
        <Icon name="error" size="lg" />
        <p className="text-sm">No se pudo cargar la información</p>
      </div>
    );
  }

  if (isFieldView) {
    return (
      <div test-id="el-lv3d1r3c" className="flex flex-col items-center gap-4 py-20 text-base-content/50">
        <Icon name="cell_tower" size="lg" />
        <p className="text-base">No hay partido en directo para tu categoría</p>
      </div>
    );
  }

  return (
    <div test-id="el-lv3d1r3c">
      <PageHeader
        title="Partidos en Directo"
        subtitle="Partidos en juego ahora mismo"
      />
      <div className="mt-4">
        <CardsList
          data={matches}
          keyField="_id"
          renderContent={renderContent}
          actions={getActions}
          actionsMode="buttons"
          emptyMessage="No hay partidos en directo"
          isLoading={false}
        />
      </div>
    </div>
  );
}
