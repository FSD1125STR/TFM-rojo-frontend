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

export const TodasLasVariantes = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
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

export const TodosLosTamanos = {
  render: () => (
    <div className="flex gap-3 items-center">
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

export const CasosDeUso = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <span className="w-[100px] text-base-content/60">Estados:</span>
        <Badge variant="success" icon="check_circle">Activo</Badge>
        <Badge variant="warning" icon="schedule">Pendiente</Badge>
        <Badge variant="error" icon="cancel">Cancelado</Badge>
      </div>
      <div className="flex gap-3 items-center">
        <span className="w-[100px] text-base-content/60">Roles:</span>
        <Badge variant="primary" icon="admin_panel_settings">Admin</Badge>
        <Badge variant="secondary" icon="edit">Editor</Badge>
        <Badge variant="neutral" icon="person">Usuario</Badge>
      </div>
      <div className="flex gap-3 items-center">
        <span className="w-[100px] text-base-content/60">Categorías:</span>
        <Badge variant="info" icon="sports_soccer" pill>Fútbol</Badge>
        <Badge variant="info" icon="sports_basketball" pill>Baloncesto</Badge>
        <Badge variant="info" icon="sports_tennis" pill>Tenis</Badge>
      </div>
      <div className="flex gap-3 items-center">
        <span className="w-[100px] text-base-content/60">Custom:</span>
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

export const Tarjetas = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="m-0 text-sm text-base-content/60">
        Tarjetas de fútbol con <code>shape=&quot;card&quot;</code> — rectángulo portrait como una tarjeta real:
      </p>
      <div className="flex gap-2 items-center">
        <Badge variant="custom" shape="card" customColor={{ bg: '#F59E0B', text: '#fff' }}>1</Badge>
        <span className="text-sm text-base-content/60 ml-2">&larr; 1 amarilla</span>
      </div>
      <div className="flex gap-2 items-center">
        <Badge variant="custom" shape="card" customColor={{ bg: '#F59E0B', text: '#fff' }}>2</Badge>
        <Badge variant="custom" shape="card" customColor={{ bg: '#EF4444', text: '#fff' }}>1</Badge>
        <span className="text-sm text-base-content/60 ml-2">&larr; 2 amarillas, 1 roja</span>
      </div>
      <div className="flex gap-2 items-center">
        <Badge variant="custom" shape="card" customColor={{ bg: '#F59E0B', text: '#fff' }}>3</Badge>
        <span className="text-sm text-base-content/60 ml-2">&larr; Solo amarillas</span>
      </div>
      <div className="flex gap-2 items-center">
        <Badge variant="custom" shape="card" customColor={{ bg: '#EF4444', text: '#fff' }}>1</Badge>
        <span className="text-sm text-base-content/60 ml-2">&larr; Solo roja</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tarjetas de fútbol usando shape="card" — rectángulo portrait (16×22px) que imita el aspecto de una tarjeta real. Se usa en el listado de jugadores.',
      },
    },
  },
}

export const IconosDisponibles = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="m-0 text-sm text-base-content/60">
        Todos los iconos de Material Symbols utilizados en el proyecto:
      </p>

      <div className="mt-2">
        <p className="mb-2 text-[13px] font-semibold text-base-content/80">Navegación / Menú</p>
        <div className="flex flex-wrap gap-2">
          {['home', 'menu', 'close', 'arrow_back', 'arrow_forward', 'group', 'groups', 'assignment', 'cell_tower', 'manage_accounts', 'notifications'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-base-content/80">Contacto / Información</p>
        <div className="flex flex-wrap gap-2">
          {['calendar_month', 'calendar_today', 'mail', 'phone', 'location_on', 'bolt', 'cake', 'tag', 'info', 'help'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-base-content/80">Acciones</p>
        <div className="flex flex-wrap gap-2">
          {['edit', 'delete', 'add', 'remove', 'save', 'send', 'download', 'archive', 'visibility', 'content_copy', 'swap_horiz', 'search', 'settings'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-base-content/80">Usuarios</p>
        <div className="flex flex-wrap gap-2">
          {['person', 'person_add', 'person_off', 'admin_panel_settings', 'logout', 'badge'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-base-content/80">Estados</p>
        <div className="flex flex-wrap gap-2">
          {['check_circle', 'cancel', 'warning', 'error', 'schedule', 'pause_circle', 'block', 'healing', 'delete_forever', 'gavel'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-base-content/80">Datos / Estadísticas</p>
        <div className="flex flex-wrap gap-2">
          {['bar_chart', 'trending_up', 'history', 'emoji_events', 'target'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-base-content/80">Deportes</p>
        <div className="flex flex-wrap gap-2">
          {['sports_soccer', 'sports_handball', 'sports_basketball', 'sports_tennis', 'shield', 'sync_alt'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-base-content/80">Formas / Decoración</p>
        <div className="flex flex-wrap gap-2">
          {['star', 'favorite', 'circle', 'square', 'diamond', 'label', 'palette', 'brush', 'eco', 'local_fire_department'].map((iconName) => (
            <Badge key={iconName} variant="neutral" size="sm" icon={iconName}>{iconName}</Badge>
          ))}
        </div>
      </div>

      <p className="mt-2 text-xs text-base-content/40">
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
