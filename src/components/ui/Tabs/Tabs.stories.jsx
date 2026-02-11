import { useState } from "react";
import { Tabs } from "./Tabs";

export default {
  title: "UI/Tabs",
  component: Tabs,
};

const matchTabs = [
  { value: "all", label: "Todos" },
  { value: "last5", label: "Últimos 5" },
  { value: "home", label: "Casa" },
  { value: "away", label: "Fuera" },
];

const simpleTabs = [
  { value: "tab1", label: "Tab 1" },
  { value: "tab2", label: "Tab 2" },
  { value: "tab3", label: "Tab 3" },
];

export const Default = {
  args: {
    tabs: simpleTabs,
    activeTab: "tab1",
    onChange: (val) => console.log(val),
  },
};

export const MatchHistory = {
  args: {
    tabs: matchTabs,
    activeTab: "all",
    onChange: (val) => console.log(val),
  },
};

export const Interactive = {
  render: () => {
    const [active, setActive] = useState("all");
    return (
      <div className="space-y-4">
        <Tabs tabs={matchTabs} activeTab={active} onChange={setActive} />
        <p className="text-sm text-base-content/60">Tab activo: <strong>{active}</strong></p>
      </div>
    );
  },
};
