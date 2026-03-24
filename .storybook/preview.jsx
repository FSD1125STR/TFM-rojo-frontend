import { useEffect } from 'react';
import '../src/index.css';
import { withRouter } from 'storybook-addon-remix-react-router';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      disable: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    withRouter,
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);

      useEffect(() => {
        const init = async () => {
          await import('preline/dist/index.js');
          window.HSStaticMethods?.autoInit();
        };
        init();
      });

      return (
        <div data-theme={theme} className="min-h-screen bg-base-100 p-4">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
