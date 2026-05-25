import { Box } from '@chakra-ui/react'
import Deck from './Deck'

const DeckList = ({ decks = [] }) => {
  if (!decks.length) {
    return <p>No decks to display!</p>
  }

  return (
    <Box w='full'>
      {decks.map((deck, index) => (
        <Deck key={deck.id} index={index} {...deck} />
      ))}

      {decks.length > 0 && <p>There are {decks.length} decks.</p>}
    </Box>
  )
}

export default DeckList