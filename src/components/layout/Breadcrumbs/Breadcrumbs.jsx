import { Link } from 'react-router-dom';
import { BreadcrumbsProps } from './Breadcrumbs.props';

export function Breadcrumbs({ items = [], variant = 'default' }) {
  if (items.length === 0) return null;

  const textSize = variant === 'compact' ? 'text-xs' : 'text-sm';

  return (
    <div test-id="el-o1p2q3r4" className={`breadcrumbs ${textSize}`}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

Breadcrumbs.propTypes = BreadcrumbsProps;
