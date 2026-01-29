# TFM-rojo-frontend

Frontend del proyecto FootMind - Gestión de equipos de fútbol base.

## Requisitos

- Node.js >= 18

## Instalacion

```bash
npm install
```

## Configuracion

Crea un archivo `.env` en la raiz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

## Ejecucion

```bash
# Modo desarrollo
npm run dev
```

La aplicacion arranca en `http://localhost:5173`.

## Storybook

El proyecto incluye Storybook para el desarrollo y documentacion de componentes.

```bash
# Iniciar Storybook
npm run storybook
```

Storybook arranca en `http://localhost:6006`.

## Design System

El proyecto sigue un sistema de diseño definido en `DESIGN-SYSTEM.md`. Los colores y tipografia estan configurados en TailwindCSS.

### Paleta de colores

| Clase Tailwind | Color | Uso |
|----------------|-------|-----|
| `primary` | #5C6F68 | Color estructural principal |
| `secondary` | #8AA39B | Secundario / bordes |
| `surface` | #95D9C3 | Superficies (cards, tablas) |
| `hover` | #A4F9C8 | Hover / seleccion |
| `background` | #EBFFFD | Fondo general |

### Tipografia

- Fuente principal: **Montserrat**
- Configurada como `font-sans` en Tailwind

### Ejemplos de uso

```jsx
// Boton primario
<button className="bg-primary text-white">Guardar</button>

// Card con superficie
<div className="bg-surface rounded-lg p-4">Contenido</div>

// Fondo de pagina
<main className="bg-background min-h-screen">...</main>
```

## Estructura del proyecto

```
├── .storybook/           # Configuracion de Storybook
├── public/
│   └── vite.svg
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Componente principal
│   ├── index.css         # Estilos globales (TailwindCSS)
│   ├── assets/           # Imágenes, iconos, fuentes                
│   ├── components/       # Componentes reutilizables                
│   ├── context/          # React Context providers                  
│   ├── hooks/            # Custom hooks                             
│   ├── pages/            # Vistas/páginas                           
│   ├── services/         # Llamadas API                             
│   ├── stories/          # Storybook
│   └── utils/            # Funciones auxiliares  
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js    # Colores y tipografia del design system
├── postcss.config.js
├── DESIGN-SYSTEM.md      # Documentacion del sistema de diseño
└── .env                  # Variables de entorno (no incluido en git)
```

## Tecnologias

- React 18
- Vite
- TailwindCSS
- Storybook
- ESLint
- Vitest + Playwright

## Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de produccion |
| `npm run preview` | Previsualiza la build de produccion |
| `npm run lint` | Ejecuta el linter |
| `npm run storybook` | Inicia Storybook en puerto 6006 |
| `npm run build-storybook` | Genera build estatica de Storybook |
