import { StatBox } from "./StatBox";

export default {
  title: "UI/StatBox",
  component: StatBox,
};

export const Default = {
  args: {
    value: 24,
    label: "Partidos",
  },
};

export const Yellow = {
  args: {
    value: 3,
    label: "T. Amarillas",
    color: "yellow",
  },
};

export const Red = {
  args: {
    value: 0,
    label: "T. Rojas",
    color: "red",
  },
};

export const Green = {
  args: {
    value: 18,
    label: "Goles",
    color: "green",
  },
};

export const StatsRow = {
  render: () => (
    <div className="flex justify-around gap-4 p-6 bg-base-100 rounded-xl">
      <StatBox value={24} label="Partidos" />
      <StatBox value={1680} label="Minutos" />
      <StatBox value={18} label="Goles" />
      <StatBox value={12} label="Asistencias" />
      <StatBox value={3} label="T. Amarillas" color="yellow" />
      <StatBox value={0} label="T. Rojas" color="red" />
    </div>
  ),
};
