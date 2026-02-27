import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { ModalTeam } from './components/ModalTeam';
import { useTeamsTable } from './hooks/useTeamsTable';
import { usePermissions } from '../../hooks/usePermissions';
import { getAdminTeams, createTeam, updateTeam, deleteTeam } from '../../services/teamsService';
import { showConfirm, showToast, showError } from '../../utils/alerts';

export function TeamsList() {
  const { checkPermission } = usePermissions();
  const canCreate = checkPermission('teams.create');
  const canEdit = checkPermission('teams.edit');
  const canDelete = checkPermission('teams.delete');

  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [teamSeleccionado, setTeamSeleccionado] = useState(null);

  const sortedTeams = useMemo(
    () => [...teams].sort((a, b) => (b.isOurTeam ? 1 : 0) - (a.isOurTeam ? 1 : 0)),
    [teams]
  );

  const loadTeams = () => {
    setIsLoading(true);
    getAdminTeams()
      .then(setTeams)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleNuevo = () => {
    setTeamSeleccionado(null);
    setModalOpen(true);
  };

  const handleEditar = (row) => {
    setTeamSeleccionado(row);
    setModalOpen(true);
  };

  const handleGuardar = async (datos) => {
    try {
      const fd = new FormData();
      fd.append('name', datos.name);
      (datos.categoryIds || []).forEach((id) => fd.append('categoryIds', id));
      if (datos.logo) fd.append('logo', datos.logo);

      if (teamSeleccionado) {
        await updateTeam(teamSeleccionado._id, fd);
        showToast('Equipo actualizado correctamente');
      } else {
        await createTeam(fd);
        showToast('Equipo creado correctamente');
      }

      setModalOpen(false);
      loadTeams();
    } catch (error) {
      console.error('Error saving team:', error);
      showError(error?.response?.data?.error || error?.response?.data?.message || 'Error al guardar el equipo');
    }
  };

  const handleEliminar = async (row) => {
    const confirmed = await showConfirm(
      `Se eliminará el equipo "${row.name}". Esta acción no se puede deshacer.`,
      '¿Eliminar equipo?'
    );
    if (!confirmed) return;

    try {
      await deleteTeam(row._id);
      showToast('Equipo eliminado correctamente');
    } catch (error) {
      const msg = error?.response?.data?.message || error?.response?.data?.error || 'No se pudo eliminar el equipo';
      showError(msg);
    }

    loadTeams();
  };

  const { columns, actions, searchConfig } = useTeamsTable({
    onEditar: canEdit ? handleEditar : undefined,
    onEliminar: canDelete ? handleEliminar : undefined,
  });

  return (
    <div test-id="el-t2e4m6s8">
      <PageHeader
        title="Equipos"
        subtitle="Gestiona los equipos del club"
        {...(canCreate && {
          actionLabel: 'Nuevo Equipo',
          actionIcon: 'add',
          onAction: handleNuevo,
        })}
      />

      <div className="mt-4">
        <DataTable
          columns={columns}
          data={sortedTeams}
          actions={actions}
          conditionalRowStyles={[
            {
              when: (row) => row.isOurTeam,
              style: { backgroundColor: 'oklch(95% 0.05 145 / 0.5)' },
            },
          ]}
          {...searchConfig}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 50]}
          progressPending={isLoading}
        />
      </div>

      <ModalTeam
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={teamSeleccionado}
        onSave={handleGuardar}
      />
    </div>
  );
}
