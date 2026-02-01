import { Card } from './Card'
import { Button } from '../Button/Button'

export default {
  title: 'UI/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'flat'],
    },
  },
}

export const Default = {
  args: {
    variant: 'default',
    children: (
      <>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <p>This is a card with some content.</p>
          <Card.Actions className="justify-end">
            <Button variant="primary" size="sm">Action</Button>
          </Card.Actions>
        </Card.Body>
      </>
    ),
  },
}

export const Outlined = {
  args: {
    variant: 'outlined',
    children: (
      <Card.Body>
        <Card.Title>Outlined Card</Card.Title>
        <p>A card with border instead of shadow.</p>
      </Card.Body>
    ),
  },
}

export const Flat = {
  args: {
    variant: 'flat',
    children: (
      <Card.Body>
        <Card.Title>Flat Card</Card.Title>
        <p>A card with background color, no shadow.</p>
      </Card.Body>
    ),
  },
}
