---
to: src/pages/<%= name.toLowerCase() %>/use<%= name %>.js
---
import { use<%= name %>Context } from './<%= name %>Context'

export function use<%= name %>() {
  const context = use<%= name %>Context()

  return {
    ...context,
  }
}
