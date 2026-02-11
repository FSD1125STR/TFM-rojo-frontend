import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  actions,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="btn btn-ghost btn-sm btn-circle mt-1"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-base-content/60 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  showBack: PropTypes.bool,
  onBack: PropTypes.func,
  actions: PropTypes.node,
};
