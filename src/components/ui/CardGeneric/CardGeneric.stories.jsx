import { CardGeneric } from './CardGeneric'

export default {
  title: 'UI/CardGeneric',
  component: CardGeneric,
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
}

// Story básica
export const Default = {
  args: {
    title: 'Título del Card',
    icon: 'info',
    children: <p style={{ margin: 0 }}>Contenido del card. Puedes incluir cualquier contenido aquí.</p>,
  },
}

// Sin título
export const SinTitulo = {
  args: {
    children: <p style={{ margin: 0 }}>Card sin título, solo contenido.</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Card sin título para usar como contenedor simple.',
      },
    },
  },
}

// Todas las variantes
export const TodasLasVariantes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CardGeneric title="Variante Default" icon="star" variant="default">
        <p style={{ margin: 0 }}>Fondo verde claro, el estilo principal de la app.</p>
      </CardGeneric>
      <CardGeneric title="Variante Primary" icon="star" variant="primary">
        <p style={{ margin: 0 }}>Fondo verde más intenso.</p>
      </CardGeneric>
      <CardGeneric title="Variante Secondary" icon="star" variant="secondary">
        <p style={{ margin: 0 }}>Fondo gris neutro.</p>
      </CardGeneric>
      <CardGeneric title="Variante White" icon="star" variant="white">
        <p style={{ margin: 0 }}>Fondo blanco limpio.</p>
      </CardGeneric>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparación de todas las variantes de color disponibles.',
      },
    },
  },
}

// Todos los paddings
export const TodosLosPaddings = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <CardGeneric title="Padding None" padding="none">
        <div style={{ background: 'oklch(85% 0.10 155)', padding: '8px' }}>Contenido sin padding</div>
      </CardGeneric>
      <CardGeneric title="Padding SM" padding="sm">
        <p style={{ margin: 0 }}>Padding pequeño (12px)</p>
      </CardGeneric>
      <CardGeneric title="Padding MD" padding="md">
        <p style={{ margin: 0 }}>Padding mediano (20px) - por defecto</p>
      </CardGeneric>
      <CardGeneric title="Padding LG" padding="lg">
        <p style={{ margin: 0 }}>Padding grande (28px)</p>
      </CardGeneric>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparación de todos los tamaños de padding.',
      },
    },
  },
}

