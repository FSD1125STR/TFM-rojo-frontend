---
to: src/components/<%= category %>/<%= name %>/index.js
sh: |
  echo ""
  echo "  ✅ Component '<%= name %>' created in src/components/<%= category %>/<%= name %>/"
  echo ""
  echo "  📌 Next steps:"
  echo "     1. Define props in <%= name %>.props.js"
  echo "     2. Add logic in <%= name %>.jsx"
  echo "     3. Write stories in <%= name %>.stories.jsx"
  echo "     4. Import: import { <%= name %> } from '../components/<%= category %>/<%= name %>'"
  echo ""
---
export { <%= name %> } from './<%= name %>'
