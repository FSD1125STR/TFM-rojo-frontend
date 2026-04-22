import { useState } from 'react';
import { Icon } from '../Icon';
import { CollapseProps } from './Collapse.props';

export function Collapse({ title, icon, defaultOpen = false, children, className = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      test-id="el-c0l4p5e6"
      className={`rounded-xl bg-base-200 border border-base-300 overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-base-300 transition-colors text-left"
      >
        <span className="flex items-center gap-2">
          {icon && <Icon name={icon} size="sm" />}
          <h3 className="text-base font-semibold text-base-content m-0">{title}</h3>
        </span>
        <Icon name={isOpen ? 'expand_less' : 'expand_more'} size="sm" />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1">
          {children}
        </div>
      )}
    </div>
  );
}

Collapse.propTypes = CollapseProps;
