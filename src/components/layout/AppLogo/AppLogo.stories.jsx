import { AppLogo } from './AppLogo'

export default {
  title: 'Layout/AppLogo',
  component: AppLogo,
}

export const Expanded = {
  args: {
    collapsed: false,
  },
}

export const Collapsed = {
  args: {
    collapsed: true,
  },
}
