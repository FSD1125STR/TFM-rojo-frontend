# FootMind Design System

Este documento define el **sistema visual y técnico** de FootMind.
Implementado con **React 18 + TailwindCSS 4 + DaisyUI 5**.

---

## Stack técnico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.x | Framework UI |
| TailwindCSS | 4.x | Utilidades CSS |
| DaisyUI | 5.x | Componentes UI |
| Material Icons | - | Sistema de iconos |
| Storybook | 8.x | Documentación de componentes |

---

## Paleta cromática

La aplicación utiliza una paleta monocromática en verdes suaves, asociada al entorno deportivo.

### Colores base (DaisyUI)

| Token DaisyUI | Hex | Uso |
|---------------|-----|-----|
| `primary` | #5C6F68 | Color estructural principal |
| `secondary` | #8AA39B | Secundario / bordes |
| `accent` | #A4F9C8 | Hover / selección |
| `base-100` | #EBFFFD | Fondo general |
| `base-300` | #95D9C3 | Superficies (cards, tablas) |

### Configuración en CSS (DaisyUI v5)

Los colores se configuran mediante variables CSS en `src/index.css`:

```css
[data-theme="light"] {
  --color-primary: oklch(48% 0.05 160);      /* #5C6F68 */
  --color-secondary: oklch(65% 0.06 160);    /* #8AA39B */
  --color-accent: oklch(92% 0.12 155);       /* #A4F9C8 */
  --color-base-100: oklch(98% 0.02 175);     /* #EBFFFD */
  --color-base-300: oklch(83% 0.09 165);     /* #95D9C3 */
}
```

### Reglas de uso
- No añadir colores adicionales fuera de la paleta
- Los verdes **no se usan para texto principal**
- Usar clases de DaisyUI: `btn-primary`, `bg-base-100`, etc.

---

## Tipografía

### Fuente principal
- **Montserrat** (Google Fonts)
- Configurada en `tailwind.config.js`

```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Montserrat', 'system-ui', 'sans-serif'],
    },
  },
}
```

### Escalas tipográficas (TailwindCSS)

| Clase | Uso |
|-------|-----|
| `text-2xl font-bold` | Títulos de página |
| `text-xl font-semibold` | Títulos de sección |
| `text-base` | Texto base |
| `text-sm` | Labels, texto secundario |

---

## Sistema de iconos

### Material Icons (Material Symbols)

```bash
npm install @fontsource/material-icons
```

**Uso:**
```jsx
<span className="material-icons">dashboard</span>
<span className="material-icons">person</span>
<span className="material-icons">sports_soccer</span>
```

### Iconos disponibles

| Icono | Nombre | Uso |
|-------|--------|-----|
| dashboard | `dashboard` | Dashboard |
| person | `person` | Jugadores |
| event | `event` | Convocatorias |
| sports_soccer | `sports_soccer` | Partidos |
| live_tv | `live_tv` | Partido en directo |
| group | `group` | Usuarios |
| light_mode | `light_mode` | Tema claro |
| dark_mode | `dark_mode` | Tema oscuro |
| menu | `menu` | Toggle sidebar |
| chevron_left | `chevron_left` | Colapsar sidebar |

### Componente Icon (recomendado)

```jsx
// src/components/ui/Icon/Icon.jsx
export function Icon({ name, size = 'text-2xl', className = '' }) {
  return (
    <span className={`material-icons ${size} ${className}`}>
      {name}
    </span>
  )
}
```

---

## Componentes DaisyUI

### Botones

```jsx
<button className="btn btn-primary">Primario</button>
<button className="btn btn-secondary">Secundario</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-error">Danger</button>
```

### Cards

```jsx
<div className="card bg-base-100 shadow-md">
  <div className="card-body">
    <h2 className="card-title">Título</h2>
    <p>Contenido</p>
  </div>
</div>
```

### Avatar

```jsx
<div className="avatar">
  <div className="w-12 rounded-full">
    <img src="..." alt="..." />
  </div>
</div>
```

### Menu (Sidebar)

```jsx
<ul className="menu bg-base-100 w-56">
  <li><a>Dashboard</a></li>
  <li><a>Jugadores</a></li>
</ul>
```

---

## Temas (Light/Dark)

DaisyUI soporta temas mediante el atributo `data-theme`:

```html
<html data-theme="light">
<html data-theme="dark">
```

### Hook useTheme

```jsx
const { theme, toggleTheme } = useTheme()
// theme: 'light' | 'dark'
// toggleTheme(): cambia y persiste en localStorage
```

### Persistencia

- Key: `ui.theme`
- Fallback: `prefers-color-scheme`

---

## Estructura de componentes

```
src/
├── components/
│   ├── ui/              # Componentes atómicos
│   │   ├── Button/
│   │   ├── Avatar/
│   │   ├── Card/
│   │   ├── Icon/
│   │   └── ThemeToggle/
│   └── layout/          # Moléculas y organismos de layout
│       ├── AppLogo/
│       ├── Sidebar/
│       ├── HeaderBar/
│       └── AppShell/
├── layouts/             # Layouts de aplicación
│   └── AppLayout/
├── pages/               # Vistas por ruta
├── hooks/               # Custom hooks
└── data/                # Datos mock y constantes
```

---

## Principios de diseño

- **Desktop-first**: Optimizado para uso en escritorio
- **Diseño limpio y funcional**: Sin elementos decorativos innecesarios
- **Jerarquía visual clara**: Uso consistente de espaciado y tipografía
- **Sesiones largas**: Colores suaves, bajo contraste en fondos
- **Consistencia**: Todo componente sigue los tokens de DaisyUI

---

## Testing

Todos los componentes incluyen atributo `test-id` para testing:

```jsx
<button test-id="el-a1b2c3d4">Click</button>
```

Formato: `test-id="el-{hash}"`
