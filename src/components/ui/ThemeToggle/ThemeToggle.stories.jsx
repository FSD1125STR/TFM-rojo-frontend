import { ThemeToggle } from './ThemeToggle';

export default {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'switch'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
};

export const IconVariant = {
  args: {
    variant: 'icon',
    size: 'md',
  },
};

export const SwitchVariant = {
  args: {
    variant: 'switch',
  },
};

export const Small = {
  args: {
    variant: 'icon',
    size: 'sm',
  },
};
