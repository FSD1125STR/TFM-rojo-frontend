import { Avatar } from "../../../components/ui/Avatar/Avatar";
import { Badge } from "../../../components/ui/Badge/Badge";

const ROLE_CONFIGS = {
  administrador: { variant: "primary", icon: "admin_panel_settings" },
  entrenador:    { variant: "info",    icon: "sports" },
  delegado:      { variant: "warning", icon: "assignment_ind" },
  direccion:     { variant: "secondary", icon: "visibility" },
};

export function useUsersTable({ onEditar, onEliminar }) {
  const columns = [
    {
      key: "fullName",
      label: "Usuario",
      sortable: true,
      width: "30%",
      render: (value, row) => (
        <div className="flex items-center gap-3 pointer-events-none">
          <Avatar name={value} src={row.image} size="sm" />
          <span className="font-medium text-base-content">{value}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      width: "25%",
    },
    {
      key: "role",
      label: "Rol",
      sortable: true,
      width: "20%",
      align: "center",
      render: (value) => {
        const config = ROLE_CONFIGS[value?.toLowerCase()] || { variant: "neutral", icon: "person" };
        return (
          <div className="pointer-events-none flex justify-center">
            <Badge
              variant={config.variant}
              icon={config.icon}
              size="sm"
              width="150px"
              pill={false}
            >
              <span className="capitalize">{value}</span>
            </Badge>
          </div>
        );
      },
    },
    {
      key: "categoryId",
      label: "Categoría",
      width: "15%",
      align: "center",
      render: (cat) => cat?.name || <span className="opacity-30">—</span>,
    },
  ];

  const actions = [
    onEditar && { label: "Editar", icon: "edit", onClick: onEditar },
    onEliminar && {
      label: "Eliminar",
      icon: "delete",
      onClick: onEliminar,
      variant: "danger",
    },
  ].filter(Boolean);

  const searchConfig = {
    searchable: true,
    searchPlaceholder: "Buscar por nombre o email...",
    searchKeys: ["fullName", "email"],
  };

  return { columns, actions, searchConfig };
}
