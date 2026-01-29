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

## Estructura del proyecto

```
├── public/
│   └── vite.svg
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # Componente principal
│   └── index.css         # Estilos globales (TailwindCSS)
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env                  # Variables de entorno (no incluido en git)
```

## Tecnologias

- React 18
- Vite
- TailwindCSS
- ESLint

## Scripts disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la build de produccion |
| `npm run preview` | Previsualiza la build de produccion |
| `npm run lint` | Ejecuta el linter |
