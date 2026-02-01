

import tailwindPostcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../src/components/layout/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "storybook-addon-remix-react-router"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(cfg) {
    cfg.css ??= {};
    cfg.css.postcss = {
      plugins: [tailwindPostcss(), autoprefixer()],
    };
    return cfg;
  },
};
export default config;