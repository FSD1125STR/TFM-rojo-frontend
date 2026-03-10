import { fn } from 'storybook/test';
import { CardListRow } from './CardListRow';

export default {
  title: 'UI/CardListRow',
  component: CardListRow,
  parameters: { layout: 'padded' },
};

const sampleActions = [
  { label: 'Ver', icon: 'visibility', onClick: fn() },
  { label: 'Editar', icon: 'edit', onClick: fn() },
  { label: 'Eliminar', icon: 'delete', onClick: fn(), variant: 'danger' },
];

export const Default = {
  args: {
    title: 'Equipo A vs Equipo B',
    badges: [
      { label: 'Programado', variant: 'info', icon: 'schedule' },
      { label: 'Local', variant: 'neutral', outline: true },
    ],
    meta: [
      { icon: 'calendar_today', text: 'sáb, 15 mar 2025 - 18:00' },
      { icon: 'location_on', text: 'Campo Municipal' },
      { icon: 'flag', text: 'Jornada 5' },
    ],
    children: <p className="text-sm text-base-content/40 m-0">Partido no disputado</p>,
    actions: sampleActions,
    row: { id: 1, name: 'Match 1' },
  },
};

export const WithScore = {
  args: {
    title: 'FC Barcelona vs Real Madrid',
    badges: [
      { label: 'Finalizado', variant: 'success', icon: 'check_circle' },
      { label: 'Visitante', variant: 'neutral', outline: true },
    ],
    meta: [
      { icon: 'calendar_today', text: 'dom, 10 mar 2025 - 21:00' },
      { icon: 'location_on', text: 'Camp Nou' },
      { icon: 'flag', text: 'Jornada 28' },
    ],
    children: (
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-base-content/50 m-0">FC Barcelona</p>
          <p className="text-3xl font-bold text-base-content m-0">2</p>
        </div>
        <span className="text-2xl font-bold text-base-content/30">-</span>
        <div className="text-center">
          <p className="text-sm text-base-content/50 m-0">Real Madrid</p>
          <p className="text-3xl font-bold text-base-content m-0">1</p>
        </div>
      </div>
    ),
    actions: sampleActions,
    row: { id: 2, name: 'Match 2' },
  },
};

export const Clickable = {
  args: {
    ...Default.args,
    onClick: fn(),
  },
};

export const WhiteVariant = {
  args: {
    ...Default.args,
    variant: 'white',
  },
};

export const WithoutActions = {
  args: {
    title: 'Equipo A vs Equipo B',
    badges: [
      { label: 'Programado', variant: 'info', icon: 'schedule' },
    ],
    meta: [
      { icon: 'calendar_today', text: 'sáb, 15 mar 2025 - 18:00' },
      { icon: 'location_on', text: 'Campo Municipal' },
    ],
    children: <p className="text-sm text-base-content/40 m-0">Partido no disputado</p>,
    row: { id: 3, name: 'Match 3' },
  },
};

export const Minimal = {
  args: {
    title: 'Simple card with title only',
    children: <p className="text-sm text-base-content/60 m-0">Some basic content</p>,
  },
};
