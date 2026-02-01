import { Icon } from './Icon'

export default {
  title: 'UI/Icon',
  component: Icon,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export const Default = {
  args: {
    name: 'home',
  },
}

export const Small = {
  args: {
    name: 'settings',
    size: 'sm',
  },
}

export const Large = {
  args: {
    name: 'sports_soccer',
    size: 'lg',
  },
}

export const AllIcons = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {[
        'home',
        'group',
        'assignment',
        'sports_soccer',
        'cell_tower',
        'manage_accounts',
        'menu',
        'dock_to_right',
        'left_panel_open',
        'light_mode',
        'dark_mode',
        'add',
        'delete',
        'settings',
      ].map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon name={name} />
          <span className="text-xs text-base-content/60">{name}</span>
        </div>
      ))}
    </div>
  ),
}
