import { Sidebar } from './Sidebar'

export default {
  title: 'Layout/Sidebar',
  component: Sidebar,
  argTypes: {
    mode: {
      control: 'select',
      options: ['expanded', 'collapsed', 'drawer'],
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
}

export const Expanded = {
  args: {
    mode: 'expanded',
  },
}

export const Collapsed = {
  args: {
    mode: 'collapsed',
  },
}

export const DrawerClosed = {
  args: {
    mode: 'drawer',
    drawerOpen: false,
  },
}

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
}
