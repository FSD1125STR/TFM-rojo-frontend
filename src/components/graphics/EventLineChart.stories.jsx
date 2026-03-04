import { EventLineChart } from './EventLineChart';

export default {
  title: 'Graphics/EventLineChart',
  component: EventLineChart,
  argTypes: {
    lineColor: { control: 'color' },
    height: { control: 'number' },
    referenceY: { control: 'number' },
    label: { control: 'text' },
    xKey: { control: 'text' },
    yKey: { control: 'text' },
  },
};

// ---------------------------------------------------------------------------
// Shared mock data
// ---------------------------------------------------------------------------

const rendimientoData = [
  { jornada: 'J1', rendimiento: 6.5 },
  { jornada: 'J2', rendimiento: 7.2 },
  { jornada: 'J3', rendimiento: 5.8 },
  { jornada: 'J4', rendimiento: 8.1 },
  { jornada: 'J5', rendimiento: 7.6 },
  { jornada: 'J6', rendimiento: 6.9 },
  { jornada: 'J7', rendimiento: 8.4 },
  { jornada: 'J8', rendimiento: 7.0 },
];

// Events: each point carries an event type used by getDotColor / getDotStroke
const eventosData = [
  { jornada: 'J1', minuto: 10, tipo: 'default' },
  { jornada: 'J2', minuto: 22, tipo: 'gol' },
  { jornada: 'J3', minuto: 34, tipo: 'amarilla' },
  { jornada: 'J4', minuto: 45, tipo: 'gol' },
  { jornada: 'J5', minuto: 58, tipo: 'roja' },
  { jornada: 'J6', minuto: 67, tipo: 'default' },
  { jornada: 'J7', minuto: 72, tipo: 'gol' },
  { jornada: 'J8', minuto: 89, tipo: 'amarilla' },
];

// ---------------------------------------------------------------------------
// Color helpers reused across stories
// ---------------------------------------------------------------------------

const EVENT_COLORS = {
  gol: '#22c55e',
  amarilla: '#f59e0b',
  roja: '#ef4444',
  default: '#6366f1',
};

const EVENT_STROKES = {
  gol: '#16a34a',
  amarilla: '#d97706',
  roja: '#dc2626',
  default: 'none',
};

function getDotColorByTipo(payload) {
  return EVENT_COLORS[payload.tipo] ?? EVENT_COLORS.default;
}

function getDotStrokeByTipo(payload) {
  return EVENT_STROKES[payload.tipo] ?? EVENT_STROKES.default;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default = {
  args: {
    data: rendimientoData,
    xKey: 'jornada',
    yKey: 'rendimiento',
    label: 'Rendimiento por jornada',
    lineColor: '#6366f1',
    yDomain: [0, 10],
    yTicks: [0, 2, 4, 6, 8, 10],
    height: 200,
  },
};

export const WithColoredDots = {
  args: {
    data: eventosData,
    xKey: 'jornada',
    yKey: 'minuto',
    label: 'Minuto del evento por jornada',
    lineColor: '#6366f1',
    yDomain: [0, 90],
    yTicks: [0, 15, 30, 45, 60, 75, 90],
    height: 220,
    getDotColor: getDotColorByTipo,
    getDotStroke: getDotStrokeByTipo,
  },
};

export const WithReferenceLineAndLegend = {
  args: {
    data: eventosData,
    xKey: 'jornada',
    yKey: 'minuto',
    label: 'Eventos con referencia al descanso',
    lineColor: '#6366f1',
    yDomain: [0, 90],
    yTicks: [0, 15, 30, 45, 60, 75, 90],
    height: 220,
    referenceY: 45,
    getDotColor: getDotColorByTipo,
    getDotStroke: getDotStrokeByTipo,
    renderTooltip: (payload) => (
      <span>
        <strong>{payload.jornada}</strong> — min. {payload.minuto} ({payload.tipo})
      </span>
    ),
    legend: [
      { fill: '#22c55e', stroke: '#16a34a', label: 'Gol' },
      { fill: '#f59e0b', stroke: '#d97706', label: 'T. Amarilla' },
      { fill: '#ef4444', stroke: '#dc2626', label: 'T. Roja' },
      { fill: '#6366f1', stroke: 'none', label: 'Otro evento' },
    ],
  },
};

export const EmptyData = {
  args: {
    data: [],
    xKey: 'jornada',
    yKey: 'rendimiento',
    label: 'Sin datos disponibles',
  },
};
