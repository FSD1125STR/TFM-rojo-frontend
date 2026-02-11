import { Badge } from './Badge'

export default {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Badge genérico y reutilizable con soporte para iconos, múltiples variantes, tamaños y estilos. Permite colores personalizados con variant="custom".',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Texto del badge',
      control: 'text',
      table: {
        category: 'Contenido',
      },
    },
    variant: {
      description: 'Variante de color del badge. Usa "custom" para colores personalizados.',
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral', 'custom'],
      table: {
        category: 'Apariencia',
      },
    },
    size: {
      description: 'Tamaño del badge',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      table: {
        category: 'Apariencia',
      },
    },
    icon: {
      description: 'Nombre del icono de Material Symbols. Ejemplos: check_circle, star, warning, info, person, settings, favorite, home, search, edit, delete, add, remove, close, menu, arrow_forward, arrow_back, sports_soccer, shield, target',
      control: 'text',
      table: {
        category: 'Icono',
      },
    },
    iconPosition: {
      description: 'Posición del icono',
      control: 'select',
      options: ['left', 'right'],
      table: {
        category: 'Icono',
      },
    },
    pill: {
      description: 'Bordes completamente redondeados',
      control: 'boolean',
      table: {
        category: 'Estilo',
      },
    },
    outline: {
      description: 'Solo borde, sin fondo',
      control: 'boolean',
      table: {
        category: 'Estilo',
      },
    },
    customColor: {
      description: 'Colores personalizados (solo se aplica cuando variant="custom"). Define bg (fondo) y text (texto).',
      control: 'object',
      table: {
        category: 'Color Personalizado',
      },
    },
    className: {
      description: 'Clases CSS adicionales',
      control: 'text',
      table: {
        category: 'Estilo',
      },
    },
  },
}

// Story principal con todos los controles
export const Default = {
  args: {
    children: 'Badge',
    variant: "custom",
    size: 'md',
    icon: '',
    iconPosition: 'left',
    pill: false,
    outline: false,
    customColor: {
      "bg": "",
      "text": "#1d4ed8"
    },
  },
}

// Con icono
export const ConIcono = {
  args: {
    children: 'Activo',
    variant: 'success',
    size: 'md',
    icon: 'check_circle',
    iconPosition: 'left',
    pill: false,
    outline: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge con icono a la izquierda.',
      },
    },
  },
}

// Icono a la derecha
export const IconoDerecha = {
  args: {
    children: 'Siguiente',
    variant: 'primary',
    size: 'md',
    icon: 'arrow_forward',
    iconPosition: 'right',
    pill: false,
    outline: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge con icono a la derecha.',
      },
    },
  },
}

// Estilo Pill
export const EstiloPill = {
  args: {
    children: 'Etiqueta',
    variant: 'secondary',
    size: 'md',
    icon: 'label',
    iconPosition: 'left',
    pill: true,
    outline: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge con bordes completamente redondeados (pill).',
      },
    },
  },
}

// Estilo Outline
export const EstiloOutline = {
  args: {
    children: 'Pendiente',
    variant: 'warning',
    size: 'md',
    icon: 'schedule',
    iconPosition: 'left',
    pill: false,
    outline: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge con solo borde, sin fondo.',
      },
    },
  },
}

// Pill + Outline
export const PillOutline = {
  args: {
    children: 'Info',
    variant: 'info',
    size: 'md',
    icon: 'info',
    iconPosition: 'left',
    pill: true,
    outline: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge combinando estilos pill y outline.',
      },
    },
  },
}

// Color Personalizado
export const ColorPersonalizado = {
  args: {
    children: 'Personalizado',
    variant: 'custom',
    size: 'md',
    icon: 'palette',
    iconPosition: 'left',
    pill: false,
    outline: false,
    customColor: { bg: '#ffe4e6', text: '#be123c' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge con colores personalizados usando variant="custom" y customColor.',
      },
    },
  },
}

// Color Personalizado Outline
export const ColorPersonalizadoOutline = {
  args: {
    children: 'Custom Outline',
    variant: 'custom',
    size: 'md',
    icon: 'brush',
    iconPosition: 'left',
    pill: true,
    outline: true,
    customColor: { bg: '#dbeafe', text: '#1d4ed8' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge con colores personalizados en estilo outline.',
      },
    },
  },
}

// Tamaño extra pequeño
export const TamanoExtraPequeno = {
  args: {
    children: 'XS',
    variant: 'primary',
    size: 'xs',
    icon: 'star',
    iconPosition: 'left',
    pill: false,
    outline: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge en tamaño extra pequeño (xs). Ideal para tarjetas y etiquetas compactas.',
      },
    },
  },
}

// Tamaño pequeño
export const TamanoPequeno = {
  args: {
    children: 'Pequeño',
    variant: 'primary',
    size: 'sm',
    icon: 'star',
    iconPosition: 'left',
    pill: false,
    outline: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge en tamaño pequeño (sm).',
      },
    },
  },
}

// Tamaño grande
export const TamanoGrande = {
  args: {
    children: 'Grande',
    variant: 'primary',
    size: 'lg',
    icon: 'star',
    iconPosition: 'left',
    pill: false,
    outline: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge en tamaño grande (lg).',
      },
    },
  },
}

// Todas las variantes
export const TodasLasVariantes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Badge variant="default" icon="circle">Default</Badge>
      <Badge variant="primary" icon="star">Primary</Badge>
      <Badge variant="secondary" icon="favorite">Secondary</Badge>
      <Badge variant="success" icon="check_circle">Success</Badge>
      <Badge variant="warning" icon="warning">Warning</Badge>
      <Badge variant="error" icon="error">Error</Badge>
      <Badge variant="info" icon="info">Info</Badge>
      <Badge variant="neutral" icon="remove">Neutral</Badge>
      <Badge variant="custom" icon="palette" customColor={{ bg: '#fef3c7', text: '#92400e' }}>Custom</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todas las variantes de color disponibles, incluyendo custom.',
      },
    },
  },
}

// Todos los tamaños
export const TodosLosTamanos = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Badge variant="primary" size="xs" icon="star">Extra Pequeño</Badge>
      <Badge variant="primary" size="sm" icon="star">Pequeño</Badge>
      <Badge variant="primary" size="md" icon="star">Mediano</Badge>
      <Badge variant="primary" size="lg" icon="star">Grande</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparación de los cuatro tamaños disponibles: xs, sm, md y lg.',
      },
    },
  },
}

// Sin icono
export const SinIcono = {
  args: {
    children: 'Sin icono',
    variant: 'neutral',
    size: 'md',
    icon: '',
    iconPosition: 'left',
    pill: false,
    outline: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge sin icono, solo texto.',
      },
    },
  },
}

// Casos de uso
export const CasosDeUso = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '100px', color: '#666' }}>Estados:</span>
        <Badge variant="success" icon="check_circle">Activo</Badge>
        <Badge variant="warning" icon="schedule">Pendiente</Badge>
        <Badge variant="error" icon="cancel">Cancelado</Badge>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '100px', color: '#666' }}>Roles:</span>
        <Badge variant="primary" icon="admin_panel_settings">Admin</Badge>
        <Badge variant="secondary" icon="edit">Editor</Badge>
        <Badge variant="neutral" icon="person">Usuario</Badge>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '100px', color: '#666' }}>Categorías:</span>
        <Badge variant="info" icon="sports_soccer" pill>Fútbol</Badge>
        <Badge variant="info" icon="sports_basketball" pill>Baloncesto</Badge>
        <Badge variant="info" icon="sports_tennis" pill>Tenis</Badge>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ width: '100px', color: '#666' }}>Custom:</span>
        <Badge variant="custom" icon="local_fire_department" customColor={{ bg: '#fee2e2', text: '#dc2626' }}>Urgente</Badge>
        <Badge variant="custom" icon="eco" customColor={{ bg: '#d1fae5', text: '#059669' }}>Eco</Badge>
        <Badge variant="custom" icon="diamond" customColor={{ bg: '#ede9fe', text: '#7c3aed' }}>Premium</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplos de casos de uso comunes para badges, incluyendo colores personalizados.',
      },
    },
  },
}

// Tarjetas (Amarillas y Rojas)
export const Tarjetas = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        Ejemplo de uso de badges xs para tarjetas en historial de partidos:
      </p>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="custom" size="xs" icon="square" customColor={{ bg: '#fef9c3', text: '#ca8a04' }}>1</Badge>
        <Badge variant="custom" size="xs" icon="square" customColor={{ bg: '#fecaca', text: '#dc2626' }}>0</Badge>
        <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>← Sin tarjetas rojas</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="custom" size="xs" icon="square" customColor={{ bg: '#fef9c3', text: '#ca8a04' }}>2</Badge>
        <Badge variant="custom" size="xs" icon="square" customColor={{ bg: '#fecaca', text: '#dc2626' }}>1</Badge>
        <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>← 2 amarillas, 1 roja</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="custom" size="xs" icon="square" customColor={{ bg: '#fef9c3', text: '#ca8a04' }}>0</Badge>
        <Badge variant="custom" size="xs" icon="square" customColor={{ bg: '#fecaca', text: '#dc2626' }}>0</Badge>
        <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>← Sin tarjetas</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de badges en tamaño xs para mostrar tarjetas amarillas y rojas en tablas de historial.',
      },
    },
  },
}

// Iconos disponibles
export const IconosDisponibles = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
        Todos los iconos de Material Symbols utilizados en el proyecto:
      </p>

      <div style={{ marginTop: '8px' }}>
        <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '13px', fontWeight: 600 }}>Navegación / Menú</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['home', 'menu', 'close', 'arrow_back', 'arrow_forward', 'group', 'groups', 'assignment', 'cell_tower', 'manage_accounts', 'notifications'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '13px', fontWeight: 600 }}>Contacto / Información</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['calendar_month', 'calendar_today', 'mail', 'phone', 'location_on', 'bolt', 'cake', 'tag', 'info', 'help'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '13px', fontWeight: 600 }}>Acciones</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['edit', 'delete', 'add', 'remove', 'save', 'send', 'download', 'archive', 'visibility', 'content_copy', 'swap_horiz', 'search', 'settings'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '13px', fontWeight: 600 }}>Usuarios</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['person', 'person_add', 'person_off', 'admin_panel_settings', 'logout', 'badge'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '13px', fontWeight: 600 }}>Estados</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['check_circle', 'cancel', 'warning', 'error', 'schedule', 'pause_circle', 'block', 'healing', 'delete_forever', 'gavel'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '13px', fontWeight: 600 }}>Datos / Estadísticas</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['bar_chart', 'trending_up', 'history', 'emoji_events', 'target'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '13px', fontWeight: 600 }}>Deportes</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['sports_soccer', 'sports_handball', 'sports_basketball', 'sports_tennis', 'shield', 'sync_alt'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '13px', fontWeight: 600 }}>Formas / Decoración</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['star', 'favorite', 'circle', 'square', 'diamond', 'label', 'palette', 'brush', 'eco', 'local_fire_department'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <p style={{ margin: '8px 0 0 0', color: '#999', fontSize: '12px' }}>
        Ver más iconos en: <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">fonts.google.com/icons</a>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Catálogo completo de iconos de Material Symbols utilizados en el proyecto, organizados por categoría.',
      },
    },
  },
}
