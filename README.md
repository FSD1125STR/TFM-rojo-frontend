# FootMind Frontend

Frontend del proyecto FootMind - Gestión de equipos de fútbol base.

## Stack tecnológico

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 18.x | Framework UI con Hooks |
| Vite | 6.x | Bundler y dev server |
| TailwindCSS | 4.x | Framework CSS utility-first |
| DaisyUI | 5.x | Componentes UI sobre Tailwind |
| Preline UI | 4.x | Advanced Select (multi-select) sobre Tailwind |
| Material Icons | - | Sistema de iconos |
| React Router | 7.x | Enrutamiento SPA |
| Storybook | 10.x | Documentación de componentes |
| react-data-table-component | 7.x | Tablas de datos con sorting y paginación |
| date-fns | 4.x | Utilidades de fechas |
| sweetalert2 | 11.x | Diálogos y confirmaciones |
| axios | 1.x | Cliente HTTP |
| socket.io-client | 4.x | Comunicación en tiempo real (LiveMatch) |
| recharts | 3.x | Gráficas y visualización de datos |
| @dnd-kit | 6.x / 10.x | Drag & drop (convocatorias) |
| @googlemaps/js-api-loader | - | Autocomplete de lugares (Google Places) |

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
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
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
│   ├── graphics/        # Componentes de gráficas (Recharts)
│   │   ├── BarChart/
│   │   ├── EventLineChart/
│   │   ├── PieChart/
│   │   └── ProgressBar/
│   ├── ui/              # Componentes atómicos reutilizables
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── CardListRow/
│   │   ├── CardsList/
│   │   ├── Collapse/
│   │   ├── DataTable/
│   │   ├── DataTableActions/
│   │   ├── DatePicker/
│   │   ├── DateTimePicker/
│   │   ├── Divider/
│   │   ├── FileUpload/
│   │   ├── Icon/
│   │   ├── IconButton/
│   │   ├── InfoItem/
│   │   ├── InsightCard/
│   │   ├── KanbanColumn/
│   │   ├── Modal/
│   │   ├── NotificationBell/
│   │   ├── PageHeader/
│   │   ├── PlacesAutocomplete/
│   │   ├── PlayerCard/
│   │   ├── QuickActions/
│   │   ├── RadioChipGroup/
│   │   ├── SearchInput/
│   │   ├── SearchableSelect/
│   │   ├── SelectFilter/  # Single (DaisyUI) + Multi (Preline)
│   │   ├── StatBox/
│   │   ├── StatsCard/
│   │   ├── Tabs/
│   │   ├── ThemeToggle/
│   │   ├── Timeline/
│   │   └── Toggle/
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
├── config/              # Configuración de permisos, constantes
├── context/             # Context providers (AuthContext)
├── data/                # Datos mock y constantes
├── hooks/               # Custom hooks (useTheme, useSidebar, useAuth, useHeader, usePermissions)
├── pages/               # Vistas asociadas a rutas
│   ├── Dashboard.jsx    # Panel principal con estadísticas
│   ├── LiveMatch.jsx    # Vista de partido en directo
│   ├── auth/            # Login, ForgotPassword, ResetPassword
│   ├── players/         # Módulo jugadores
│   │   ├── components/  # Modales y formularios específicos
│   │   ├── hooks/
│   │   ├── data/
│   │   ├── PlayersList.jsx
│   │   └── PlayerDetail.jsx
│   ├── matches/         # Módulo partidos
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   ├── live/        # Componentes específicos de partido en directo
│   │   ├── MatchesList.jsx
│   │   └── MatchDetail.jsx
│   ├── callups/         # Módulo convocatorias
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   ├── CallupsList.jsx
│   │   └── CallupDetail.jsx
│   ├── users/           # Módulo usuarios
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   ├── UsersList.jsx
│   │   └── UserDetail.jsx
│   └── teams/           # Módulo equipos rivales
│       ├── components/
│       ├── hooks/
│       ├── data/
│       └── TeamsList.jsx
├── services/            # Servicios API (axios)
├── utils/               # Utilidades (alerts, normalize)
├── App.jsx              # Router y rutas
├── main.jsx             # Entry point
└── index.css            # Estilos globales y temas DaisyUI
```

### Criterios de organización

| Carpeta | Contenido |
|---------|-----------|
| `components/ui/` | Componentes atómicos y reutilizables (Button, Card, Icon...) |
| `components/graphics/` | Componentes de visualización de datos (BarChart, PieChart...) |
| `components/layout/` | Componentes de estructura (Sidebar, Header, AppShell...) |
| `pages/` | Vistas asociadas a rutas, organizadas por módulo |
| `pages/{módulo}/` | Lista y detalle de cada entidad (players, matches, etc.) |
| `context/` | Context providers de React (AuthContext) |
| `services/` | Servicios de API (axios) por entidad |
| `hooks/` | Custom hooks de React |
| `utils/` | Funciones utilitarias (alerts, normalize) |
| `data/` | Datos mock, constantes, configuración de menú |

---

## Servicios API

Cada entidad tiene su propio servicio en `src/services/`:

| Servicio | Entidad | Descripción |
|----------|---------|-------------|
| `api.js` | — | Instancia axios base con interceptores de auth |
| `authService.js` | Auth | Login, logout, refresh token, reset password |
| `callupsService.js` | Convocatorias | CRUD + gestión de jugadores convocados |
| `categoriesService.js` | Categorías | Gestión de categorías del club |
| `dashboardService.js` | Dashboard | Estadísticas y métricas del panel principal |
| `liveMatchService.js` | Partido en directo | Eventos de partido, marcador, cambios |
| `matchesService.js` | Partidos | CRUD de partidos |
| `notificationsService.js` | Notificaciones | Lectura y marcado de notificaciones |
| `placesService.js` | Lugares | Autocomplete de instalaciones (Google Places) |
| `playersService.js` | Jugadores | CRUD + lesiones + sanciones |
| `searchService.js` | Búsqueda | Búsqueda global de entidades |
| `teamsService.js` | Equipos rivales | CRUD de equipos contrincantes |
| `userService.js` | Usuarios | CRUD de usuarios del sistema |

---

## Estilos y UI

### DaisyUI + Preline UI

El proyecto utiliza **DaisyUI v5** como sistema de componentes sobre TailwindCSS.
**Preline UI** se usa exclusivamente para el widget Advanced Select (multi-select en `SelectFilter`), coexistiendo con DaisyUI. El widget se estiliza con clases DaisyUI para mantener consistencia visual. Preline se inicializa automáticamente en cada cambio de ruta desde `App.jsx`.

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

Colores personalizados del Design System FootMind. Verde en colores estructurales, grises neutros en fondos:

| Token DaisyUI | Valor oklch | Uso |
|---------------|-------------|-----|
| `primary` | oklch(48% 0.05 160) | Color estructural principal (verde) |
| `secondary` | oklch(65% 0.06 160) | Secundario (verde medio) |
| `accent` | oklch(95% 0.04 160) | Pill sidebar activo (verde claro) |
| `base-100` | oklch(100% 0 0) | Fondo general (blanco puro) |
| `base-200` | oklch(96.5% 0 0) | Superficies secundarias (gris claro) |
| `base-300` | oklch(90% 0.005 260) | Bordes (gris claro) |

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

El proyecto utiliza **Material Symbols** (outlined) a través del componente `<Icon>`:

```jsx
<Icon name="dashboard" size="sm" />  // sm | md | lg
<Icon name="person" size="md" />
<Icon name="sports_soccer" size="lg" />
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
| notifications | `notifications` | Notificaciones |
| shield | `shield` | Equipos rivales |

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

## Sistema de permisos

El control de acceso se gestiona en `src/config/permissions.js`, que mapea claves de permiso a los roles autorizados.

**Roles disponibles:** `administrador`, `direccion`, `entrenador`, `delegado`

El hook `usePermissions` expone `checkPermission(key): boolean`:

```jsx
const { checkPermission } = usePermissions();

if (checkPermission('players.edit')) {
  // mostrar botón de edición
}
```

### Tabla de permisos

| Permiso | administrador | direccion | entrenador | delegado |
|---------|:---:|:---:|:---:|:---:|
| `dashboard.view` | ✓ | ✓ | ✓ | ✓ |
| `players.view` | ✓ | ✓ | ✓ | ✓ |
| `players.create` | ✓ | | | |
| `players.edit` | ✓ | | | |
| `players.injury` | ✓ | | ✓ | ✓ |
| `players.sanction` | ✓ | | | ✓ |
| `matches.view` | ✓ | ✓ | ✓ | ✓ |
| `matches.create` | ✓ | | | |
| `matches.edit` | ✓ | | | |
| `callups.view` | ✓ | ✓ | ✓ | ✓ |
| `callups.create` | ✓ | | ✓ | ✓ |
| `callups.edit` | ✓ | | ✓ | ✓ |
| `live.update` | ✓ | | ✓ | ✓ |
| `stats.view` | ✓ | ✓ | ✓ | ✓ |
| `teams.view` | ✓ | ✓ | ✓ | ✓ |
| `teams.create` | ✓ | | | |
| `teams.edit` | ✓ | | | |
| `teams.delete` | ✓ | | | |
| `users.view` | ✓ | ✓ | | |
| `users.create` | ✓ | | | |
| `users.edit` | ✓ | | | |
| `users.delete` | ✓ | | | |
| `categories.manage` | ✓ | | | |

---

## LiveMatch

La vista `LiveMatch` permite gestionar un partido en tiempo real mediante **Socket.IO**:

- Marcador en vivo
- Registro de eventos (goles, tarjetas, sustituciones)
- Estado del partido (primera parte, segunda parte, finalizado)
- Sincronización en tiempo real entre múltiples clientes conectados

Requiere que el backend tenga el servidor Socket.IO activo en la misma URL que `VITE_API_URL`.

---

## Testing

Todos los componentes incluyen atributo `test-id` para testing:

```jsx
<button test-id="el-a1b2c3d4">Click</button>
```

- **Formato:** `test-id="el-{hash}"` donde `{hash}` son 8 caracteres alfanuméricos
- **Nunca** usar nombres semánticos (`el-player-list`) ni abreviaturas (`el-plyrslst1`)
- El atributo va siempre en el **elemento raíz** del componente

```bash
npm run test
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
| `npm run gen:component` | Genera un componente UI (Hygen) |
| `npm run gen:page` | Genera una nueva página (Hygen) |
| `npm run test` | Ejecuta tests con Vitest |

---

## Documentación adicional

- `docs/DESIGN-SYSTEM.md` - Sistema de diseño completo
