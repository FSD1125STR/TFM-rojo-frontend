import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatBox } from '../components/ui/StatBox/StatBox.jsx';
import { Badge } from '../components/ui/Badge/Badge.jsx';

// ─── StatBox ──────────────────────────────────────────────────────────────────

describe('StatBox', () => {
  it('renderiza el prop value en pantalla', () => {
    render(<StatBox value={42} label="Goles" />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renderiza el prop label en pantalla', () => {
    render(<StatBox value={10} label="Asistencias" />);
    expect(screen.getByText('Asistencias')).toBeInTheDocument();
  });

  it('aplica la clase text-warning cuando color es yellow', () => {
    render(<StatBox value={5} label="Amarillas" color="yellow" />);
    const valueEl = screen.getByText('5');
    expect(valueEl).toHaveClass('text-warning');
  });
});

// ─── Badge ────────────────────────────────────────────────────────────────────

describe('Badge', () => {
  it('renderiza el texto de children', () => {
    render(<Badge>Activo</Badge>);
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });

  it('aplica borderRadius 9999px cuando pill es true', () => {
    render(<Badge pill>Titular</Badge>);
    const span = screen.getByText('Titular').closest('span[test-id]');
    expect(span).toHaveStyle({ borderRadius: '9999px' });
  });

  it('aplica el backgroundColor de success cuando variant es success', () => {
    render(<Badge variant="success">OK</Badge>);
    const span = screen.getByText('OK').closest('span[test-id]');
    expect(span).toHaveStyle({ backgroundColor: 'oklch(85% 0.15 145)' });
  });
});
