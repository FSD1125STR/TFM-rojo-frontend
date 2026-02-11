import StatsCard from "./StatsCard";

export default {
  title: "UI/StatsCard",
  component: StatsCard,
  parameters: {
    docs: {
      description: {
        component:
          "Componente de tarjeta para mostrar estadísticas con título, valor e icono opcional. Ideal para dashboards y resúmenes.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "accent",
        "success",
        "warning",
        "error",
      ],
      description: "Variante de color de la tarjeta",
    },
    title: {
      control: "text",
      description: "Título descriptivo de la estadística",
    },
    value: {
      control: "text",
      description: "Valor a mostrar (número o texto)",
    },
    icon: {
      control: "text",
      description: "Nombre del icono de Material Symbols",
    },
    subtitle: {
      control: "text",
      description: "Texto secundario debajo del valor",
    },
  },
};

// Historia por defecto
export const Default = {
  args: {
    title: "Total Jugadores",
    value: 5,
    variant: "default",
  },
};

// Con icono
export const WithIcon = {
  args: {
    title: "Total Jugadores",
    value: 25,
    icon: "groups",
    variant: "default",
  },
};

// Variante Primary
export const Primary = {
  args: {
    title: "Porteros",
    value: 3,
    icon: "sports_handball",
    variant: "primary",
  },
};

// Variante Secondary
export const Secondary = {
  args: {
    title: "Defensas",
    value: 8,
    icon: "shield",
    variant: "secondary",
  },
};

// Variante Accent
export const Accent = {
  args: {
    title: "Delanteros",
    value: 6,
    icon: "sports_soccer",
    variant: "accent",
  },
};

// Variante Success
export const Success = {
  args: {
    title: "Partidos Ganados",
    value: 12,
    icon: "emoji_events",
    variant: "success",
  },
};

// Variante Warning
export const Warning = {
  args: {
    title: "Lesionados",
    value: 2,
    icon: "healing",
    variant: "warning",
  },
};

// Variante Error
export const Error = {
  args: {
    title: "Tarjetas Rojas",
    value: 1,
    icon: "square",
    variant: "error",
  },
};

// Grid de ejemplo (como en la página de jugadores)
export const StatsGrid = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Total Jugadores" value={5} variant="accent" />
      <StatsCard title="Porteros" value={1} variant="accent" />
      <StatsCard title="Defensas" value={1} variant="accent" />
      <StatsCard title="Delanteros" value={2} variant="accent" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Ejemplo de cómo usar múltiples StatsCards en un grid responsivo, similar a la página de Jugadores.",
      },
    },
  },
};

// Con subtítulo
export const WithSubtitle = {
  args: {
    title: "Jugadores Activos",
    value: 24,
    subtitle: "+2 desde el mes pasado",
    icon: "groups",
    variant: "default",
  },
};

// Dashboard Grid (como en la app)
export const DashboardGrid = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Jugadores Activos"
        value={24}
        subtitle="+2 desde el mes pasado"
        icon="groups"
        variant="accent"
      />
      <StatsCard
        title="Partidos Jugados"
        value={12}
        subtitle="En esta temporada"
        icon="calendar_today"
        variant="accent"
      />
      <StatsCard
        title="Tasa de Victoria"
        value="75%"
        subtitle="9 victorias de 12 partidos"
        icon="trending_up"
        variant="accent"
      />
      <StatsCard
        title="Próximo Partido"
        value="2 días"
        subtitle="Sábado 15:00"
        icon="schedule"
        variant="accent"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid del Dashboard con subtítulos informativos.",
      },
    },
  },
};

// Grid con iconos
export const StatsGridWithIcons = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Jugadores"
        value={25}
        icon="groups"
        variant="primary"
      />
      <StatsCard
        title="Porteros"
        value={3}
        icon="sports_handball"
        variant="secondary"
      />
      <StatsCard
        title="Defensas"
        value={8}
        icon="shield"
        variant="secondary"
      />
      <StatsCard
        title="Delanteros"
        value={6}
        icon="sports_soccer"
        variant="accent"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid de estadísticas con iconos y diferentes variantes de color.",
      },
    },
  },
};
