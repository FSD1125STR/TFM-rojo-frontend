import { Button } from '../../../../components/ui/Button';
import { LiveMatchFiltersProps } from './LiveMatchFilters.props';

const FILTERS = [
  { key: 'ALL', label: 'Todos' },
  { key: 'GOAL', label: 'Goles' },
  { key: 'YELLOW', label: 'Amarillas' },
  { key: 'RED', label: 'Rojas' },
  { key: 'SUB', label: 'Cambios' },
];

export function LiveMatchFilters({ activeFilter, onFilterChange }) {
  return (
    <div test-id="el-fl2k8w1v" className="flex gap-2 flex-wrap mb-4">
      {FILTERS.map(({ key, label }) => (
        <Button
          key={key}
          size="sm"
          variant={activeFilter === key ? 'primary' : 'ghost'}
          onClick={() => onFilterChange(key)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

LiveMatchFilters.propTypes = LiveMatchFiltersProps;
