import { Collapse } from '../../../components/ui/Collapse';

const POSITION_ORDER = ['PO', 'DFC', 'LI', 'LD', 'MC', 'MCD', 'MCI', 'EXD', 'EXI', 'DC'];
const POSITION_RANK = Object.fromEntries(POSITION_ORDER.map((p, i) => [p, i]));

function sortPlayers(players) {
  return [...players].sort((a, b) => {
    const rA = POSITION_RANK[a.position] ?? 99;
    const rB = POSITION_RANK[b.position] ?? 99;
    if (rA !== rB) return rA - rB;
    return (a.dorsal ?? 999) - (b.dorsal ?? 999);
  });
}

function LineupList({ players, emptyText }) {
  if (!players.length) return <p className="text-sm text-base-content/50 italic">{emptyText}</p>;
  return (
    <ul className="flex flex-col gap-1">
      {sortPlayers(players).map((p) => (
        <li key={p.id} className="flex items-center gap-2 px-1 py-1">
          <span className="text-xs font-bold text-base-content/40 w-5 text-right shrink-0">{p.dorsal ?? '—'}</span>
          <span className="text-xs text-base-content/40 w-8 shrink-0">{p.position ?? ''}</span>
          <span className="text-sm text-base-content">{p.fullName}</span>
        </li>
      ))}
    </ul>
  );
}

function LineupSection({ callupPlayers }) {
  const starters = callupPlayers.filter((p) => p.callupStatus === 'called' && p.lineupRole === 'starter');
  const substitutes = callupPlayers.filter((p) => p.callupStatus === 'called' && p.lineupRole === 'substitute');
  if (!starters.length && !substitutes.length) return null;
  return (
    <Collapse title="Alineación">
      <div className="flex flex-col gap-4">
        {starters.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-widest mb-1">Titulares</p>
            <LineupList players={starters} emptyText="Sin titulares" />
          </div>
        )}
        {substitutes.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-base-content/40 uppercase tracking-widest mb-1">Suplentes</p>
            <LineupList players={substitutes} emptyText="Sin suplentes" />
          </div>
        )}
      </div>
    </Collapse>
  );
}

function getShort(name) {
  if (!name) return '';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name.slice(0, 3).toUpperCase();
  return words.map((w) => w[0]).join('').slice(0, 3).toUpperCase();
}

function SideBadge({ isLocal, homeShort, awayShort }) {
  return (
    <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${isLocal ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'}`}>
      {isLocal ? homeShort : awayShort}
    </span>
  );
}

function ScorersSection({ scorers, homeTeamId, homeShort, awayShort }) {
  if (!scorers?.length) {
    return <p className="text-sm text-base-content/50 italic">Sin goles registrados</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {scorers.map((s) => {
        const isLocal = s.teamId === homeTeamId;
        return (
          <li key={s.playerId ?? s.playerName} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full shrink-0 ${isLocal ? 'bg-primary' : 'bg-error'}`} />
              <span className="text-sm font-semibold text-base-content">{s.playerName}</span>
            </div>
            <div className="flex items-center gap-2">
              <SideBadge isLocal={isLocal} homeShort={homeShort} awayShort={awayShort} />
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${isLocal ? 'bg-primary text-primary-content' : 'bg-error text-error-content'}`}>
                {s.goals}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CardsSection({ cards, homeTeamId, homeShort, awayShort }) {
  if (!cards?.length) {
    return <p className="text-sm text-base-content/50 italic">Sin tarjetas registradas</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {cards.map((c) => {
        const isLocal = c.teamId === homeTeamId;
        return (
          <li key={c.playerId ?? c.playerName} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {c.yellowCards > 0 && (
                <span className="h-4 w-3 rounded-sm bg-warning shrink-0" />
              )}
              {c.redCards > 0 && (
                <span className="h-4 w-3 rounded-sm bg-error shrink-0" />
              )}
              <span className="text-sm font-semibold text-base-content">{c.playerName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <SideBadge isLocal={isLocal} homeShort={homeShort} awayShort={awayShort} />
              {c.yellowCards > 0 && (
                <span className="text-xs text-warning font-bold">{c.yellowCards}A</span>
              )}
              {c.redCards > 0 && (
                <span className="text-xs text-error font-bold">{c.redCards}R</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function SubstitutionsSection({ substitutions, homeTeamId, homeShort, awayShort }) {
  if (!substitutions?.length) {
    return <p className="text-sm text-base-content/50 italic">Sin cambios registrados</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {substitutions.map((s, i) => {
        const isLocal = s.teamId === homeTeamId;
        return (
          <li key={i} className="flex flex-col gap-0.5 rounded-xl bg-base-200/50 px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <SideBadge isLocal={isLocal} homeShort={homeShort} awayShort={awayShort} />
              <span className="text-xs text-base-content/50 font-semibold">{s.minute}&apos;</span>
            </div>
            <div className="flex flex-col gap-0.5 mt-1">
              {s.playerInName && (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="h-2 w-2 rounded-full bg-success shrink-0" />
                  <span className="text-base-content/60 font-medium">Entra:</span>
                  <span className="text-base-content font-semibold">{s.playerInName}</span>
                </div>
              )}
              {s.playerOutName && (
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="h-2 w-2 rounded-full bg-error/60 shrink-0" />
                  <span className="text-base-content/60 font-medium">Sale:</span>
                  <span className="text-base-content/70">{s.playerOutName}</span>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function MatchPanels({ panels, match, callupPlayers = [] }) {
  const homeTeamId = match.homeTeam.id;
  const homeShort = getShort(match.homeTeam.name);
  const awayShort = getShort(match.awayTeam.name);
  const p = panels ?? {};

  return (
    <div test-id="el-f7a8b9c0" className="flex flex-col gap-4">
      <Collapse title="Goleadores">
        <ScorersSection
          scorers={p.scorers}
          homeTeamId={homeTeamId}
          homeShort={homeShort}
          awayShort={awayShort}
        />
      </Collapse>

      <Collapse title="Tarjetas">
        <CardsSection
          cards={p.cards}
          homeTeamId={homeTeamId}
          homeShort={homeShort}
          awayShort={awayShort}
        />
      </Collapse>

      <Collapse title="Cambios">
        <SubstitutionsSection
          substitutions={p.substitutions}
          homeTeamId={homeTeamId}
          homeShort={homeShort}
          awayShort={awayShort}
        />
      </Collapse>

      <LineupSection callupPlayers={callupPlayers} />
    </div>
  );
}
