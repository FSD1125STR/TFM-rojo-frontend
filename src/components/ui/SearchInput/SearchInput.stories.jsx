import { SearchInput } from "./SearchInput";

export default {
  title: "UI/SearchInput",
  component: SearchInput,
};

export const Default = {
  args: {
    placeholder: "Buscar por nombre o dorsal...",
    value: "",
    onChange: (val) => console.log(val),
  },
};

export const WithValue = {
  args: {
    placeholder: "Buscar...",
    value: "Carlos",
    onChange: (val) => console.log(val),
  },
};
