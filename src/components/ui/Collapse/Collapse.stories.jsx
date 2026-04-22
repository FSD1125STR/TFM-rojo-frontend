import { Collapse } from './Collapse';

export default {
  title: 'UI/Collapse',
  component: Collapse,
  args: {
    title: 'Goleadores',
    defaultOpen: false,
  },
};

export const Closed = {
  args: {
    title: 'Sección plegada',
    children: <p className="text-sm">Contenido de la sección.</p>,
  },
};

export const Open = {
  args: {
    title: 'Sección desplegada',
    defaultOpen: true,
    children: <p className="text-sm">Contenido de la sección.</p>,
  },
};

export const WithIcon = {
  args: {
    title: 'Con icono',
    icon: 'sports_soccer',
    defaultOpen: true,
    children: <p className="text-sm">Contenido con icono en el header.</p>,
  },
};
