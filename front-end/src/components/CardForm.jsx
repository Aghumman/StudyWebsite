import { Button, Stack, Field, Input } from '@chakra-ui/react'
import { useState } from 'react'

const CardForm = ({ addCard }) => {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!front.trim()) return
    addCard(front, back)
    setFront('')
    setBack('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Field.Root>
          <Field.Label>Front</Field.Label>
          <Input
            placeholder='Enter front of the card'
            value={front}
            onChange={(e)=>setFront(e.target.value)}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Back</Field.Label>
          <Input
            placeholder='Enter back of card'
            value={back}
            onChange={(e) =>setBack(e.target.value)}
          />
        </Field.Root>
        <Button type='submit' colorPalette={'blue'}>
          Add Card
        </Button>
      </Stack>
    </form>
  )
}

export default CardForm