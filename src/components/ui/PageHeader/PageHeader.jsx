import { useNavigate } from "react-router-dom";
import { PageHeaderProps } from './PageHeader.props';
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { Button } from "../Button";

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  onBack,
  actionLabel,
  actionIcon,
  onAction,
  secondaryActionLabel,
  secondaryActionIcon,
  onSecondaryAction,
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
  const hasSecondaryAction = secondaryActionLabel && onSecondaryAction;

  return (
    <div test-id="el-p1g2h3d4" className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {showBack && (
          <IconButton
            icon="arrow_back"
            size="sm"
            ariaLabel="Volver atrás"
            onClick={handleBack}
            className="mt-1"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-base-content/60 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {(hasAction || hasSecondaryAction) && (
        <div className="flex items-center gap-2">
          {hasSecondaryAction && (
            <Button variant="secondary" size="sm" className="gap-2" onClick={onSecondaryAction}>
              {secondaryActionIcon && <Icon name={secondaryActionIcon} size="sm" />}
              {secondaryActionLabel}
            </Button>
          )}
          {hasAction && (
            <Button variant="secondary" size="sm" className="gap-2" onClick={onAction}>
              {actionIcon && <Icon name={actionIcon} size="sm" />}
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

PageHeader.propTypes = PageHeaderProps;
