import { useNavigate } from 'react-router-dom';
import { QuickActionsProps } from './QuickActions.props';
import { Button } from '../Button';
import { Icon } from '../Icon';

export function QuickActions({ actions = [] }) {
  const navigate = useNavigate();
  if (!actions.length) return null;
  return (
    <div className="flex flex-wrap gap-2" test-id="el-qa7ct2on">
      {actions.map((a) => (
        <Button key={a.id} variant="secondary" size="sm" onClick={() => navigate(a.route)}>
          {a.icon && <Icon name={a.icon} size="sm" />}
          {a.label}
        </Button>
      ))}
    </div>
  );
}

QuickActions.propTypes = QuickActionsProps;
