import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatsCard } from '../../components/ui/StatsCard';
import { DataTable } from '../../components/ui/DataTable';
import { ModalPlayer } from './components/ModalPlayer';
import { usePlayersTable } from './hooks/usePlayersTable';
import { usePlayersKpis } from './hooks/usePlayersKpis';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../hooks/useAuth';
import { getPlayers, createPlayer, updatePlayer, archivePlayer, updatePlayerStatus } from '../../services/playersService';
import { showConfirm, showSuccess, showError, showErrorInModal, showToast, showLoadingInModal, closeLoading, getApiErrorMsg } from '../../utils/alerts';

export function PlayersList() {
  const navigate = useNavigate();
  const { checkPermission } = usePermissions();
  const { isAdmin, user } = useAuth();
  const isDireccion = user?.role === 'direccion';
  const categoryId = user?.categoryId?._id || user?.categoryId || null;
  const kpis = usePlayersKpis(isAdmin || isDireccion ? null : categoryId);

  const [jugadores, setJugadores] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

  useEffect(() => {
    const jugadorEditadoStr = localStorage.getItem('jugadorEditado');
    if (jugadorEditadoStr) {
      const jugadorEditado = JSON.parse(jugadorEditadoStr);

      setJugadores((prev) => {
        const sinEditado = prev.filter((j) => j.id !== jugadorEditado.id);
        return [jugadorEditado, ...sinEditado];
      });

      localStorage.removeItem('jugadorEditado');
    }
  }, []);

  useEffect(() => {
    getPlayers(isAdmin || isDireccion ? null : categoryId).then(setJugadores).catch((err) => showError(getApiErrorMsg(err, 'Error al cargar los jugadores')));
  }, [isAdmin, isDireccion, categoryId]);

  const handleNuevoJugador = () => {
    setJugadorSeleccionado(null);
    setModalOpen(true);
  };

  const handleEditarJugador = (jugador) => {
    setJugadorSeleccionado(jugador);
    setModalOpen(true);
  };

  const handleVerDetalle = (jugador) => {
    navigate(`/jugadores/${jugador.id}`);
  };

  const handleGuardarJugador = async (datos) => {
    const fd = new FormData();
    Object.entries(datos).forEach(([k, v]) => {
      if (k === 'foto' || k === 'photoUrl' || k === 'edad') return;
      if (v !== undefined && v !== null) fd.append(k, v);
    });
    if (datos.foto instanceof File) fd.append('photo', datos.foto);
    if (datos.foto === false)       fd.append('removePhoto', 'true');
    if (!jugadorSeleccionado) {
      const catId = datos.categoryId || categoryId;
      if (catId && !fd.has('categoryId')) fd.append('categoryId', catId);
    }

    showLoadingInModal(jugadorSeleccionado ? 'Actualizando jugador...' : 'Creando jugador...');
    try {
      if (jugadorSeleccionado) {
        await updatePlayer(jugadorSeleccionado.id, fd);
      } else {
        await createPlayer(fd);
      }
      const fresh = await getPlayers(isAdmin || isDireccion ? null : categoryId);
      setJugadores(fresh);
      closeLoading();
      setModalOpen(false);
      showToast(jugadorSeleccionado ? 'Jugador actualizado correctamente' : 'Jugador creado correctamente');
    } catch (err) {
      closeLoading();
      showErrorInModal(getApiErrorMsg(err, 'Error al guardar el jugador'));
    }
  };

  const handleDarDeBaja = async (jugador) => {
    const confirmed = await showConfirm(
      `${jugador.firstName} ${jugador.lastName} pasará a estado "No disponible".`,
      '¿Dar de baja al jugador?'
    );
    if (!confirmed) return;
    try {
      await updatePlayerStatus(jugador.id, { status: 'NO_DISPONIBLE' });
      setJugadores((prev) =>
        prev.map((j) => (j.id === jugador.id ? { ...j, status: 'No disponible' } : j))
      );
      showSuccess(`${jugador.firstName} ${jugador.lastName} ha sido dado de baja.`);
    } catch (err) {
      showErrorInModal(getApiErrorMsg(err, 'Error al dar de baja al jugador'));
    }
  };

  const handleActivar = async (jugador) => {
    const confirmed = await showConfirm(
      `${jugador.firstName} ${jugador.lastName} volverá a estar disponible.`,
      '¿Activar jugador?'
    );
    if (!confirmed) return;
    try {
      await updatePlayerStatus(jugador.id, { status: 'DISPONIBLE' });
      setJugadores((prev) =>
        prev.map((j) => (j.id === jugador.id ? { ...j, status: 'Disponible' } : j))
      );
      showSuccess(`${jugador.firstName} ${jugador.lastName} está disponible.`);
    } catch (err) {
      showError(getApiErrorMsg(err, 'Error al activar al jugador'));
    }
  };

  const handleMarcarRecuperado = async (player) => {
    const confirmed = await showConfirm(
      `${player.firstName} ${player.lastName} pasará a estado "Disponible".`,
      '¿Marcar como recuperado?'
    );
    if (!confirmed) return;
    try {
      await updatePlayerStatus(player.id, { status: 'DISPONIBLE' });
      setJugadores((prev) =>
        prev.map((j) => (j.id === player.id ? { ...j, status: 'Disponible' } : j))
      );
      showSuccess(`${player.firstName} ${player.lastName} está disponible.`);
    } catch (err) {
      showErrorInModal(getApiErrorMsg(err, 'Error al marcar como recuperado'));
    }
  };

  const handleEliminarSeleccionados = async (selectedRows) => {
    const nombres = selectedRows.map((j) => `${j.firstName} ${j.lastName}`).join(', ');
    const confirmed = await showConfirm(
      `Se darán de baja ${selectedRows.length} jugador(es): ${nombres}`,
      '¿Dar de baja los jugadores seleccionados?'
    );
    if (!confirmed) return;
    showLoadingInModal('Dando de baja jugadores...');
    try {
      await Promise.all(selectedRows.map((j) => archivePlayer(j.id)));
      const fresh = await getPlayers(isAdmin || isDireccion ? null : categoryId);
      setJugadores(fresh);
      closeLoading();
      showToast(`${selectedRows.length} jugador(es) dado(s) de baja correctamente`);
    } catch (err) {
      const fresh = await getPlayers(isAdmin || isDireccion ? null : categoryId).catch(() => null);
      if (fresh) setJugadores(fresh);
      closeLoading();
      showError(getApiErrorMsg(err, 'Error al dar de baja los jugadores'));
    }
  };

  const { columns, actions, filters, searchConfig } = usePlayersTable({
    onVerDetalle: handleVerDetalle,
    onEditar: checkPermission('players.edit') ? handleEditarJugador : undefined,
    onDarDeBaja: checkPermission('players.edit') ? handleDarDeBaja : undefined,
    onActivar: checkPermission('players.edit') ? handleActivar : undefined,
    onMarcarRecuperado: checkPermission('players.edit') ? handleMarcarRecuperado : undefined,
    isAdmin,
    isDireccion,
  });

  const canCreate = checkPermission('players.create');

  return (
    <div test-id="el-f4g5h6i7">
      <PageHeader
        title="Jugadores"
        subtitle="Gestiona la plantilla del equipo"
        {...(canCreate && {
          actionLabel: "Nuevo Jugador",
          actionIcon: "add",
          onAction: handleNuevoJugador,
        })}
      />

      {!isAdmin && !isDireccion && <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatsCard
          title="Disponibles"
          value={kpis?.available ?? '–'}
          icon="check_circle"
          variant="success"
          className="shadow-md"
        />
        <StatsCard
          title="Lesionados"
          value={kpis?.injured ?? '–'}
          icon="personal_injury"
          variant={kpis?.injured > 0 ? 'error' : 'success'}
          className="shadow-md"
        />
        <StatsCard
          title="Sancionados"
          value={kpis?.sanctioned ?? '–'}
          icon="gavel"
          variant={kpis?.sanctioned > 0 ? 'warning' : 'success'}
          className="shadow-md"
        />
        <StatsCard
          title="Riesgo convocatoria"
          value={kpis?.convocationRisk ? 'Sí' : 'No'}
          subtitle={kpis ? `Mínimo requerido: ${kpis.minimumRequired} jugadores disponibles` : ''}
          icon={kpis?.convocationRisk ? 'warning' : 'check_circle'}
          variant={kpis?.convocationRisk ? 'error' : 'success'}
          className="shadow-md"
        />
      </div>}

      <DataTable
        columns={columns}
        data={jugadores}
        selectable={canCreate}
        {...(canCreate && {
          bulkActions: [
            {
              label: 'Eliminar',
              icon: 'delete',
              variant: 'danger',
              onClick: handleEliminarSeleccionados,
            },
          ],
        })}
        actions={actions}
        filters={filters}
        {...searchConfig}
        pagination
        paginationPerPage={8}
        paginationRowsPerPageOptions={[8, 15, 20]}
        onRowClick={handleVerDetalle}
        className="mt-4"
      />

      <ModalPlayer
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={jugadorSeleccionado}
        onSave={handleGuardarJugador}
        isAdmin={isAdmin}
        categoryId={categoryId}
      />
    </div>
  );
}
