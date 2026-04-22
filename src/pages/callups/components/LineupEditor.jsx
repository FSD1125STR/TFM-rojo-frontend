import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Icon } from '../../../components/ui/Icon';
import { LineupEditorProps } from './LineupEditor.props';

const POSITION_ORDER = ['PO', 'DFC', 'LI', 'LD', 'MC', 'MCD', 'MCI', 'EXD', 'EXI', 'DC'];
const POSITION_RANK = Object.fromEntries(POSITION_ORDER.map((p, i) => [p, i]));

function sortAndGroup(players) {
  const sorted = [...players].sort((a, b) => {
    const rA = POSITION_RANK[a.position] ?? 99;
    const rB = POSITION_RANK[b.position] ?? 99;
    if (rA !== rB) return rA - rB;
    const dA = a.dorsal ?? 999;
    const dB = b.dorsal ?? 999;
    if (dA !== dB) return dA - dB;
    return (a.fullName ?? '').localeCompare(b.fullName ?? '');
  });

  const groups = [];
  const posMap = {};
  for (const p of sorted) {
    const pos = p.position || '—';
    if (!posMap[pos]) {
      const group = { pos, players: [] };
      posMap[pos] = group;
      groups.push(group);
    }
    posMap[pos].players.push(p);
  }
  return groups;
}

function PlayerRow({ player, onToggle, editable }) {
  const isStarter = player.lineupRole === 'starter';
  const isSubstitute = player.lineupRole === 'substitute';

  return (
    <button
      onClick={() => editable && onToggle(player.id)}
      disabled={!editable}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
        editable ? 'hover:bg-base-200 cursor-pointer' : 'cursor-default'
      }`}
    >
      {isStarter && <Badge variant="primary" size="xs">T</Badge>}
      {isSubstitute && <Badge variant="neutral" size="xs">S</Badge>}
      {!isStarter && !isSubstitute && <span className="w-[26px]" />}
      <span className="text-xs font-bold text-base-content/40 w-5 text-right shrink-0">
        {player.dorsal ?? '—'}
      </span>
      <span className="text-sm text-base-content">{player.fullName}</span>
    </button>
  );
}

function PlayerSection({ players, onToggle, editable, icon, label, emptyText }) {
  const groups = sortAndGroup(players);

  return (
    <section>
      <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-widest mb-1 flex items-center gap-1">
        <Icon name={icon} className="text-[12px]" />
        {label} ({players.length})
      </p>
      {players.length === 0 ? (
        <p className="text-xs text-base-content/40 px-3 py-2">{emptyText}</p>
      ) : (
        <div className="flex flex-col">
          {groups.map(({ pos, players: posPlayers }) => (
            <div key={pos}>
              <p className="text-[9px] font-bold text-base-content/25 uppercase tracking-widest px-3 pt-1.5 pb-0.5">
                {pos}
              </p>
              {posPlayers.map((p) => (
                <PlayerRow key={p.id} player={p} onToggle={onToggle} editable={editable} />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function LineupEditor({ calledPlayers, onToggle, onSave, starterCount, isValid, saving, editable }) {
  const starters = calledPlayers.filter((p) => p.lineupRole === 'starter');
  const substitutes = calledPlayers.filter((p) => p.lineupRole === 'substitute');
  const unassigned = calledPlayers.filter((p) => !p.lineupRole);

  return (
    <div test-id="el-l1n3u2p7" className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
        <Badge
          variant={isValid ? 'success' : 'warning'}
          icon={isValid ? 'check_circle' : 'warning'}
          size="sm"
        >
          {starterCount} / 11 titulares
        </Badge>
        {editable && (
          <Button
            size="sm"
            variant="primary"
            onClick={onSave}
            isLoading={saving}
            isDisabled={!isValid}
            title={!isValid ? 'Selecciona exactamente 11 titulares' : undefined}
          >
            Guardar alineación
          </Button>
        )}
      </div>

      {editable && (
        <p className="text-xs text-base-content/50">
          Pulsa un jugador para asignarlo como titular o suplente.
        </p>
      )}

      <div className="grid grid-cols-3 gap-4 min-h-0">
        <PlayerSection
          players={unassigned}
          onToggle={onToggle}
          editable={editable}
          icon="person"
          label="Sin asignar"
          emptyText="Todos asignados"
        />
        <PlayerSection
          players={starters}
          onToggle={onToggle}
          editable={editable}
          icon="star"
          label="Titulares"
          emptyText="Ninguno asignado"
        />
        <PlayerSection
          players={substitutes}
          onToggle={onToggle}
          editable={editable}
          icon="swap_horiz"
          label="Suplentes"
          emptyText="Ninguno asignado"
        />
      </div>
    </div>
  );
}

LineupEditor.propTypes = LineupEditorProps;
