import PropTypes from "prop-types";

export function Tabs({
  tabs,
  activeTab,
  onChange,
}) {
  return (
    <div className="flex gap-1 p-1 bg-base-200 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === tab.value
              ? "bg-base-100 text-base-content shadow-sm"
              : "text-base-content/60 hover:text-base-content"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
