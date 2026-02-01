import { HeaderActions } from './HeaderActions'
import { Button } from '../../ui/Button/Button'

export default {
  title: 'Layout/HeaderActions',
  component: HeaderActions,
}

export const Default = {
  args: {
    children: (
      <>
        <Button variant="primary" size="sm">Crear jugador</Button>
        <Button variant="secondary" size="sm">Crear partido</Button>
      </>
    ),
  },
}

export const SingleAction = {
  args: {
    children: <Button variant="primary" size="sm">Nueva convocatoria</Button>,
  },
}
