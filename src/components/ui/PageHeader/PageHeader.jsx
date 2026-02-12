import { useNavigate } from "react-router-dom";
import { PageHeaderProps } from './PageHeader.props'
import { Icon } from "../Icon/Icon";

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  actionLabel,
  actionIcon,
  onAction,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const hasAction = actionLabel && onAction;

  return (
    <div test-id="el-p1g2h3d4" className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="btn btn-ghost btn-sm btn-circle mt-1"
          >
            <Icon name="arrow_back" size="sm" />
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-base-content/60 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {hasAction && (
        <button className="btn btn-neutral btn-sm gap-2" onClick={onAction}>
          {actionIcon && <Icon name={actionIcon} size="sm" />}
          {actionLabel}
        </button>
      )}
    </div>
  );
}

PageHeader.propTypes = PageHeaderProps
