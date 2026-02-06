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
| Material Symbols | - | Sistema de iconos |
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
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Divider/
│   │   ├── Icon/
│   │   ├── IconButton/
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
- **Sesiones largas**: Colores suaves, bajo contraste en fondos
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
