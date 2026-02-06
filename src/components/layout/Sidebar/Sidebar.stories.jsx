import { Sidebar } from './Sidebar';
import { mockUser } from '../../../data/mockUser';

const handleLogout = () => {
  console.log('Logout clicked');
};

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  argTypes: {
    mode: {
      control: 'select',
      options: ['expanded', 'collapsed', 'drawer'],
    },
  },
  args: {
    user: mockUser,
    onLogout: handleLogout,
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
};

export const Expanded = {
  args: {
    mode: 'expanded',
  },
};

export const Collapsed = {
  args: {
    mode: 'collapsed',
  },
};

export const DrawerClosed = {
  args: {
    mode: 'drawer',
    drawerOpen: false,
  },
};

export const DrawerOpen = {
  args: {
    mode: 'drawer',
    drawerOpen: true,
  },
  decorators: [
    (Story) => (
      <div className="drawer">
        <Story />
      </div>
    ),
  ],
};
