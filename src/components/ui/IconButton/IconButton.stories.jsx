import { IconButton } from './IconButton'

export default {
  title: 'UI/IconButton',
  component: IconButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
}

export const Ghost = {
  args: {
    icon: 'menu',
    ariaLabel: 'Menu',
    variant: 'ghost',
  },
}

export const Primary = {
  args: {
    icon: 'add',
    ariaLabel: 'Add',
    variant: 'primary',
  },
}

export const Danger = {
  args: {
    icon: 'delete',
    ariaLabel: 'Delete',
    variant: 'danger',
  },
}

export const Small = {
  args: {
    icon: 'settings',
    ariaLabel: 'Settings',
    variant: 'ghost',
    size: 'sm',
  },
}
