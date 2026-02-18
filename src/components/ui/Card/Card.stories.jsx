import { Card } from './Card';

export default {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Contenedor genérico para agrupar contenido con título e icono opcional.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Título del card',
      control: 'text',
    },
    icon: {
      description: 'Icono del título (Material Symbols)',
      control: 'text',
    },
    variant: {
      description: 'Variante de estilo',
      control: 'select',
      options: ['default', 'primary', 'secondary', 'white'],
    },
    padding: {
      description: 'Tamaño del padding',
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export const Default = {
  args: {
    title: 'Título del Card',
    icon: 'info',
    children: <p className="m-0">Contenido del card. Puedes incluir cualquier contenido aquí.</p>,
  },
};

export const SinTitulo = {
  args: {
    children: <p className="m-0">Card sin título, solo contenido.</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Card sin título para usar como contenedor simple.',
      },
    },
  },
};

export const TodasLasVariantes = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card title="Variante Default" icon="star" variant="default">
        <p className="m-0">Fondo verde claro, el estilo principal de la app.</p>
      </Card>
      <Card title="Variante Primary" icon="star" variant="primary">
        <p className="m-0">Fondo verde más intenso.</p>
      </Card>
      <Card title="Variante Secondary" icon="star" variant="secondary">
        <p className="m-0">Fondo gris neutro.</p>
      </Card>
      <Card title="Variante White" icon="star" variant="white">
        <p className="m-0">Fondo blanco limpio.</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparación de todas las variantes de color disponibles.',
      },
    },
  },
};

export const TodosLosPaddings = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card title="Padding None" padding="none">
        <div className="bg-primary/20 p-2">Contenido sin padding</div>
      </Card>
      <Card title="Padding SM" padding="sm">
        <p className="m-0">Padding pequeño (12px)</p>
      </Card>
      <Card title="Padding MD" padding="md">
        <p className="m-0">Padding mediano (20px) - por defecto</p>
      </Card>
      <Card title="Padding LG" padding="lg">
        <p className="m-0">Padding grande (28px)</p>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparación de todos los tamaños de padding.',
      },
    },
  },
};
