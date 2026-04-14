import { describe, it, expect } from 'vitest';
import { normalizeText } from '../utils/normalize.js';
import { hasPermission } from '../config/permissions.js';

// ─── normalizeText ────────────────────────────────────────────────────────────

describe('normalizeText', () => {
  it('convierte acentos a minúsculas sin tildes', () => {
    expect(normalizeText('Hércules')).toBe('hercules');
  });

  it('devuelve string vacío para input null', () => {
    expect(normalizeText(null)).toBe('');
  });

  it('normaliza strings con espacios y múltiples acentos', () => {
    expect(normalizeText('José María')).toBe('jose maria');
  });
});

// ─── hasPermission ────────────────────────────────────────────────────────────

describe('hasPermission', () => {
  it('devuelve true para un rol con ese permiso', () => {
    expect(hasPermission('administrador', 'users.create')).toBe(true);
  });

  it('devuelve false para un rol sin ese permiso', () => {
    expect(hasPermission('entrenador', 'users.create')).toBe(false);
  });

  it('devuelve false para un permiso inexistente', () => {
    expect(hasPermission('administrador', 'permisoQueNoExiste')).toBe(false);
  });
});
