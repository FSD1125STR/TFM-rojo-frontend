import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { InfoItem } from '../../components/ui/InfoItem';
import { StatBox } from '../../components/ui/StatBox';
import { Badge } from '../../components/ui/Badge';
import { Tabs } from '../../components/ui/Tabs';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { ModalPlayer } from './components/ModalPlayer';
import { usePlayerDetailTable } from './hooks/usePlayerDetailTable';
import { usePermissions } from '../../hooks/usePermissions';
import { getPlayerById, getPlayerMatches } from '../../services/playersService';
import {
  formatFecha,
  posicionConfig,
  estadoConfig,
} from './data/mockData';

const historialTabs = [
  { value: 'todos', label: 'Todos' },
  { value: 'ultimos5', label: 'Últimos 5' },
  { value: 'casa', label: 'Casa' },
  { value: 'fuera', label: 'Fuera' },
];

export function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { checkPermission } = usePermissions();

  const [jugador, setJugador] = useState(null);
  const [loading, setLoading] = useState(true);
  const [historial, setHistorial] = useState([]);
  const [loadingHistorial, setLoadingHistorial] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('todos');

  useEffect(() => {
    getPlayerById(id)
      .then(setJugador)
      .catch(console.error)
      .finally(() => setLoading(false));

    getPlayerMatches(id)
      .then(setHistorial)
      .catch(console.error)
      .finally(() => setLoadingHistorial(false));
  }, [id]);

  const historialCompleto = useMemo(
    () => [...historial].reverse(),
    [historial]
  );

  const historialFiltrado = useMemo(() => {
    switch (activeTab) {
      case 'ultimos5':
        return historialCompleto.slice(0, 5);
      case 'casa':
        return historialCompleto.filter((p) => p.esLocal);
      case 'fuera':
        return historialCompleto.filter((p) => !p.esLocal);
      default:
        return historialCompleto;
    }
  }, [activeTab, historialCompleto]);

  const { columns: historialColumns } = usePlayerDetailTable();
  const canEdit = checkPermission('players.edit');

  if (loading) {
    return <div className="p-6 text-center">Cargando...</div>;
  }

  if (!jugador) {
    return (
      <div test-id="el-n0t4f0u5" className="p-6 text-center">
        <h2>Jugador no encontrado</h2>
        <Button variant="primary" className="mt-4" onClick={() => navigate('/jugadores')}>
          Volver a la lista
        </Button>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/jugadores');
  };

  const handleEditar = () => {
    setModalOpen(true);
  };

  const handleGuardar = (datos) => {
    const jugadorActualizado = { ...jugador, ...datos };
    setJugador(jugadorActualizado);
    localStorage.setItem('jugadorEditado', JSON.stringify(jugadorActualizado));
    setModalOpen(false);
  };

  const fechaNacimientoFormateada = formatFecha(jugador.birthDate);

  const promedioMinutos = jugador.matchesPlayed > 0
    ? Math.round(jugador.minutesPlayed / jugador.matchesPlayed)
    : 0;

  const matchDuration = jugador.matchDuration ?? 90;
  const porcentajeParticipacion = jugador.matchesPlayed > 0
    ? Math.round((jugador.minutesPlayed / (jugador.matchesPlayed * matchDuration)) * 100)
    : 0;

  const mediaGoles = jugador.matchesPlayed > 0
    ? (jugador.goals / jugador.matchesPlayed).toFixed(2)
    : '0.00';

  const badges = [
    jugador.goals >= 5 && { label: 'Goleador', icon: 'sports_soccer', tooltip: `${jugador.goals} goles marcados esta temporada` },
    porcentajeParticipacion >= 80 && { label: 'Resistente', icon: 'timer', tooltip: `${porcentajeParticipacion}% de participación · ${promedioMinutos} min/partido de media` },
    jugador.yellowCards === 0 && jugador.redCards === 0 && { label: 'Disciplinado', icon: 'shield', tooltip: 'Sin tarjetas esta temporada' },
  ].filter(Boolean);

  const chartData = historialCompleto.map((p, i) => ({
    jornada: `J${i + 1}`,
    rival: p.rival,
    minutos: p.minutos,
    goles: p.goles,
    tarjeta: p.tarjetasAmarillas > 0 || p.tarjetasRojas > 0,
    tarjetaRoja: p.tarjetasRojas > 0,
  }));

  return (
    <div test-id="el-p7l8y9r0">
      <PageHeader
        title={`${jugador.firstName} ${jugador.lastName}`}
        subtitle={`Dorsal ${jugador.dorsal} · ${jugador.position}`}
        showBack
        onBack={handleBack}
        {...(canEdit && {
          actionLabel: "Editar Jugador",
          actionIcon: "edit",
          onAction: handleEditar,
        })}
      />

      <div className="grid grid-cols-[1fr_1.5fr] gap-4 mt-6">

        <Card title="Información Personal">
          <div className="flex flex-col gap-4">
            <InfoItem
              icon="calendar_month"
              label="Fecha de Nacimiento"
              value={`${fechaNacimientoFormateada} (${jugador.age} años)`}
            />
            <InfoItem icon="mail" label="Email" value={jugador.email} />
            <InfoItem icon="phone" label="Teléfono" value={jugador.phone} />
            <InfoItem icon="location_on" label="Dirección" value={jugador.address} />
            <InfoItem
              icon="sports_soccer"
              label="Posición"
              badge={
                <Badge
                  variant="custom"
                  size="sm"
                  minWidth="140px"
                  icon={posicionConfig[jugador.position]?.icon}
                  customColor={posicionConfig[jugador.position]?.color}
                >
                  {jugador.position}
                </Badge>
              }
            />
            <InfoItem
              icon="bolt"
              label="Estado"
              badge={
                jugador.sanction ? (
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={`Cumplidos: ${jugador.sanction.totalMatches - jugador.sanction.remainingMatches} de ${jugador.sanction.totalMatches} · Restantes: ${jugador.sanction.remainingMatches}`}
                  >
                    <Badge
                      variant={estadoConfig[jugador.status]?.variant || 'neutral'}
                      size="sm"
                      minWidth="140px"
                      icon={estadoConfig[jugador.status]?.icon}
                    >
                      {jugador.status}
                    </Badge>
                  </div>
                ) : (
                  <Badge
                    variant={estadoConfig[jugador.status]?.variant || 'neutral'}
                    size="sm"
                    minWidth="140px"
                    icon={estadoConfig[jugador.status]?.icon}
                  >
                    {jugador.status}
                  </Badge>
                )
              }
            />
          </div>
        </Card>

        <Card title="Estadísticas de la Temporada" icon="trending_up">
          {/* Fila de stats principales */}
          <div className="grid grid-cols-5 gap-4 mb-5">
            <StatBox value={jugador.matchesPlayed} label="Partidos" />
            <StatBox value={jugador.minutesPlayed} label="Minutos" />
            <StatBox value={jugador.goals} label="Goles" />
            <StatBox value={jugador.yellowCards} label="T. Amarillas" color="yellow" />
            <StatBox value={jugador.redCards} label="T. Rojas" color="red" />
          </div>

          {/* Métricas derivadas */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="flex justify-between text-xs text-base-content/60 mb-1">
                <span>Participación</span>
                <span className="font-semibold text-base-content">{porcentajeParticipacion}%</span>
              </div>
              <progress
                className="progress progress-primary w-full h-2"
                value={porcentajeParticipacion}
                max="100"
              />
              <p className="text-xs text-base-content/50 mt-1">{promedioMinutos} min/partido de media</p>
            </div>
            <div>
              <div className="flex justify-between text-xs text-base-content/60 mb-1">
                <span>Media de goles/partido</span>
                <span className="font-semibold text-base-content">{mediaGoles}</span>
              </div>
              <progress
                className="progress progress-success w-full h-2"
                value={Math.min(parseFloat(mediaGoles) * 100, 100)}
                max="100"
              />
              <p className="text-xs text-base-content/50 mt-1">{jugador.goals} goles en {jugador.matchesPlayed} partidos</p>
            </div>
          </div>

          {/* Badges de logro */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((b) => (
                <div key={b.label} className="tooltip tooltip-bottom" data-tip={b.tooltip}>
                  <Badge variant="neutral" size="sm" icon={b.icon}>
                    {b.label}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Gráfico de evolución de minutos */}
          {chartData.length > 0 && (
            <div>
              <p className="text-xs text-base-content/60 mb-2 font-medium">Evolución de minutos jugados</p>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={chartData} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                  <ReferenceLine y={90} stroke="currentColor" strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="jornada" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis domain={[0, 95]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div className="bg-base-100 border border-base-300 rounded px-2 py-1 text-xs shadow">
                          <p className="font-semibold">{d.rival}</p>
                          <p>{d.minutos} min · {d.goles} gol{d.goles !== 1 ? 'es' : ''}</p>
                          {d.tarjetaRoja && <p className="text-error">Tarjeta roja</p>}
                          {!d.tarjetaRoja && d.tarjeta && <p className="text-warning">Tarjeta amarilla</p>}
                        </div>
                      );
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="minutos"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={({ cx, cy, payload }) => {
                      const fill = payload.tarjetaRoja
                        ? '#ef4444'
                        : payload.tarjeta
                          ? '#f59e0b'
                          : payload.goles > 0
                            ? '#22c55e'
                            : '#6366f1';
                      const hasGoal = payload.goles > 0;
                      const hasTarjeta = payload.tarjeta || payload.tarjetaRoja;
                      const strokeColor = hasGoal && hasTarjeta ? '#22c55e' : 'none';
                      const r = hasGoal && hasTarjeta ? 5 : 4;
                      return <circle key={`dot-${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} stroke={strokeColor} strokeWidth={2} />;
                    }}
                    activeDot={({ cx, cy, payload }) => {
                      const fill = payload.tarjetaRoja
                        ? '#ef4444'
                        : payload.tarjeta
                          ? '#f59e0b'
                          : payload.goles > 0
                            ? '#22c55e'
                            : '#6366f1';
                      const hasGoal = payload.goles > 0;
                      const hasTarjeta = payload.tarjeta || payload.tarjetaRoja;
                      const strokeColor = hasGoal && hasTarjeta ? '#22c55e' : 'none';
                      return <circle key={`active-${cx}-${cy}`} cx={cx} cy={cy} r={6} fill={fill} stroke={strokeColor} strokeWidth={2} />;
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {[
                  { fill: '#22c55e', stroke: 'none', label: 'Gol' },
                  { fill: '#f59e0b', stroke: 'none', label: 'Tarjeta' },
                  { fill: '#ef4444', stroke: 'none', label: 'Expulsión' },
                  { fill: '#f59e0b', stroke: '#22c55e', label: 'Tarjeta + Gol' },
                  { fill: '#6366f1', stroke: 'none', label: 'Sin incidencias' },
                ].map((item) => (
                  <span key={item.label} className="inline-flex items-center gap-1 text-xs text-base-content/40">
                    <svg width="10" height="10">
                      <circle cx="5" cy="5" r={item.stroke !== 'none' ? 4 : 4} fill={item.fill} stroke={item.stroke} strokeWidth={item.stroke !== 'none' ? 1.5 : 0} />
                    </svg>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Historial de Partidos">
          <div className="mb-4">
            <Tabs tabs={historialTabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
          {loadingHistorial ? (
            <div className="py-10 text-center text-base-content/50">
              Cargando historial...
            </div>
          ) : historialFiltrado.length > 0 ? (
            <DataTable columns={historialColumns} data={historialFiltrado} />
          ) : (
            <div className="py-10 text-center text-base-content/50">
              No hay partidos para mostrar
            </div>
          )}
        </Card>
      </div>

      {canEdit && (
        <ModalPlayer
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          initialData={jugador}
          onSave={handleGuardar}
        />
      )}
    </div>
  );
}
