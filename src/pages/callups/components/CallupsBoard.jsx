import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';
import { KanbanColumn } from '../../../components/ui/KanbanColumn';
import { PlayerCard } from '../../../components/ui/PlayerCard';
import { Badge } from '../../../components/ui/Badge';
import { NoCallupReasonModal } from './NoCallupReasonModal';
import { CallusBoardProps } from './CallupsBoard.props';
import { COLUMN_IDS, REASON_CONFIG } from '../data/callupsConfig';
import { showToast } from '../../../utils/alerts';

function ReasonBadge({ player }) {
  const { reasonCode, playerStatus, isBlocked, sanctionRemaining } = player;
  if (!reasonCode && !isBlocked) return null;

  const code = isBlocked ? (playerStatus === 'LESIONADO' ? 'LE' : 'SA') : reasonCode;
  const config = REASON_CONFIG[code];
  if (!config) return null;

  const badge = (
    <Badge
      variant={config.variant}
      customColor={config.customColor}
      size="xs"
      icon={config.icon}
      pill
    >
      {config.label}
    </Badge>
  );

  if (code === 'SA' && sanctionRemaining != null) {
    const tip = `${sanctionRemaining} partido${sanctionRemaining !== 1 ? 's' : ''} pendiente${sanctionRemaining !== 1 ? 's' : ''}`;
    return (
      <div className="tooltip tooltip-top" data-tip={tip}>
        {badge}
      </div>
    );
  }

  return badge;
}

function DraggablePlayer({ player, editable }) {
  const isDraggable = editable && !player.isBlocked;
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: player.id,
    disabled: !isDraggable,
    data: { player },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 10 }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isDraggable ? { ...listeners, ...attributes } : {})}
      className={`${isDragging ? 'opacity-30' : ''} ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      <PlayerCard
        player={player}
        isBlocked={player.isBlocked}
        reasonBadge={player.isBlocked || player.reasonCode ? <ReasonBadge player={player} /> : null}
      />
    </div>
  );
}

function DroppableColumn({ droppableId, title, count, total, icon, variant, players, editable }) {
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  return (
    <div ref={setNodeRef} className="flex-1 flex flex-col min-w-0">
      <KanbanColumn
        title={title}
        count={count}
        total={total}
        icon={icon}
        variant={variant}
        isOver={isOver}
        className="h-full"
      >
        {players.map((player) => (
          <DraggablePlayer key={player.id} player={player} editable={editable} />
        ))}
      </KanbanColumn>
    </div>
  );
}

export function CallupsBoard({
  availablePlayers = [],
  calledPlayers = [],
  notCalledPlayers = [],
  calledCount = 0,
  maxPlayers = 18,
  editable = false,
  movePlayer,
}) {
  const [activePlayer, setActivePlayer] = useState(null);
  const [pendingDrop, setPendingDrop] = useState(null);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const handleDragStart = ({ active }) => {
    const allPlayers = [...availablePlayers, ...calledPlayers, ...notCalledPlayers];
    setActivePlayer(allPlayers.find((p) => p.id === active.id) || null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActivePlayer(null);
    if (!over || !editable) return;

    const playerId = active.id;
    const allPlayers = [...availablePlayers, ...calledPlayers, ...notCalledPlayers];
    const player = allPlayers.find((p) => p.id === playerId);
    if (!player) return;

    const toColumn = over.id === 'available' ? null : over.id;

    if (toColumn === COLUMN_IDS.CALLED && player.callupStatus !== COLUMN_IDS.CALLED) {
      if (calledCount >= maxPlayers) {
        showToast(`Límite de ${maxPlayers} convocados alcanzado`, 'error');
        return;
      }
    }

    if (toColumn === COLUMN_IDS.NOT_CALLED) {
      if (player.isBlocked) return;
      setPendingDrop({ playerId, playerName: player.fullName });
      setReasonModalOpen(true);
      return;
    }

    movePlayer?.(playerId, toColumn);
  };

  const handleReasonConfirm = (reasonCode) => {
    setReasonModalOpen(false);
    if (pendingDrop) {
      movePlayer?.(pendingDrop.playerId, COLUMN_IDS.NOT_CALLED, reasonCode);
      setPendingDrop(null);
    }
  };

  const handleReasonCancel = () => {
    setReasonModalOpen(false);
    setPendingDrop(null);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div test-id="el-c4l4b4r2" className="flex gap-4 h-full">
          <DroppableColumn
            droppableId="available"
            title="Disponibles"
            count={availablePlayers.length}
            icon="group"
            variant="default"
            players={availablePlayers}
            editable={editable}
          />
          <DroppableColumn
            droppableId={COLUMN_IDS.CALLED}
            title="Convocados"
            count={calledCount}
            total={maxPlayers}
            icon="check_circle"
            variant="success"
            players={calledPlayers}
            editable={editable}
          />
          <DroppableColumn
            droppableId={COLUMN_IDS.NOT_CALLED}
            title="No convocados"
            count={notCalledPlayers.length}
            icon="block"
            variant="error"
            players={notCalledPlayers}
            editable={editable}
          />
        </div>

        <DragOverlay dropAnimation={null}>
          {activePlayer ? (
            <div className="rotate-2 shadow-2xl w-60 pointer-events-none">
              <PlayerCard
                player={activePlayer}
                isBlocked={activePlayer.isBlocked}
                reasonBadge={<ReasonBadge player={activePlayer} />}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <NoCallupReasonModal
        isOpen={reasonModalOpen}
        playerName={pendingDrop?.playerName}
        onConfirm={handleReasonConfirm}
        onCancel={handleReasonCancel}
      />
    </>
  );
}

CallupsBoard.propTypes = CallusBoardProps;
