---
to: src/pages/<%= name.toLowerCase() %>/<%= name %>.jsx
---
<%
const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
let testId = ''
for (let i = 0; i < 8; i++) testId += chars.charAt(Math.floor(Math.random() * chars.length))
-%>
import { <%= name %>Provider } from './<%= name %>Context'
import { use<%= name %> } from './use<%= name %>'

function <%= name %>Content() {
  const {} = use<%= name %>()

  return (
    <div test-id="el-<%= testId %>">
      <h1><%= name %></h1>
    </div>
  )
}

export function <%= name %>() {
  return (
    <<%= name %>Provider>
      <<%= name %>Content />
    </<%= name %>Provider>
  )
}
