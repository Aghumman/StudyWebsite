import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Box, Container, Flex, Text } from "@chakra-ui/react";
import { CardForm, StudyMode } from "../components";

const CardDetailPage = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [studyMode, setStudyMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCards = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const { data } = await axios.get(
          `http://localhost:8000/cards/${deckId}`,
          { headers },
        );
        setCards(data);
      } catch {
        setCards([]);
      }
    };
    getCards();
  }, [deckId]);

  const addCard = async (front, back) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      "http://localhost:8000/cards",
      { front, back, deckId: parseInt(deckId) },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setCards((prev) => [...prev, data]);
  };

  const deleteCard = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/cards/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCards((prev) => prev.filter((c) => c.id !== id));
  };
  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container py={8}>
      <Button
        colorPalette="blue"
        onClick={() => setStudyMode(true)}
        disabled={cards.length === 0}
      >
        Study Mode
      </Button>
      <Container py={8}>
        <Flex justify="space-between" align="center" mb={6}>
          <Button variant="ghost" onClick={() => navigate("/decks")}>
            ← Done
          </Button>
        </Flex>
      </Container>
      <CardForm addCard={addCard} />
      {cards.length === 0 ? (
        <Text p={8}>No cards in this deck yet.</Text>
      ) : (
        <Flex direction="column" gap={4} mt={6}>
          {cards.map((card) => (
            <Box
              key={card.id}
              p={6}
              borderWidth={1}
              borderRadius="lg"
              cursor="pointer"
              onClick={() => toggleFlip(card.id)}
            >
              <Text fontWeight="bold">
                {flipped[card.id] ? card.back : card.front}
              </Text>
              <Text fontSize="sm" color="gray.500" mt={2}>
                Click to {flipped[card.id] ? "see front" : "flip"}
              </Text>
              <Button
                size="xs"
                colorPalette="red"
                variant="ghost"
                mt={2}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCard(card.id);
                }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Flex>
      )}
      {studyMode && (
        <StudyMode cards={cards} onClose={() => setStudyMode(false)} />
      )}
    </Container>
  );
};

export default CardDetailPage;
