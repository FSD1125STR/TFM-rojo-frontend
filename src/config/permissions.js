export const PERMISSIONS = {
  "users.create":     ["administrador"],
  "users.view":       ["administrador", "direccion"],
  "users.edit":       ["administrador"],
  "users.delete":     ["administrador"],
  "players.create":   ["administrador"],
  "players.edit":     ["administrador"],
  "players.view":     ["administrador", "direccion", "entrenador", "delegado"],
  "players.injury":   ["administrador", "entrenador", "delegado"],
  "players.sanction": ["administrador", "delegado"],
  "matches.create":   ["administrador"],
  "matches.edit":     ["administrador"],
  "matches.view":     ["administrador", "direccion", "entrenador", "delegado"],
  "callups.create":   ["administrador", "entrenador", "delegado"],
  "callups.edit":     ["administrador", "entrenador", "delegado"],
  "callups.view":     ["administrador", "direccion", "entrenador", "delegado"],
  "live.update":      ["administrador", "delegado", "entrenador"],
  "stats.view":       ["administrador", "direccion", "entrenador", "delegado"],
  "categories.manage":["administrador"],
  "teams.view":        ["administrador", "direccion", "entrenador", "delegado"],
  "teams.create":      ["administrador"],
  "teams.edit":        ["administrador"],
  "teams.delete":      ["administrador"],
};

export function hasPermission(role, permission) {
  const allowed = PERMISSIONS[permission];
  return allowed ? allowed.includes(role) : false;
}
