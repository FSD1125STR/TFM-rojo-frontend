---
to: src/components/<%= category %>/<%= name %>/index.js
sh: |
  echo ""
  echo "  ✅ Component '<%= name %>' created in src/components/<%= category %>/<%= name %>/"
  echo ""
  echo "  📌 Next steps:"
  echo "     1. Add props and logic in <%= name %>.jsx"
  echo "     2. Write stories in <%= name %>.stories.jsx"
  echo "     3. Import: import { <%= name %> } from '../components/<%= category %>/<%= name %>'"
  echo ""
---
export { <%= name %> } from './<%= name %>'
