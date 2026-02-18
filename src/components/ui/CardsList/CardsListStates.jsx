import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import PropTypes from 'prop-types';

export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-base-200 border border-base-300 p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-base-300 rounded w-1/3"></div>
          <div className="h-3 bg-base-300 rounded w-1/2"></div>
        </div>
        <div className="h-6 w-20 bg-base-300 rounded"></div>
      </div>
    </div>
  );
}

export function EmptyState({ message, icon, hasActiveFilters, onClearFilters }) {
  return (
    <div className="py-16 text-center text-base-content/60">
      <Icon name={icon} size="lg" className="mb-3 opacity-40" />
      <p className="mb-4">{message}</p>
      {hasActiveFilters && onClearFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="py-16 text-center text-base-content/60">
      <Icon name="error" size="lg" className="mb-3 text-error opacity-60" />
      <p className="mb-4">{error}</p>
      {onRetry && (
        <Button variant="ghost" size="sm" onClick={onRetry}>
          <Icon name="refresh" size="sm" className="mr-1" />
          Reintentar
        </Button>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  message: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  hasActiveFilters: PropTypes.bool,
  onClearFilters: PropTypes.func,
};
