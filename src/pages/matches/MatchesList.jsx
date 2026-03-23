import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../hooks/useAuth';
import { useMatchesList } from './hooks/useMatchesList';
import { useMatchesKpis } from './hooks/useMatchesKpis';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatsCard } from '../../components/ui/StatsCard';
import { CardsList } from '../../components/ui/CardsList';
import { ModalMatch } from './components/ModalMatch';
import { showToast, showError, showErrorInModal, showConfirm, showInputPrompt, showLoadingInModal, closeLoading } from '../../utils/alerts';
import {
  estadoMatchConfig,
  statusLabels,
  formatFechaRelativa,
  formatFechaAbsoluta,
  toLocalDateTimeInput,
} from './data/matchesConfig';

export function MatchesList() {
  const navigate = useNavigate();
  const { checkPermission } = usePermissions();
  const { isAdmin, canViewAll, user } = useAuth();
  const categoryId = user?.categoryId?._id || user?.categoryId || null;
  const kpis = useMatchesKpis(isAdmin ? null : categoryId);

  const canCreate = checkPermission('matches.create');
  const { data, categoryOptions, search, filters, sort, pagination, isLoading, error, onRetry, addMatch, editMatch, removeMatch } = useMatchesList();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const handleCreate = () => { setEditTarget(null); setModalOpen(true); };
  const handleEdit = (row) => { setEditTarget(row); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setEditTarget(null); };

  const handleSave = async (payload) => {
    const wasEditing = editTarget !== null;
    showLoadingInModal(wasEditing ? 'Actualizando partido...' : 'Creando partido...');
    try {
      if (wasEditing) await editMatch(editTarget._id, payload);
      else await addMatch(payload);
      closeLoading();
      handleClose();
      showToast(wasEditing ? 'Partido actualizado' : 'Partido creado');
    } catch {
      closeLoading();
      showErrorInModal('No se pudo guardar el partido');
    }
  };

  const handleDelete = async (row) => {
    const ok = await showConfirm(
      `¿Eliminar el partido "${row.homeTeamId?.name} vs ${row.awayTeamId?.name}"?`,
      '¿Eliminar partido?'
    );
    if (!ok) return;
    showLoadingInModal('Eliminando partido...');
    try {
      await removeMatch(row._id);
      closeLoading();
      showToast('Partido eliminado');
    } catch {
      closeLoading();
      showError('No se pudo eliminar el partido');
    }
  };

  const handlePosponer = async (row) => {
    const { isConfirmed, value } = await showInputPrompt({
      title: 'Posponer partido',
      text: 'Selecciona la nueva fecha y hora',
      input: 'datetime-local',
      inputValue: toLocalDateTimeInput(row.dateTime),
      confirmButtonText: 'Posponer',
    });
    if (!isConfirmed) return;
    showLoadingInModal('Posponiendo partido...');
    try {
      await editMatch(row._id, { dateTime: new Date(value).toISOString() });
      closeLoading();
      showToast('Partido pospuesto');
    } catch {
      closeLoading();
      showError('No se pudo posponer el partido');
    }
  };

  const getActions = (match) => {
    const items = [
      {
        label: 'Ver',
        icon: 'visibility',
        onClick: (row) => navigate(`/partidos/${row._id}`),
      },
    ];

    if (match.venue?.lat && match.venue?.lng) {
      items.push({
        label: 'Ver en mapa',
        icon: 'map',
        onClick: (row) => window.open(`https://www.google.com/maps?q=${row.venue.lat},${row.venue.lng}`, '_blank', 'noopener,noreferrer'),
      });
    }

    if (checkPermission('matches.edit') && match.status !== 'finished') {
      items.push({
        label: 'Editar',
        icon: 'edit',
        onClick: (row) => handleEdit(row),
      });

      if (match.status === 'scheduled') {
        items.push({
          label: 'Posponer',
          icon: 'schedule',
          onClick: (row) => handlePosponer(row),
        });
      }

      items.push({
        label: 'Eliminar',
        icon: 'delete',
        variant: 'danger',
        onClick: (row) => handleDelete(row),
      });
    }

    return items;
  };

  const statusCardClasses = {
    scheduled: '!bg-info/5 border-info/20',
    finished: '!bg-success/5 border-success/20',
    cancelled: '!bg-error/5 border-error/20',
  };

  const renderContent = (match) => {
    const cfg = estadoMatchConfig[match.status] || estadoMatchConfig.scheduled;
    const label = statusLabels[match.status] || match.status;
    const homeName = match.homeTeamId?.name || 'Equipo local';
    const awayName = match.awayTeamId?.name || 'Equipo visitante';

    const badges = [
      { label, variant: cfg.variant, icon: cfg.icon, width: cfg.width },
    ];

    const metaItems = [
      { icon: 'calendar_today', text: <span className="tooltip tooltip-right" data-tip={formatFechaAbsoluta(match.dateTime)}>{formatFechaRelativa(match.dateTime)}</span> },
      ...(match.venue?.name ? [{ icon: 'location_on', text: match.venue.name }] : []),
      { icon: 'flag', text: `Jornada ${match.journey}` },
      ...(canViewAll && match.categoryId?.name ? [{ icon: 'group', text: match.categoryId.name }] : []),
    ];

    const content = match.status === 'finished' ? (
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-base-content/50 m-0">{homeName}</p>
          <p className="text-3xl font-bold text-base-content m-0">{match.homeScore ?? '-'}</p>
        </div>
        <span className="text-2xl font-bold text-base-content/30">-</span>
        <div className="text-center">
          <p className="text-sm text-base-content/50 m-0">{awayName}</p>
          <p className="text-3xl font-bold text-base-content m-0">{match.awayScore ?? '-'}</p>
        </div>
      </div>
    ) : (
      <p className="text-sm text-base-content/40 m-0">Partido no disputado</p>
    );

    return {
      title: `${homeName} vs ${awayName}`,
      badges,
      meta: metaItems,
      content,
      className: statusCardClasses[match.status] || '',
    };
  };

  return (
    <div test-id="el-d4e5f6a7">
      <PageHeader
        title="Partidos"
        subtitle="Gestiona los partidos del equipo"
        {...(canCreate && {
          actionLabel: "Crear partido",
          actionIcon: "add",
          onAction: handleCreate,
        })}
      />

      {!isAdmin && <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatsCard
          title="Partidos jugados"
          value={kpis?.played ?? '–'}
          subtitle={kpis ? `${kpis.wins} G · ${kpis.draws} E · ${kpis.losses} P` : undefined}
          icon="stadium"
          variant="primary"
        />
        <StatsCard
          title="% Victorias"
          value={kpis?.winRate != null ? `${kpis.winRate}%` : '–'}
          icon="emoji_events"
          variant={kpis?.winRate >= 50 ? 'success' : kpis?.winRate >= 35 ? 'warning' : 'error'}
        />
        <StatsCard
          title="GF / Partido"
          value={kpis?.goalsForPerMatch ?? '–'}
          subtitle={kpis ? `${kpis.totalGoalsFor} goles totales` : undefined}
          icon="sports_soccer"
          variant={kpis?.goalsForPerMatch >= 2 ? 'success' : kpis?.goalsForPerMatch >= 1 ? 'warning' : 'error'}
        />
        <StatsCard
          title="GC / Partido"
          value={kpis?.goalsAgainstPerMatch ?? '–'}
          icon="shield"
          variant={kpis?.goalsAgainstPerMatch <= 1 ? 'success' : kpis?.goalsAgainstPerMatch <= 2 ? 'warning' : 'error'}
        />
      </div>}

      <div className="mt-4">
        <CardsList
          data={data}
          keyField="_id"
          renderContent={renderContent}
          actions={getActions}
          actionsMode="buttons"
          search={search}
          filters={filters}
          sort={sort}
          pagination={pagination}
          isLoading={isLoading}
          error={error}
          onRetry={onRetry}
          emptyMessage="No se encontraron partidos"
          emptyIcon="sports_soccer"
          gap="sm"
        />
      </div>

      <ModalMatch
        isOpen={modalOpen}
        onClose={handleClose}
        onSave={handleSave}
        initialData={editTarget}
        categoryOptions={categoryOptions}
      />
    </div>
  );
}
