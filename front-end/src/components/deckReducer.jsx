export const decksReducer = (decks, action) => {
  if (action.type === 'added') {
    const newDeck = {
      id: decks.length + 1,
      title: action.title,
    }

    return [...decks, newDeck]
  } else if (action.type === 'deleted') {
    return decks.filter((deck, index) => index !== action.index)
  } else if (action.type === 'updated') {
    // action: { type, index, field, value }
    const { index, field, value } = action
    return decks.map((deck, idx) =>
      idx === index ? { ...deck, [field]: value } : deck,
    )
  } else if (action.type === 'set') {
    return action.decks
  } else {
    return decks
  }
}