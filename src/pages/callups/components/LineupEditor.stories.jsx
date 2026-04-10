import { useState } from 'react';
import { LineupEditor } from './LineupEditor';

const MOCK_PLAYERS = [
  { id: '1', fullName: 'Carlos García', dorsal: 1, position: 'POR', lineupRole: 'starter' },
  { id: '2', fullName: 'Marcos López', dorsal: 4, position: 'DEF', lineupRole: 'starter' },
  { id: '3', fullName: 'Javi Ruiz', dorsal: 5, position: 'DEF', lineupRole: 'starter' },
  { id: '4', fullName: 'David Sanz', dorsal: 6, position: 'DEF', lineupRole: 'starter' },
  { id: '5', fullName: 'Pablo Moreno', dorsal: 3, position: 'DEF', lineupRole: 'starter' },
  { id: '6', fullName: 'Luis Torres', dorsal: 8, position: 'MED', lineupRole: 'starter' },
  { id: '7', fullName: 'Sergio Díaz', dorsal: 10, position: 'MED', lineupRole: 'starter' },
  { id: '8', fullName: 'Álvaro Jiménez', dorsal: 7, position: 'MED', lineupRole: 'starter' },
  { id: '9', fullName: 'Raúl Fernández', dorsal: 9, position: 'DEL', lineupRole: 'starter' },
  { id: '10', fullName: 'Adrián Martínez', dorsal: 11, position: 'DEL', lineupRole: 'starter' },
  { id: '11', fullName: 'Tomás Pérez', dorsal: 2, position: 'DEF', lineupRole: 'starter' },
  { id: '12', fullName: 'Nacho Gil', dorsal: 13, position: 'POR', lineupRole: 'substitute' },
  { id: '13', fullName: 'Roberto Vega', dorsal: 14, position: 'MED', lineupRole: 'substitute' },
  { id: '14', fullName: 'Fran Molina', dorsal: 15, position: 'DEL', lineupRole: null },
];

export default {
  title: 'Pages/Callups/LineupEditor',
  component: LineupEditor,
};

function InteractiveLineupEditor({ initialPlayers, editable }) {
  const [players, setPlayers] = useState(initialPlayers);

  const handleToggle = (playerId) => {
    setPlayers((curr) => {
      const starterCount = curr.filter((p) => p.lineupRole === 'starter').length;
      return curr.map((p) => {
        if (p.id !== playerId) return p;
        if (p.lineupRole === 'starter') return { ...p, lineupRole: null };
        if (p.lineupRole === 'substitute') return { ...p, lineupRole: starterCount < 11 ? 'starter' : null };
        return { ...p, lineupRole: starterCount < 11 ? 'starter' : 'substitute' };
      });
    });
  };

  const starterCount = players.filter((p) => p.lineupRole === 'starter').length;

  return (
    <div className="max-w-sm p-4">
      <LineupEditor
        calledPlayers={players}
        onToggle={handleToggle}
        onSave={() => alert('Guardado!')}
        starterCount={starterCount}
        isValid={starterCount === 11}
        saving={false}
        editable={editable}
      />
    </div>
  );
}

export const Completo = () => <InteractiveLineupEditor initialPlayers={MOCK_PLAYERS} editable={true} />;
export const SinAsignar = () => (
  <InteractiveLineupEditor
    initialPlayers={MOCK_PLAYERS.map((p) => ({ ...p, lineupRole: null }))}
    editable={true}
  />
);
export const SoloLectura = () => <InteractiveLineupEditor initialPlayers={MOCK_PLAYERS} editable={false} />;
