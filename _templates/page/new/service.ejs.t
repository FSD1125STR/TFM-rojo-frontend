---
to: src/pages/<%= name.toLowerCase() %>/<%= name %>Service.js
---
<%
const basePath = '/' + name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') + 's'
const serviceName = name.charAt(0).toLowerCase() + name.slice(1) + 'Service'
-%>
import api from '../../services/api'

export const <%= serviceName %> = {
  async getAll() {
    const response = await api.get('<%= basePath %>')
    return response.data
  },

  async getByFilters(filters) {
    const response = await api.post('<%= basePath %>/filter', filters)
    return response.data
  },

  async getById(id) {
    const response = await api.get(`<%= basePath %>/${id}`)
    return response.data
  },

  async create(data) {
    const response = await api.post('<%= basePath %>', data)
    return response.data
  },

  async update(id, data) {
    const response = await api.put(`<%= basePath %>/${id}`, data)
    return response.data
  },

  async remove(id) {
    const response = await api.delete(`<%= basePath %>/${id}`)
    return response.data
  },
}
