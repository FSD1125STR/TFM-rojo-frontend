import { Avatar } from './Avatar'

export default {
  title: 'UI/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
}

export const WithImage = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    name: 'Dani Rodríguez',
    size: 'md',
  },
}

export const WithInitials = {
  args: {
    name: 'Dani Rodríguez',
    size: 'md',
  },
}

export const SingleName = {
  args: {
    name: 'Admin',
    size: 'md',
  },
}

export const ExtraSmall = {
  args: {
    name: 'Dani Rodríguez',
    size: 'xs',
  },
}

export const Small = {
  args: {
    name: 'Dani Rodríguez',
    size: 'sm',
  },
}

export const Large = {
  args: {
    name: 'Dani Rodríguez',
    size: 'lg',
  },
}
