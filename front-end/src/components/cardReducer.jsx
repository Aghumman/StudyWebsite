export const cardReducer = (cards, action) => {
  if (action.type === "added") {
    const newCard = {
      id: cards.length + 1,
      front: action.front,
      back: action.back,
    };

    return [...cards, newCard];
  } else if (action.type === "deleted") {
    return cards.filter((card, index) => index !== action.index);
  } else if (action.type === "updated") {
    // action: { type, index, field, value }
    const { index, field, value } = action;
    return cards.map((card, idx) =>
      idx === index ? { ...card, [field]: value } : card,
    );
  } else if (action.type === "set") {
    return action.cards;
  } else {
    return cards;
  }
};
