module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Nombre del componente (PascalCase):',
    validate: (value) => {
      if (!value) return 'El nombre es obligatorio'
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return 'Debe ser PascalCase (ej: Button, UserCard, DataTable)'
      }
      return true
    },
  },
  {
    type: 'select',
    name: 'category',
    message: 'Categoría:',
    choices: ['ui', 'layout'],
  },
]
