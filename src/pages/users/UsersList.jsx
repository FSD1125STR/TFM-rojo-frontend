import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../hooks/useHeader";
import { PageHeader } from "../../components/ui/PageHeader";
import { usePermissions } from "../../hooks/usePermissions";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
import { DataTable } from "../../components/ui/DataTable";
import { useUsersTable } from "./hooks/useUsersTable";
import { ModalUser } from "./components/ModalUser";
import {
  showConfirm,
  showToast,
  showError,
  showLoadingInModal,
  closeLoading,
} from "../../utils/alerts";

export function UsersList() {
  const navigate = useNavigate();
  const { checkPermission } = usePermissions();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSeleccionado, setUserSeleccionado] = useState(null);

  const canCreate = checkPermission("users.create");
  const canEdit = checkPermission("users.edit");
  const canDelete = checkPermission("users.delete");

  useHeader({
    title: "Usuarios",
    breadcrumbs: [{ label: "Inicio", to: "/" }, { label: "Usuarios" }],
  });

  const loadUsers = () => {
    setIsLoading(true);
    getUsers()
      .then(setUsers)
      .catch(() => showError("Error al cargar la lista de personal"))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleNuevo = () => {
    setUserSeleccionado(null);
    setIsModalOpen(true);
  };

  const handleEditar = (user) => {
    setUserSeleccionado(user);
    setIsModalOpen(true);
  };

  const handleGuardar = async (formData) => {
    showLoadingInModal(userSeleccionado ? "Actualizando..." : "Registrando...");
    try {
      if (userSeleccionado) {
        await updateUser(userSeleccionado._id, formData);
        showToast("Personal actualizado correctamente");
      } else {
        await createUser(formData);
        showToast("Nuevo miembro registrado con éxito");
      }
      setIsModalOpen(false);
      setUserSeleccionado(null);
      loadUsers();
    } catch (error) {
      showError(
        error?.response?.data?.error || "Error al procesar la solicitud",
      );
    } finally {
      closeLoading();
    }
  };

  const handleEliminar = async (user) => {
    const confirmed = await showConfirm(
      `¿Estás seguro de eliminar a ${user.fullName}?`,
      "¿Eliminar miembro?",
    );
    if (!confirmed) return;
    try {
      await deleteUser(user._id);
      showToast("Miembro eliminado del club");
      loadUsers();
    } catch (error) {
      showError("No se pudo eliminar al usuario");
    }
  };

  const { columns, actions, searchConfig } = useUsersTable({
    onVerDetalle: (row) => navigate(`/usuarios/${row._id}`),
    onEditar: canEdit ? handleEditar : undefined,
    onEliminar: canDelete ? handleEliminar : undefined,
  });

  return (
    <div test-id="el-users-list">
      <PageHeader
        title="Usuarios"
        subtitle="Gestiona el personal, sus roles y accesos al sistema"
        {...(canCreate && {
          actionLabel: "Nuevo Usuario",
          actionIcon: "person_add",
          onAction: handleNuevo,
        })}
      />

      <DataTable
        columns={columns}
        data={users}
        actions={actions}
        isLoading={isLoading}
        {...searchConfig}
        pagination
        paginationPerPage={8}
        className="mt-4"
      />

      <ModalUser
        key={userSeleccionado?._id || "nuevo-usuario"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setUserSeleccionado(null);
        }}
        onSave={handleGuardar}
        initialData={userSeleccionado}
      />
    </div>
  );
}
