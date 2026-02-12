import { SelectFilter } from "./SelectFilter";

export default {
  title: "UI/SelectFilter",
  component: SelectFilter,
};

export const Default = {
  args: {
    placeholder: "Todas las posiciones",
    value: "",
    options: [
      { value: "Portero", label: "Portero" },
      { value: "Defensa", label: "Defensa" },
      { value: "Centrocampista", label: "Centrocampista" },
      { value: "Delantero", label: "Delantero" },
    ],
    onChange: (val) => console.log(val),
  },
};

export const WithSelection = {
  args: {
    placeholder: "Todas las posiciones",
    value: "Delantero",
    options: [
      { value: "Portero", label: "Portero" },
      { value: "Defensa", label: "Defensa" },
      { value: "Centrocampista", label: "Centrocampista" },
      { value: "Delantero", label: "Delantero" },
    ],
    onChange: (val) => console.log(val),
  },
};

export const MultiSelectEmpty = {
  args: {
    multiple: true,
    placeholder: "Todas las posiciones",
    value: [],
    options: [
      { value: "Portero", label: "Portero" },
      { value: "Defensa", label: "Defensa" },
      { value: "Centrocampista", label: "Centrocampista" },
      { value: "Delantero", label: "Delantero" },
    ],
    onChange: (val) => console.log(val),
  },
};

export const MultiSelectWithSelections = {
  args: {
    multiple: true,
    placeholder: "Todas las posiciones",
    value: ["Defensa", "Centrocampista"],
    options: [
      { value: "Portero", label: "Portero" },
      { value: "Defensa", label: "Defensa" },
      { value: "Centrocampista", label: "Centrocampista" },
      { value: "Delantero", label: "Delantero" },
    ],
    onChange: (val) => console.log(val),
  },
};
