import { PageTitle } from './PageTitle';

export default {
  title: 'Layout/PageTitle',
  component: PageTitle,
};

export const Default = {
  args: {
    children: 'Dashboard',
  },
};

export const Long = {
  args: {
    children: 'Gestión de convocatorias',
  },
};
