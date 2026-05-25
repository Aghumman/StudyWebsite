import { Box } from '@chakra-ui/react'
import Card from './Card'

const CardList = ({ cards = [] }) => {
  if (!cards.length) {
    return <p>No cards to display!</p>
  }

  return (
    <Box w='full'>
      {cards.map((card, index) => (
        <Card key={card.id} index={index} {...card} />
      ))}

      {cards.length > 0 && <p>There are {cards.length} cards.</p>}
    </Box>
  )
}

export default CardList