import { UserCard } from './UserCard';

export default {
  title: 'Layout/UserCard',
  component: UserCard,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact'],
    },
  },
};

const user = {
  name: 'Dani Rodríguez',
  role: 'Entrenador',
  avatar: null,
};

export const Default = {
  args: {
    user,
    variant: 'default',
  },
};

export const Compact = {
  args: {
    user,
    variant: 'compact',
  },
};

export const Collapsed = {
  args: {
    user,
    collapsed: true,
  },
};

export const WithAvatar = {
  args: {
    user: {
      ...user,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dani',
    },
  },
};
