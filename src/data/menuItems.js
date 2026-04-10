export const menuItems = [
  { label: 'Dashboard', to: '/', icon: 'home' },
  { label: 'Jugadores', to: '/jugadores', icon: 'group', permission: 'players.view' },
  { label: 'Convocatorias', to: '/convocatorias', icon: 'assignment', permission: 'callups.view' },
  { label: 'Partidos', to: '/partidos', icon: 'sports_soccer', permission: 'matches.view' },
  { label: 'Partido en directo', to: '/directo', icon: 'cell_tower', permission: 'live.update', liveOnly: true },
  { label: 'Equipos', to: '/equipos', icon: 'shield', permission: 'teams.create' },
  { label: 'Usuarios', to: '/usuarios', icon: 'manage_accounts', permission: 'users.view' },
];
