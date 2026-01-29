# FootMind – Colores y Tipografía

Este documento define el **sistema visual base** de FootMind.
Está pensado para ser implementado con **React + TailwindCSS** y reutilizado en Storybook.

---

## 🎨 Paleta cromática

La aplicación utiliza una paleta monocromática en verdes suaves, asociada al entorno deportivo.

### Colores base

| Uso | Color |
|---|---|
| Color estructural principal | #5C6F68 |
| Secundario / bordes | #8AA39B |
| Superficies (cards, tablas) | #95D9C3 |
| Hover / selección | #A4F9C8 |
| Fondo general | #EBFFFD |

### Reglas de uso
- No añadir colores adicionales
- No reinterpretar la paleta
- Los verdes **no se usan para texto principal**

---

## ✍️ Tipografía

### Fuente principal
- **Montserrat**
- Uso global en toda la aplicación

### Uso recomendado
- Títulos y encabezados
- Texto base
- Labels de formularios
- Tablas y datos numéricos

---

## 📝 Colores de texto

El texto debe priorizar la legibilidad en una aplicación de uso intensivo.

| Uso | Color |
|---|---|
| Texto principal | Negro o gris muy oscuro |
| Texto secundario | Gris oscuro |
| Texto sobre fondos oscuros | Blanco |

> Los colores verdes quedan reservados para estructura, superficies y acciones.

---

## 🧩 Componentes (criterios visuales)

- Botón primario: fondo #5C6F68, texto blanco
- Botón secundario: fondo claro, borde #8AA39B
- Badges de estado: usar variaciones suaves de la paleta
- Modales:
  - Fondo claro
  - Botón principal destacado
- Tablas:
  - Fondo claro
  - Separadores sutiles
  - Estados: loading, vacío, error

---

## 🎯 Principios de diseño

- Desktop-first
- Diseño limpio y funcional
- Jerarquía visual clara
- Pensado para sesiones largas
- Todo debe ser viable con TailwindCSS
