import { Input, ButtonGroup, Button } from '@chakra-ui/react'
import { useState } from 'react'

const EditTitle = ({ index, title, onEdit, onCancel }) => {
  const [newTitle, setNewTitle] = useState(title)

  const handleSubmit = (e) => {
    e.preventDefault()
    onEdit(index, newTitle)
  }

    return (
    <form onSubmit={handleSubmit}>
      <Input
        id={`edit-title-${index}`}
        variant='flushed'
        name='title'
        placeholder='Enter title'
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onCancel()
        }}
      />
      <ButtonGroup size='xs' mt={2}>
        <Button type='submit' colorPalette='blue'>Save</Button>
        <Button variant='ghost' onClick={onCancel}>Cancel</Button>
      </ButtonGroup>
    </form>
  )
}

export default EditTitle