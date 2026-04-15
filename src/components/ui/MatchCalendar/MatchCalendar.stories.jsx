import { fn } from '@storybook/test';
import { MatchCalendar } from './MatchCalendar';

// ── Helpers de fecha ─────────────────────────────────────────────────────────

/** Devuelve una fecha ISO relativa a hoy con la hora indicada. */
function d(offsetDays, hour = 17, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

// ── Equipos ──────────────────────────────────────────────────────────────────

const OUR_TEAM  = { _id: 'ours',  name: 'FootMind FC'        };
const RIVAL_A   = { _id: 'ra',    name: 'FC Barcelona'        };
const RIVAL_B   = { _id: 'rb',    name: 'Real Madrid'         };
const RIVAL_C   = { _id: 'rc',    name: 'Atlético de Madrid'  };
const RIVAL_D   = { _id: 'rd',    name: 'Sevilla FC'          };
const RIVAL_E   = { _id: 're',    name: 'Valencia CF'         };

// ── Datos mock completos ─────────────────────────────────────────────────────

const allMatches = [
  // Finalizados
  {
    _id: '1',
    dateTime: d(-21, 11),
    status: 'finished',
    liveStatus: 'FINISHED',
    homeScore: 3,
    awayScore: 1,
    journey: 7,
    homeTeamId: OUR_TEAM,
    awayTeamId: RIVAL_C,
    venue: { name: 'Estadio Municipal' },
  },
  {
    _id: '2',
    dateTime: d(-14, 11),
    status: 'finished',
    liveStatus: 'FINISHED',
    homeScore: 2,
    awayScore: 1,
    journey: 8,
    homeTeamId: OUR_TEAM,
    awayTeamId: RIVAL_A,
    venue: { name: 'Estadio Municipal' },
  },
  {
    _id: '3',
    dateTime: d(-14, 18, 30),
    status: 'finished',
    liveStatus: 'FINISHED',
    homeScore: 1,
    awayScore: 1,
    journey: 8,
    homeTeamId: RIVAL_E,
    awayTeamId: RIVAL_B,
    venue: { name: 'Mestalla' },
  },
  {
    _id: '4',
    dateTime: d(-7, 18),
    status: 'finished',
    liveStatus: 'FINISHED',
    homeScore: 0,
    awayScore: 3,
    journey: 9,
    homeTeamId: RIVAL_B,
    awayTeamId: OUR_TEAM,
    venue: { name: 'Bernabéu' },
  },
  {
    _id: '5',
    dateTime: d(-7, 20),
    status: 'finished',
    liveStatus: 'FINISHED',
    homeScore: 2,
    awayScore: 0,
    journey: 9,
    homeTeamId: RIVAL_A,
    awayTeamId: RIVAL_C,
    venue: { name: 'Camp Nou' },
  },
  // Cancelados
  {
    _id: '6',
    dateTime: d(-5, 17),
    status: 'cancelled',
    liveStatus: 'NOT_STARTED',
    homeScore: null,
    awayScore: null,
    journey: 9,
    homeTeamId: RIVAL_D,
    awayTeamId: RIVAL_E,
    venue: { name: 'Estadio Ramón Sánchez-Pizjuán' },
  },
  {
    _id: '7',
    dateTime: d(-2, 20),
    status: 'cancelled',
    liveStatus: 'NOT_STARTED',
    homeScore: null,
    awayScore: null,
    journey: 10,
    homeTeamId: OUR_TEAM,
    awayTeamId: RIVAL_C,
    venue: { name: 'Estadio Municipal' },
  },
  // En directo (los tres liveStatus posibles)
  {
    _id: '8',
    dateTime: d(0, 16, 30),
    status: 'scheduled',
    liveStatus: 'FIRST_HALF',
    homeScore: 1,
    awayScore: 0,
    journey: 11,
    homeTeamId: RIVAL_D,
    awayTeamId: OUR_TEAM,
    venue: { name: 'Estadio Ramón Sánchez-Pizjuán' },
  },
  {
    _id: '9',
    dateTime: d(0, 12),
    status: 'scheduled',
    liveStatus: 'HALF_TIME',
    homeScore: 0,
    awayScore: 0,
    journey: 11,
    homeTeamId: RIVAL_A,
    awayTeamId: RIVAL_B,
    venue: { name: 'Camp Nou' },
  },
  {
    _id: '10',
    dateTime: d(0, 19),
    status: 'scheduled',
    liveStatus: 'SECOND_HALF',
    homeScore: 2,
    awayScore: 2,
    journey: 11,
    homeTeamId: OUR_TEAM,
    awayTeamId: RIVAL_E,
    venue: { name: 'Estadio Municipal' },
  },
  // Programados futuros
  {
    _id: '11',
    dateTime: d(5, 17),
    status: 'scheduled',
    liveStatus: 'NOT_STARTED',
    homeScore: null,
    awayScore: null,
    journey: 12,
    homeTeamId: OUR_TEAM,
    awayTeamId: RIVAL_A,
    venue: { name: 'Estadio Municipal' },
  },
  {
    _id: '12',
    dateTime: d(5, 20),
    status: 'scheduled',
    liveStatus: 'NOT_STARTED',
    homeScore: null,
    awayScore: null,
    journey: 12,
    homeTeamId: RIVAL_C,
    awayTeamId: RIVAL_D,
    venue: { name: 'Wanda Metropolitano' },
  },
  {
    _id: '13',
    dateTime: d(12, 19),
    status: 'scheduled',
    liveStatus: 'NOT_STARTED',
    homeScore: null,
    awayScore: null,
    journey: 13,
    homeTeamId: RIVAL_A,
    awayTeamId: OUR_TEAM,
    venue: { name: 'Camp Nou' },
  },
  {
    _id: '14',
    dateTime: d(12, 12),
    status: 'scheduled',
    liveStatus: 'NOT_STARTED',
    homeScore: null,
    awayScore: null,
    journey: 13,
    homeTeamId: RIVAL_B,
    awayTeamId: RIVAL_E,
    venue: { name: 'Bernabéu' },
  },
  {
    _id: '15',
    dateTime: d(19, 12),
    status: 'scheduled',
    liveStatus: 'NOT_STARTED',
    homeScore: null,
    awayScore: null,
    journey: 14,
    homeTeamId: OUR_TEAM,
    awayTeamId: RIVAL_B,
    venue: { name: 'Estadio Municipal' },
  },
];

// Subconjuntos reutilizables
const liveMatches      = allMatches.filter((m) => ['FIRST_HALF', 'HALF_TIME', 'SECOND_HALF'].includes(m.liveStatus));
const finishedMatches  = allMatches.filter((m) => m.status === 'finished');
const cancelledMatches = allMatches.filter((m) => m.status === 'cancelled');
const upcomingMatches  = allMatches.filter((m) => m.status === 'scheduled' && m.liveStatus === 'NOT_STARTED');

// ── Meta ─────────────────────────────────────────────────────────────────────

export default {
  title: 'UI/MatchCalendar',
  component: MatchCalendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    defaultView: {
      control: 'select',
      options: ['month', 'week', 'agenda'],
      description: 'Vista inicial del calendario',
    },
    matches: {
      control: false,
      description: 'Array de partidos a mostrar',
    },
    onSelectMatch: {
      control: false,
      description: 'Callback al pulsar un partido',
    },
  },
  args: {
    onSelectMatch: fn(),
  },
};

// ── Stories ───────────────────────────────────────────────────────────────────

/** Vista mes con todos los estados posibles: programado, finalizado, cancelado y en directo. */
export const Default = {
  name: 'Vista mes — todos los estados',
  args: {
    matches: allMatches,
    defaultView: 'month',
  },
};

/** Vista semana. Muestra el renderizado en bloque vertical con dot pulsante en partidos en directo. */
export const WeekView = {
  name: 'Vista semana — todos los estados',
  args: {
    matches: allMatches,
    defaultView: 'week',
  },
};

/** Vista agenda (listMonth). Muestra venue, badge "Live" y score en cada fila. */
export const AgendaView = {
  name: 'Vista agenda — todos los estados',
  args: {
    matches: allMatches,
    defaultView: 'agenda',
  },
};

/** Los tres liveStatus (FIRST_HALF, HALF_TIME, SECOND_HALF) en vista mes.
 *  Verifica que el dot pulsante y el score aparecen correctamente. */
export const LiveMatches = {
  name: 'En directo — vista mes',
  args: {
    matches: liveMatches,
    defaultView: 'month',
  },
};

/** Los tres liveStatus en vista semana.
 *  Verifica el bloque vertical con dot pulsante y score. */
export const LiveMatchesWeek = {
  name: 'En directo — vista semana',
  args: {
    matches: liveMatches,
    defaultView: 'week',
  },
};

/** Los tres liveStatus en vista agenda.
 *  Verifica el badge "Live" y que se muestra el score en la columna derecha. */
export const LiveMatchesAgenda = {
  name: 'En directo — vista agenda',
  args: {
    matches: liveMatches,
    defaultView: 'agenda',
  },
};

/** Solo partidos finalizados. Verifica que se muestran los marcadores finales en las tres vistas. */
export const FinishedMatches = {
  name: 'Solo finalizados',
  args: {
    matches: finishedMatches,
    defaultView: 'month',
  },
};

/** Solo partidos cancelados. Verifica el color de error y la ausencia de marcadores. */
export const CancelledMatches = {
  name: 'Solo cancelados',
  args: {
    matches: cancelledMatches,
    defaultView: 'month',
  },
};

/** Solo partidos futuros programados. Verifica que se muestra la hora en lugar de un marcador. */
export const UpcomingMatches = {
  name: 'Solo programados',
  args: {
    matches: upcomingMatches,
    defaultView: 'month',
  },
};

/** Sin partidos. Verifica el mensaje "No hay partidos en este período" en vista agenda. */
export const Empty = {
  name: 'Sin partidos',
  args: {
    matches: [],
    defaultView: 'agenda',
  },
};

/** Sin partidos en vista mes. Verifica que el calendario se renderiza sin errores aunque no haya eventos. */
export const EmptyMonth = {
  name: 'Sin partidos — vista mes',
  args: {
    matches: [],
    defaultView: 'month',
  },
};
