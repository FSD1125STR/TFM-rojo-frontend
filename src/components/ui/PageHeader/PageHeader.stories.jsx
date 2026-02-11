import { PageHeader } from "./PageHeader";
import { Button } from "../Button/Button";

export default {
  title: "UI/PageHeader",
  component: PageHeader,
  decorators: [
    (Story) => (
      <div className="p-4 bg-base-200">
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    title: "Jugadores",
    subtitle: "Gestiona la plantilla del equipo",
  },
};

export const WithBackButton = {
  args: {
    title: "Carlos Rodríguez Martínez",
    subtitle: "Dorsal 10 · Delantero",
    showBack: true,
  },
};

export const WithActions = {
  args: {
    title: "Carlos Rodríguez Martínez",
    subtitle: "Dorsal 10 · Delantero",
    showBack: true,
    actions: (
      <Button variant="primary">
        <span className="material-symbols-outlined mr-2">edit</span>
        Editar Jugador
      </Button>
    ),
  },
};
