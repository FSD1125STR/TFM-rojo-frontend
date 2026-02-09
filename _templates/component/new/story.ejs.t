---
to: src/components/<%= category %>/<%= name %>/<%= name %>.stories.jsx
---
import { <%= name %> } from './<%= name %>'

export default {
  title: '<%= category === 'ui' ? 'UI' : 'Layout' %>/<%= name %>',
  component: <%= name %>,
}

export const Default = {
  args: {},
}
