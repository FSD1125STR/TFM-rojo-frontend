import { MatchCalendar } from './MatchCalendar';

// Genera una fecha ISO relativa a hoy
function d(offsetDays, hour = 17, minute = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
}

const team = (name, isOurTeam = false) => ({ _id: Math.random().toString(36).slice(2), name, isOurTeam });
const RIVAL_A  = team('FC Barcelona');
const RIVAL_B  = team('Real Madrid');
const RIVAL_C  = team('Atlético de Madrid');
const RIVAL_D  = team('Sevilla FC');
const RIVAL_E  = team('Valencia CF');
const OUR_TEAM = team('FootMind FC', true);

const mockMatches = [
  // ── Pasados — Finalizados ────────────────────────────────────────
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
  // ── Pasados — Cancelados ─────────────────────────────────────────
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
  // ── Hoy — En directo ────────────────────────────────────────────
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
  // ── Futuros — Programados ────────────────────────────────────────
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

export default {
  title: 'UI/MatchCalendar',
  component: MatchCalendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  name: 'Vista mes (con partidos)',
  args: {
    matches: mockMatches,
    defaultView: 'month',
    onSelectMatch: (match) => alert(`Partido seleccionado: ${match.homeTeamId?.name} vs ${match.awayTeamId?.name}`),
  },
};

export const AgendaView = {
  name: 'Vista agenda',
  args: {
    matches: mockMatches,
    defaultView: 'agenda',
  },
};

export const WeekView = {
  name: 'Vista semana',
  args: {
    matches: mockMatches,
    defaultView: 'week',
  },
};

export const Empty = {
  name: 'Sin partidos',
  args: {
    matches: [],
    defaultView: 'month',
  },
};

export const OnlyUpcoming = {
  name: 'Solo partidos futuros',
  args: {
    matches: mockMatches.filter((m) => m.status === 'scheduled'),
    defaultView: 'month',
  },
};
