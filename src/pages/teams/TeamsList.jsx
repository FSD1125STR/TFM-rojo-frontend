import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { ModalTeam } from './components/ModalTeam';
import { useTeamsTable } from './hooks/useTeamsTable';
import { usePermissions } from '../../hooks/usePermissions';
import { getAdminTeams, createTeam, updateTeam, deleteTeam } from '../../services/teamsService';
import { showConfirm, showToast, showError } from '../../utils/alerts';

function groupTeamsByName(teams) {
  const map = new Map();
  teams.forEach((team) => {
    const key = team.name;
    if (!map.has(key)) {
      map.set(key, {
        ...team,
        categories: team.categoryId ? [team.categoryId] : [],
        _records: [team],
      });
    } else {
      const group = map.get(key);
      if (team.categoryId) group.categories.push(team.categoryId);
      group._records.push(team);
    }
  });
  return Array.from(map.values());
}

export function TeamsList() {
  const { checkPermission } = usePermissions();
  const canCreate = checkPermission('teams.create');
  const canEdit = checkPermission('teams.edit');
  const canDelete = checkPermission('teams.delete');

  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [teamSeleccionado, setTeamSeleccionado] = useState(null);

  const groupedTeams = useMemo(() => {
    const grouped = groupTeamsByName(teams);
    return grouped.sort((a, b) => (b.isOurTeam ? 1 : 0) - (a.isOurTeam ? 1 : 0));
  }, [teams]);

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

  const handleEditar = (group) => {
    setTeamSeleccionado(group);
    setModalOpen(true);
  };

  const handleGuardar = async (datos) => {
    try {
      if (teamSeleccionado) {
        const records = teamSeleccionado._records;

        // Primer registro: actualización completa (logo incluido)
        const firstFd = new FormData();
        firstFd.append('name', datos.name);
        if (datos.logo) firstFd.append('logo', datos.logo);
        const firstUpdated = await updateTeam(records[0]._id, firstFd);

        // Registros restantes: solo campos de texto
        if (records.length > 1) {
          await Promise.all(
            records.slice(1).map((record) => {
              const fd = new FormData();
              fd.append('name', datos.name);
              // Propaga logoUrl/logoPublicId del primero vía campo de texto (sin re-subir)
              if (firstUpdated.logoUrl) fd.append('logoUrl', firstUpdated.logoUrl);
              if (firstUpdated.logoPublicId) fd.append('logoPublicId', firstUpdated.logoPublicId);
              return updateTeam(record._id, fd);
            })
          );
        }

        showToast('Equipo actualizado correctamente');
      } else {
        const fd = new FormData();
        fd.append('name', datos.name);
        fd.append('categoryId', datos.categoryId);
        if (datos.logo) fd.append('logo', datos.logo);
        await createTeam(fd);
        showToast('Equipo creado correctamente');
      }

      setModalOpen(false);
      loadTeams();
    } catch (error) {
      console.error('Error saving team:', error);
      showError(error?.response?.data?.message || 'Error al guardar el equipo');
    }
  };

  const handleEliminar = async (group) => {
    const categoriasList = group.categories.map((c) => c.name || '').filter(Boolean).join(', ');
    const msg = group._records.length > 1
      ? `Se eliminará "${group.name}" de todas sus categorías (${categoriasList}). Esta acción no se puede deshacer.`
      : `Se eliminará el equipo "${group.name}". Esta acción no se puede deshacer.`;

    const confirmed = await showConfirm(msg, '¿Eliminar equipo?');
    if (!confirmed) return;

    const results = await Promise.allSettled(
      group._records.map((r) => deleteTeam(r._id))
    );

    const failures = results.filter((r) => r.status === 'rejected');
    if (failures.length > 0) {
      const msg = failures[0].reason?.response?.data?.message || 'Algunos registros no pudieron eliminarse';
      showError(msg);
    } else {
      showToast('Equipo eliminado correctamente');
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
          data={groupedTeams}
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
