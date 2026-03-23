import { Card } from '../Card';
import { TimelineProps } from './Timeline.props';

export function Timeline({
  items = [],
  getKey,
  isSystem,
  isLeft,
  renderSlot,
  renderSystem,
  renderMarker,
  title,
  emptyMessage = 'Sin elementos',
  className = '',
}) {
  if (!items.length) {
    return (
      <Card test-id="el-t1m4l1n3" title={title} className={`shadow-md ${className}`}>
        <p className="text-sm text-base-content/50 text-center py-6">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <Card test-id="el-t1m4l1n3" title={title} className={`shadow-md ${className}`}>
      <div className="relative flex flex-col gap-1">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-base-300 z-0 pointer-events-none" />

        {items.map((item, i) => {
          const key = getKey ? getKey(item, i) : i;

          if (isSystem?.(item)) {
            return (
              <div key={key} className="relative z-10 flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-base-300" />
                {renderSystem(item)}
                <div className="flex-1 h-px bg-base-300" />
              </div>
            );
          }

          const onLeft = isLeft?.(item);

          return (
            <div
              key={key}
              className="grid grid-cols-[1fr_2rem_1fr] items-center gap-x-2 px-1 py-1.5 rounded-xl hover:bg-base-200/50 transition-colors"
            >
              <div className="flex items-center justify-end gap-2 min-w-0">
                {onLeft && renderSlot(item, 'left')}
              </div>

              <div className="relative z-10 flex items-center justify-center">
                {renderMarker(item)}
              </div>

              <div className="flex items-center justify-start gap-2 min-w-0">
                {!onLeft && renderSlot(item, 'right')}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

Timeline.propTypes = TimelineProps;
