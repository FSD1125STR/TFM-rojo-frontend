import { useState, useEffect, useMemo } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { DataTable } from '../../components/ui/DataTable';
import { ModalTeam } from './components/ModalTeam';
import { useTeamsTable } from './hooks/useTeamsTable';
import { usePermissions } from '../../hooks/usePermissions';
import { getAdminTeams, createTeam, updateTeam, deleteTeam } from '../../services/teamsService';
import { showConfirm, showToast, showError, showErrorInModal, showLoadingInModal, closeLoading, getApiErrorMsg } from '../../utils/alerts';

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
    showLoadingInModal(teamSeleccionado ? 'Actualizando equipo...' : 'Creando equipo...');
    try {
      if (teamSeleccionado) {
        const records = teamSeleccionado._records;
        const oldCategoryIds = records.map((r) => String(r.categoryId?._id || r.categoryId));
        const newCategoryIds = datos.categoryIds;

        const toUpdate = records.filter((r) => newCategoryIds.includes(String(r.categoryId?._id || r.categoryId)));
        const toDelete = records.filter((r) => !newCategoryIds.includes(String(r.categoryId?._id || r.categoryId)));
        const toCreate = newCategoryIds.filter((id) => !oldCategoryIds.includes(id));

        let logoUrl = teamSeleccionado.logoUrl || '';
        let logoPublicId = teamSeleccionado.logoPublicId || '';

        const removeLogo = datos.logo === false;
        const newLogoFile = datos.logo instanceof File ? datos.logo : null;

        // Actualizar registros existentes que se mantienen
        if (toUpdate.length > 0) {
          const firstFd = new FormData();
          firstFd.append('name', datos.name);
          if (newLogoFile) firstFd.append('logo', newLogoFile);
          if (removeLogo) firstFd.append('removeLogo', 'true');
          const firstUpdated = await updateTeam(toUpdate[0]._id, firstFd);
          logoUrl = firstUpdated.logoUrl || '';
          logoPublicId = firstUpdated.logoPublicId || '';

          await Promise.all(toUpdate.slice(1).map((r) => {
            const fd = new FormData();
            fd.append('name', datos.name);
            if (removeLogo) {
              fd.append('removeLogo', 'true');
            } else {
              if (logoUrl) fd.append('logoUrl', logoUrl);
              if (logoPublicId) fd.append('logoPublicId', logoPublicId);
            }
            return updateTeam(r._id, fd);
          }));
        }

        // Eliminar registros de categorías quitadas
        await Promise.all(toDelete.map((r) => deleteTeam(r._id)));

        // Crear registros para nuevas categorías
        if (toCreate.length > 0) {
          const firstNewFd = new FormData();
          firstNewFd.append('name', datos.name);
          firstNewFd.append('categoryId', toCreate[0]);
          if (newLogoFile && toUpdate.length === 0) firstNewFd.append('logo', newLogoFile);
          else if (!removeLogo && logoUrl) firstNewFd.append('logoUrl', logoUrl);
          if (!removeLogo && logoPublicId) firstNewFd.append('logoPublicId', logoPublicId);
          const firstNew = await createTeam(firstNewFd);
          const newLogoUrl = firstNew.logoUrl || logoUrl;
          const newLogoPublicId = firstNew.logoPublicId || logoPublicId;

          await Promise.all(toCreate.slice(1).map((catId) => {
            const fd = new FormData();
            fd.append('name', datos.name);
            fd.append('categoryId', catId);
            if (newLogoUrl) fd.append('logoUrl', newLogoUrl);
            if (newLogoPublicId) fd.append('logoPublicId', newLogoPublicId);
            return createTeam(fd);
          }));
        }

        closeLoading();
        showToast('Equipo actualizado correctamente');
      } else {
        const { categoryIds, name, logo } = datos;
        if (!categoryIds || categoryIds.length === 0) {
          showErrorInModal('Selecciona al menos una categoría');
          return;
        }

        // Crear primer registro con logo
        const firstFd = new FormData();
        firstFd.append('name', name);
        firstFd.append('categoryId', categoryIds[0]);
        if (logo instanceof File) firstFd.append('logo', logo);
        const firstCreated = await createTeam(firstFd);

        // Crear el resto propagando logo
        await Promise.all(categoryIds.slice(1).map((catId) => {
          const fd = new FormData();
          fd.append('name', name);
          fd.append('categoryId', catId);
          if (firstCreated.logoUrl) fd.append('logoUrl', firstCreated.logoUrl);
          if (firstCreated.logoPublicId) fd.append('logoPublicId', firstCreated.logoPublicId);
          return createTeam(fd);
        }));

        closeLoading();
        showToast('Equipo creado correctamente');
      }

      setModalOpen(false);
      loadTeams();
    } catch (error) {
      console.error('Error saving team:', error);
      closeLoading();
      showErrorInModal(getApiErrorMsg(error, 'Error al guardar el equipo'));
    }
  };

  const handleEliminar = async (group) => {
    const categoriasList = group.categories.map((c) => c.name || '').filter(Boolean).join(', ');
    const msg = group._records.length > 1
      ? `Se eliminará "${group.name}" de todas sus categorías (${categoriasList}). Esta acción no se puede deshacer.`
      : `Se eliminará el equipo "${group.name}". Esta acción no se puede deshacer.`;

    const confirmed = await showConfirm(msg, '¿Eliminar equipo?');
    if (!confirmed) return;

    showLoadingInModal('Eliminando equipo...');
    const results = await Promise.allSettled(
      group._records.map((r) => deleteTeam(r._id))
    );
    closeLoading();

    const failures = results.filter((r) => r.status === 'rejected');
    if (failures.length > 0) {
      const msg = getApiErrorMsg(failures[0].reason, 'Algunos registros no pudieron eliminarse');
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
