import { useState, useMemo } from 'react';
import { Card } from '../../../components/ui/Card';
import { Tabs } from '../../../components/ui/Tabs';
import { DataTable } from '../../../components/ui/DataTable';
import { usePlayerDetailTable } from '../hooks/usePlayerDetailTable';

const HISTORIAL_TABS = [
  { value: 'todos', label: 'Todos' },
  { value: 'ultimos5', label: 'Últimos 5' },
  { value: 'casa', label: 'Casa' },
  { value: 'fuera', label: 'Fuera' },
];

export function PlayerMatchHistory({ historial, loading }) {
  const [activeTab, setActiveTab] = useState('todos');
  const { columns } = usePlayerDetailTable();

  const historialCompleto = useMemo(() => [...historial].reverse(), [historial]);

  const historialFiltrado = useMemo(() => {
    switch (activeTab) {
      case 'ultimos5': return historialCompleto.slice(0, 5);
      case 'casa': return historialCompleto.filter((p) => p.esLocal);
      case 'fuera': return historialCompleto.filter((p) => !p.esLocal);
      default: return historialCompleto;
    }
  }, [activeTab, historialCompleto]);

  return (
    <Card title="Historial de Partidos">
      <div className="mb-4">
        <Tabs tabs={HISTORIAL_TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>
      <div className="rounded-xl border border-base-300 bg-base-200/50 shadow-md overflow-hidden">
        <DataTable
          columns={columns}
          data={historialFiltrado}
          isLoading={loading}
          emptyMessage="No hay partidos para mostrar"
        />
      </div>
    </Card>
  );
}
