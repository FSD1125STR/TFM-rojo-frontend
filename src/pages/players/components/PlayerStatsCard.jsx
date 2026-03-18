import { useState, useEffect, useMemo } from 'react';
import { Card } from '../../../components/ui/Card';
import StatsCard from '../../../components/ui/StatsCard/StatsCard';
import { ProgressBar } from '../../../components/ui/ProgressBar/ProgressBar';
import { EventLineChart } from '../../../components/graphics/EventLineChart';

const CHART_LEGEND = [
  { fill: '#22c55e', stroke: 'none', label: 'Gol' },
  { fill: '#f59e0b', stroke: 'none', label: 'Tarjeta' },
  { fill: '#ef4444', stroke: 'none', label: 'Expulsión' },
  { fill: '#f59e0b', stroke: '#22c55e', label: 'Tarjeta + Gol' },
  { fill: '#6366f1', stroke: 'none', label: 'Sin incidencias' },
];

const ACHIEVEMENT_BADGES = (jugador, porcentajeParticipacion, promedioMinutos) => [
  { label: 'Goleador', icon: 'sports_soccer', tooltip: `${jugador.goals} goles marcados esta temporada`, earned: jugador.goals >= 5 },
  { label: 'Resistente', icon: 'timer', tooltip: `${porcentajeParticipacion}% de participación · ${promedioMinutos} min/partido de media`, earned: porcentajeParticipacion >= 80 },
  { label: 'Disciplinado', icon: 'shield', tooltip: jugador.yellowCards === 0 && jugador.redCards === 0 ? 'Sin tarjetas esta temporada' : 'Tiene tarjetas esta temporada', earned: jugador.matchesPlayed > 0 && jugador.yellowCards === 0 && jugador.redCards === 0 },
];

function getDotColor(point) {
  if (point.tarjetaRoja) return '#ef4444';
  if (point.tarjeta) return '#f59e0b';
  if (point.goles > 0) return '#22c55e';
  return '#6366f1';
}

function getDotStroke(point) {
  return point.goles > 0 && (point.tarjeta || point.tarjetaRoja) ? '#22c55e' : 'none';
}

function renderTooltip(d) {
  return (
    <>
      <p className="font-semibold">{d.rival}</p>
      <p>{d.minutos} min · {d.goles} gol{d.goles !== 1 ? 'es' : ''}</p>
      {d.tarjetaRoja && <p className="text-error">Tarjeta roja</p>}
      {!d.tarjetaRoja && d.tarjeta && <p className="text-warning">Tarjeta amarilla</p>}
    </>
  );
}

export function PlayerStatsCard({ jugador, historial }) {
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setBarsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const matchDuration = jugador.matchDuration ?? 90;
  const promedioMinutos = jugador.matchesPlayed > 0 ? Math.round(jugador.minutesPlayed / jugador.matchesPlayed) : 0;
  const porcentajeParticipacion = jugador.matchesPlayed > 0 ? Math.round((jugador.minutesPlayed / (jugador.matchesPlayed * matchDuration)) * 100) : 0;
  const mediaGoles = jugador.matchesPlayed > 0 ? (jugador.goals / jugador.matchesPlayed).toFixed(2) : '0.00';

  const chartData = useMemo(() =>
    [...historial].reverse().map((p, i) => ({
      x: `J${i + 1}`,
      y: p.minutos,
      rival: p.rival,
      minutos: p.minutos,
      goles: p.goles,
      tarjeta: p.tarjetasAmarillas > 0 || p.tarjetasRojas > 0,
      tarjetaRoja: p.tarjetasRojas > 0,
    })),
    [historial]
  );

  const allBadges = ACHIEVEMENT_BADGES(jugador, porcentajeParticipacion, promedioMinutos);

  return (
    <Card>
      <div className="flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl text-primary">trending_up</span>
            <h3 className="text-base font-semibold text-base-content m-0">Estadísticas de la Temporada</h3>
          </div>
          <div className="flex items-center gap-2">
            {allBadges.map((b) => (
              <div key={b.label} className="tooltip tooltip-bottom" data-tip={b.tooltip}>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border shadow-md ${b.earned ? 'bg-[#1e6b3c] text-white border-[#1e6b3c]' : 'bg-base-200 text-base-content/50 border-base-300'}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{b.icon}</span>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <StatsCard layout="vertical" title="Partidos"     value={jugador.matchesPlayed} icon="scoreboard" />
          <StatsCard layout="vertical" title="Minutos"      value={jugador.minutesPlayed} icon="schedule" />
          <StatsCard layout="vertical" title="Goles"        value={jugador.goals}         icon="sports_soccer" />
          <StatsCard layout="vertical" title="T. Amarillas" value={jugador.yellowCards} variant="warning" iconElement={<span className="w-3.5 h-5 rounded-sm bg-warning inline-block" />} />
          <StatsCard layout="vertical" title="T. Rojas"     value={jugador.redCards}    variant="error"   iconElement={<span className="w-3.5 h-5 rounded-sm bg-error inline-block" />} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ProgressBar
            label="Participación"
            value={barsAnimated ? porcentajeParticipacion : 0}
            subtitle={`${promedioMinutos} min/partido de media`}
            color="#1e6b3c"
            animated
          />
          <ProgressBar
            label="Media de goles/partido"
            value={barsAnimated ? Math.min(parseFloat(mediaGoles) * 100, 100) : 0}
            subtitle={`${jugador.goals} goles en ${jugador.matchesPlayed} partidos`}
            color="#4ade80"
            animated
          />
        </div>

        <EventLineChart
          data={chartData}
          xKey="x"
          yKey="y"
          lineColor="#6366f1"
          yDomain={[0, 95]}
          yTicks={[0, 25, 50, 75, 95]}
          referenceY={90}
          height={160}
          label="Evolución de minutos jugados"
          getDotColor={getDotColor}
          getDotStroke={getDotStroke}
          renderTooltip={renderTooltip}
          legend={CHART_LEGEND}
        />

      </div>
    </Card>
  );
}
