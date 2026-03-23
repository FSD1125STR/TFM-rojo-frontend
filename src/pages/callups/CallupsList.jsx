import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../hooks/useAuth';
import { useMatchesList } from '../matches/hooks/useMatchesList';
import { useCallupsStatus } from './hooks/useCallupsStatus';
import { PageHeader } from '../../components/ui/PageHeader';
import { CardsList } from '../../components/ui/CardsList';
import { showToast, showError, showConfirm, showLoadingInModal, closeLoading } from '../../utils/alerts';
import { estadoMatchConfig, statusLabels, formatFechaRelativa, formatFechaAbsoluta } from '../matches/data/matchesConfig';
import { callupStatusConfig } from './data/callupsConfig';
import { getCallupByMatch, deleteCallup } from '../../services/callupsService';

export function CallupsList() {
  const navigate = useNavigate();
  const { checkPermission } = usePermissions();
  const { canViewAll } = useAuth();
  const canManage = checkPermission('callups.create');

  const { data, search, filters, sort, pagination, isLoading, error, onRetry } = useMatchesList();
  const { statusMap, isLoading: statusLoading } = useCallupsStatus(data);

  const handleDelete = async (matchId) => {
    const ok = await showConfirm('¿Eliminar esta convocatoria?', '¿Eliminar convocatoria?');
    if (!ok) return;
    showLoadingInModal('Eliminando...');
    try {
      const callup = await getCallupByMatch(matchId);
      await deleteCallup(callup._id);
      closeLoading();
      showToast('Convocatoria eliminada');
      onRetry();
    } catch {
      closeLoading();
      showError('No se pudo eliminar la convocatoria');
    }
  };

  const getActions = (match) => {
    const st = statusMap[match._id];
    const items = [];
    if (st?.hasCallup)
      items.push({ label: canManage ? 'Ver / Editar' : 'Ver convocatoria', icon: canManage ? 'edit_note' : 'groups', onClick: (m) => navigate(`/convocatorias/match/${m._id}`) });
    if (!st?.hasCallup && canManage)
      items.push({ label: 'Crear convocatoria', icon: 'add', onClick: (m) => navigate(`/convocatorias/match/${m._id}`) });
    items.push({ label: 'Ver partido', icon: 'sports_soccer', onClick: (m) => navigate(`/partidos/${m._id}`) });
    if (match.venue?.lat && match.venue?.lng)
      items.push({ label: 'Ver en mapa', icon: 'map', onClick: (m) => window.open(`https://www.google.com/maps?q=${m.venue.lat},${m.venue.lng}`, '_blank', 'noopener,noreferrer') });
    if (st?.hasCallup && canManage)
      items.push({ label: 'Eliminar convocatoria', icon: 'delete', variant: 'danger', onClick: (m) => handleDelete(m._id) });
    return items;
  };

  const renderContent = (match) => {
    const matchCfg = estadoMatchConfig[match.status] || estadoMatchConfig.scheduled;
    const st = statusMap[match._id];
    const callupCfg = st?.hasCallup ? callupStatusConfig.created : callupStatusConfig.missing;
    return {
      title: `${match.homeTeamId?.name || 'Local'} vs ${match.awayTeamId?.name || 'Visitante'}`,
      badges: [
        { label: callupCfg.label, variant: callupCfg.variant, icon: callupCfg.icon, width: callupCfg.width, customColor: callupCfg.customColor },
        { label: statusLabels[match.status] || match.status, variant: matchCfg.variant, icon: matchCfg.icon, width: matchCfg.width },
      ],
      meta: [
        { icon: 'calendar_today', text: <span className="tooltip tooltip-right" data-tip={formatFechaAbsoluta(match.dateTime)}>{formatFechaRelativa(match.dateTime)}</span> },
        ...(match.venue?.name ? [{ icon: 'location_on', text: match.venue.name }] : []),
        { icon: 'flag', text: `Jornada ${match.journey}` },
        ...(canViewAll && match.categoryId?.name ? [{ icon: 'group', text: match.categoryId.name }] : []),
      ],
      content: st?.hasCallup
        ? <p className="text-sm text-success m-0">{st.calledCount} convocados · <span className="text-error">{st.notCalledCount} no convocados</span></p>
        : <p className="text-sm text-warning m-0">Sin convocatoria registrada</p>,
    };
  };

  return (
    <div>
      <PageHeader title="Convocatorias" subtitle="Gestiona las convocatorias del equipo" />
      <div className="mt-4">
        <CardsList
          data={data} keyField="_id"
          renderContent={renderContent} actions={getActions} actionsMode="buttons"
          search={search} filters={filters} sort={sort} pagination={pagination}
          isLoading={isLoading || statusLoading} error={error} onRetry={onRetry}
          emptyMessage="No se encontraron partidos" emptyIcon="how_to_reg" gap="sm"
        />
      </div>
    </div>
  );
}
