# FootMind Frontend

Frontend del proyecto FootMind - Gestión de equipos de fútbol base.

## Stack tecnológico

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 18.x | Framework UI con Hooks |
| Vite | 6.x | Bundler y dev server |
| TailwindCSS | 4.x | Framework CSS utility-first |
| DaisyUI | 5.x | Componentes UI sobre Tailwind |
| Material Icons | - | Sistema de iconos |
| React Router | 7.x | Enrutamiento SPA |
| Storybook | 8.x | Documentación de componentes |

## Requisitos

- Node.js >= 18

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

## Ejecución

```bash
# Modo desarrollo
npm run dev
```

La aplicación arranca en `http://localhost:5173`.

## Storybook

El proyecto incluye Storybook para desarrollo y documentación de componentes.

```bash
npm run storybook
```

Storybook arranca en `http://localhost:6006`.

---

## Arquitectura

### Estructura del proyecto

```
src/
├── assets/              # Logos, favicon, imágenes
├── components/
│   ├── ui/              # Componentes atómicos reutilizables
│   │   ├── Avatar/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Divider/
│   │   ├── Icon/
│   │   ├── IconButton/
│   │   └── ThemeToggle/
│   └── layout/          # Componentes de layout
│       ├── AppLogo/
│       ├── AppShell/
│       ├── Breadcrumbs/
│       ├── HeaderActions/
│       ├── HeaderBar/
│       ├── PageTitle/
│       ├── Sidebar/
│       ├── SidebarItem/
│       └── UserCard/
├── data/                # Datos mock y constantes
├── hooks/               # Custom hooks (useTheme, useSidebar)
├── pages/               # Vistas asociadas a rutas
│   ├── Dashboard.jsx
│   ├── Players.jsx
│   ├── Callups.jsx
│   ├── Matches.jsx
│   ├── LiveMatch.jsx
│   └── Users.jsx
├── App.jsx              # Router y rutas
├── main.jsx             # Entry point
└── index.css            # Estilos globales y temas DaisyUI
```

### Criterios de organización

| Carpeta | Contenido |
|---------|-----------|
| `components/ui/` | Componentes atómicos y reutilizables (Button, Card, Icon...) |
| `components/layout/` | Componentes de estructura (Sidebar, Header, AppShell...) |
| `pages/` | Vistas asociadas a rutas del router |
| `hooks/` | Custom hooks de React |
| `data/` | Datos mock, constantes, configuración de menú |

---

## Estilos y UI

### DaisyUI como Design System

El proyecto utiliza **DaisyUI v5** como sistema de componentes sobre TailwindCSS.

```jsx
// Botones
<button className="btn btn-primary">Primario</button>
<button className="btn btn-secondary">Secundario</button>
<button className="btn btn-ghost">Ghost</button>

// Cards
<div className="card bg-base-100 shadow-md">
  <div className="card-body">Contenido</div>
</div>

// Menu
<ul className="menu">
  <li><a>Item</a></li>
</ul>
```

### Paleta de colores

Colores personalizados del Design System FootMind:

| Token DaisyUI | Color | Uso |
|---------------|-------|-----|
| `primary` | #5C6F68 | Color estructural principal |
| `secondary` | #8AA39B | Secundario / bordes |
| `accent` | #A4F9C8 | Hover / selección |
| `base-100` | #EBFFFD | Fondo general |
| `base-300` | #95D9C3 | Superficies (cards, tablas) |

### Tipografía

- Fuente principal: **Montserrat** (Google Fonts)
- Configurada como `font-sans` en Tailwind

### Temas Light/Dark

DaisyUI soporta temas mediante `data-theme`:

```jsx
// Hook useTheme
const { theme, toggleTheme } = useTheme()
```

- Persistencia en `localStorage` (key: `ui.theme`)
- Fallback a `prefers-color-scheme` del sistema

---

## Sistema de iconos

El proyecto utiliza **Material Icons** como sistema de iconos unificado.

```jsx
<span className="material-icons">dashboard</span>
<span className="material-icons">person</span>
<span className="material-icons">sports_soccer</span>
```

### Iconos principales

| Icono | Nombre | Uso |
|-------|--------|-----|
| dashboard | `dashboard` | Dashboard |
| person | `person` | Jugadores |
| event | `event` | Convocatorias |
| sports_soccer | `sports_soccer` | Partidos |
| live_tv | `live_tv` | Partido en directo |
| group | `group` | Usuarios |

---

## Sistema de layouts

### AppShell

Componente principal que estructura la aplicación:

```
┌─────────────────────────────────────────┐
│ HeaderBar                               │
├──────────┬──────────────────────────────┤
│          │                              │
│ Sidebar  │         Content              │
│          │         (Outlet)             │
│          │                              │
└──────────┴──────────────────────────────┘
```

### Sidebar

- **Expandido**: Muestra icono + label (desktop)
- **Colapsado**: Solo icono (desktop)
- **Drawer**: Panel deslizante (mobile)

---

## Testing

Todos los componentes incluyen atributo `test-id` para testing:

```jsx
<button test-id="el-a1b2c3d4">Click</button>
```

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Preview de build |
| `npm run lint` | Ejecutar linter |
| `npm run storybook` | Iniciar Storybook |
| `npm run build-storybook` | Build de Storybook |

---

## Documentación adicional

- `docs/DESIGN-SYSTEM.md` - Sistema de diseño completo