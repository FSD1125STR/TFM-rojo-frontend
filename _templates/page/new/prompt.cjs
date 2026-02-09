module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Nombre de la página (PascalCase):',
    validate: (value) => {
      if (!value) return 'El nombre es obligatorio'
      if (!/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
        return 'Debe ser PascalCase (ej: Players, MatchDetail, Dashboard)'
      }
      return true
    },
  },
]
