---
to: src/pages/<%= name.toLowerCase() %>/index.js
sh: |
  echo ""
  echo "  ✅ Page '<%= name %>' created in src/pages/<%= name.toLowerCase() %>/"
  echo ""
  echo "  📌 Next step: add route in src/App.jsx:"
  echo ""
  echo "     import { <%= name %> } from './pages/<%= name.toLowerCase() %>'"
  echo "     <Route path=\"/<%= name.toLowerCase() %>\" element={<<%= name %> />} />"
  echo ""
---
export { <%= name %> } from './<%= name %>'
