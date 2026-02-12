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
| Preline UI | 2.x | Advanced Select (multi-select) |
| Material Symbols | - | Sistema de iconos |
| react-data-table-component | 7.x | Tablas de datos |
| Storybook | 8.x | Documentación de componentes |

---

## Paleta cromática

La aplicación utiliza verde en los colores estructurales (primary/secondary) y una base neutra limpia (grises puros) para fondos y superficies, logrando una interfaz profesional y fácil de leer en sesiones largas.

### Colores base (DaisyUI) - Tema Light

| Token DaisyUI | Valor oklch | Uso |
|---------------|-------------|-----|
| `primary` | oklch(48% 0.05 160) | Color estructural principal (verde) |
| `secondary` | oklch(65% 0.06 160) | Secundario (verde medio) |
| `accent` | oklch(95% 0.04 160) | Pill sidebar activo (verde muy claro) |
| `accent-content` | oklch(40% 0.08 160) | Texto sidebar activo (verde oscuro) |
| `neutral` | oklch(45% 0.02 260) | Gris neutro |
| `base-100` | oklch(100% 0 0) | Fondo general (blanco puro) |
| `base-200` | oklch(96.5% 0 0) | Superficies secundarias (gris claro) |
| `base-300` | oklch(90% 0.005 260) | Bordes (gris claro) |
| `base-content` | oklch(20% 0 0) | Texto principal (gris muy oscuro) |

### Configuración en CSS (DaisyUI v5 + Preline)

Los colores se configuran mediante variables CSS en `src/index.css`.
DaisyUI y Preline coexisten: DaisyUI aporta el sistema de componentes y temas, Preline solo se usa para el widget Advanced Select (multi-select).

```css
@import "tailwindcss";
@plugin "daisyui";
@import "preline/variants.css";                        /* variantes Preline (hs-selected:, etc.) */
@source "../node_modules/preline/dist/*.js";           /* Tailwind escanea clases de Preline */

[data-theme="light"] {
  --color-primary: oklch(48% 0.05 160);              /* verde estructural */
  --color-secondary: oklch(65% 0.06 160);            /* verde medio */
  --color-accent: oklch(95% 0.04 160);               /* verde muy claro - pill sidebar */
  --color-accent-content: oklch(40% 0.08 160);       /* verde oscuro - texto sidebar */
  --color-neutral: oklch(45% 0.02 260);              /* gris neutro */
  --color-base-100: oklch(100% 0 0);                 /* blanco puro */
  --color-base-200: oklch(96.5% 0 0);               /* gris claro neutro */
  --color-base-300: oklch(90% 0.005 260);            /* gris claro - bordes */
  --color-base-content: oklch(20% 0 0);              /* gris muy oscuro */
}
```

### Reglas de uso
- No añadir colores adicionales fuera de la paleta
- Los fondos (`base-*`) son **grises neutros**, sin tinte verde
- El verde se reserva para `primary`, `secondary` y `accent` (sidebar activo)
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

### Material Symbols (Outlined)

```bash
npm install material-symbols
```

**Importación en CSS:**
```css
@import 'material-symbols/outlined.css';
```

**Uso con componente Icon:**
```jsx
import { Icon } from '@/components/ui/Icon/Icon'

<Icon name="dashboard" />
<Icon name="person" size="lg" />
<Icon name="sports_soccer" className="text-primary" />
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
| light_mode | `light_mode` | Tema claro |
| dark_mode | `dark_mode` | Tema oscuro |
| menu | `menu` | Toggle sidebar |
| notifications | `notifications` | Notificaciones |
| more_vert | `more_vert` | Menú acciones |

### Componente Icon

```jsx
// src/components/ui/Icon/Icon.jsx
<Icon name="dashboard" />           // tamaño default (md)
<Icon name="person" size="sm" />    // pequeño
<Icon name="edit" size="lg" />      // grande
```

---

## Componentes UI

### Button

```jsx
import { Button } from '@/components/ui/Button/Button'

<Button variant="primary">Primario</Button>
<Button variant="secondary">Secundario</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button size="sm" isLoading>Cargando...</Button>
```

### Card

```jsx
import { Card } from '@/components/ui/Card/Card'

<Card>
  <Card.Body>
    <Card.Title>Título</Card.Title>
    <p>Contenido</p>
    <Card.Actions>
      <Button>Acción</Button>
    </Card.Actions>
  </Card.Body>
</Card>
```

### Avatar

```jsx
import { Avatar } from '@/components/ui/Avatar/Avatar'

<Avatar src="url" alt="Nombre" />
<Avatar name="Juan García" />  // Genera iniciales
<Avatar size="lg" />
```

### IconButton

```jsx
import { IconButton } from '@/components/ui/IconButton/IconButton'

<IconButton icon="edit" ariaLabel="Editar" />
<IconButton icon="delete" variant="ghost" />
```

### DataTable

```jsx
import { DataTable } from '@/components/ui/DataTable'

const columns = [
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'position', label: 'Posición', width: '30%' },
  { key: 'status', label: 'Estado', render: (value) => <Badge>{value}</Badge> },
]

const actions = [
  { label: 'Editar', icon: 'edit', onClick: (row) => edit(row) },
  { label: 'Eliminar', icon: 'delete', onClick: (row) => remove(row), variant: 'danger' },
]

<DataTable
  columns={columns}
  data={players}
  selectable
  onSelectionChange={setSelected}
  actions={actions}
  pagination
  paginationPerPage={10}
/>
```

### SelectFilter

Filtro de selección para DataTable. Soporta modo single (nativo DaisyUI) y multi-select (Preline Advanced Select).

```jsx
import { SelectFilter } from '@/components/ui/SelectFilter'

// Single-select (DaisyUI nativo)
<SelectFilter
  value={position}
  onChange={setPosition}
  options={[
    { value: 'Portero', label: 'Portero' },
    { value: 'Defensa', label: 'Defensa' },
  ]}
  placeholder="Todas las posiciones"
/>

// Multi-select (Preline Advanced Select)
<SelectFilter
  multiple
  value={selectedPositions}
  onChange={setSelectedPositions}
  options={posicionOptions}
  placeholder="Todas las posiciones"
/>
```

El multi-select usa internamente `data-hs-select` de Preline con clases DaisyUI (`bg-base-100`, `border-base-300`, etc.) para mantener consistencia visual con el resto de la UI.

### ThemeToggle

```jsx
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle'

<ThemeToggle />                    // Botón con swap-rotate
<ThemeToggle variant="switch" />   // Solo iconos
```

---

## Componentes Layout

### AppShell

Contenedor principal de la aplicación con sidebar y header.

```jsx
import { AppShell } from '@/components/layout/AppShell/AppShell'

<AppShell>
  <Outlet />  {/* Contenido de la página */}
</AppShell>
```

### HeaderBar

```jsx
import { HeaderBar } from '@/components/layout/HeaderBar/HeaderBar'

<HeaderBar
  title="Dashboard"
  breadcrumbs={[{ label: 'Inicio', to: '/' }, { label: 'Dashboard' }]}
  actions={<Button>Nueva acción</Button>}
/>
```

### Sidebar

Tres modos responsivos:
- **expanded**: Sidebar completo (desktop)
- **collapsed**: Solo iconos (tablet)
- **drawer**: Panel deslizante (mobile)

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
│   ├── ui/                 # Componentes atómicos
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── DataTable/
│   │   ├── Divider/
│   │   ├── Icon/
│   │   ├── IconButton/
│   │   ├── Modal/
│   │   ├── SearchInput/
│   │   ├── SelectFilter/    # Single (DaisyUI) + Multi (Preline Advanced Select)
│   │   └── ThemeToggle/
│   └── layout/             # Componentes de layout
│       ├── AppLogo/
│       ├── AppShell/
│       ├── Breadcrumbs/
│       ├── HeaderActions/
│       ├── HeaderBar/
│       ├── PageTitle/
│       ├── Sidebar/
│       ├── SidebarItem/
│       └── UserCard/
├── data/                   # Datos mock y constantes
├── hooks/                  # Custom hooks (useTheme, useSidebar)
└── pages/                  # Vistas por ruta
```

---

## Principios de diseño

- **Desktop-first**: Optimizado para uso en escritorio
- **Diseño limpio y funcional**: Sin elementos decorativos innecesarios
- **Jerarquía visual clara**: Uso consistente de espaciado y tipografía
- **Sesiones largas**: Fondos neutros (grises puros), bajo contraste
- **Consistencia**: Todo componente sigue los tokens de DaisyUI

---

## Testing

Todos los componentes incluyen atributo `test-id` para testing:

```jsx
<button test-id="el-a1b2c3d4">Click</button>
```

Formato: `test-id="el-{hash}"`

---

## Storybook

Documentación interactiva de componentes:

```bash
npm run storybook
```

Disponible en `http://localhost:6006`
