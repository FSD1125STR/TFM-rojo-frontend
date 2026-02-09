---
to: src/pages/<%= name.toLowerCase() %>/<%= name %>Context.jsx
---
import { createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'

const <%= name %>Context = createContext(null)

export function <%= name %>Provider({ children }) {
  const value = useMemo(() => ({}), [])

  return (
    <<%= name %>Context.Provider value={value}>
      {children}
    </<%= name %>Context.Provider>
  )
}

<%= name %>Provider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function use<%= name %>Context() {
  const context = useContext(<%= name %>Context)
  if (!context) {
    throw new Error('use<%= name %>Context debe usarse dentro de <%= name %>Provider')
  }
  return context
}
