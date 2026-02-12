---
to: src/components/<%= category %>/<%= name %>/<%= name %>.jsx
---
<%
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
let testId = ''
for (let i = 0; i < 8; i++) testId += chars.charAt(Math.floor(Math.random() * chars.length))
-%>
import { <%= name %>Props } from './<%= name %>.props'

export function <%= name %>({ className = '', ...props }) {
  return (
    <div test-id="el-<%= testId %>" className={className} {...props}>
      <%= name %>
    </div>
  )
}

<%= name %>.propTypes = <%= name %>Props
