import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PublicDecksPage = () => {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPublicDecks = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/decks/public");
        setDecks(data);
      } catch {
        setDecks([]);
      }
    };
    getPublicDecks();
  }, []);

  return (
    <Container py={8}>
      <Heading mb={6}>Public Decks</Heading>
      {decks.length === 0 ? (
        <Text>No public decks available yet.</Text>
      ) : (
        <Flex direction="column" gap={4}>
          {decks.map((deck) => (
            <Box
              key={deck.id}
              p={6}
              borderWidth={1}
              borderRadius="lg"
              cursor="pointer"
              onClick={() => navigate(`/decks/${deck.id}`)}
            >
              <Text fontWeight="bold">{deck.title}</Text>
            </Box>
          ))}
        </Flex>
      )}
    </Container>
  );
};

export default PublicDecksPage;
