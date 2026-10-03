import { useEffect, useReducer } from "react";
import { DeckForm, DeckList, DecksContext, decksReducer } from "../components";
import axios from "axios";
import { Flex } from "@chakra-ui/react";

const DecksPage = () => {
  const [decks, dispatch] = useReducer(decksReducer, []);

  // Delete deck by ID
  const deleteDeck = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/decks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "set",
        decks: decks.filter((d) => d.id !== id),
      });
    } catch (error) {
      console.error("Error deleting deck:", error);
    }
  };

  // Update deck title by ID
  const updateTitle = async (id, title) => {
    try {
      const deck = decks.find((d) => d.id === id);
      if (!deck) return;

      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:8000/decks/${id}`,
        {
          ...deck,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "set",
        decks: decks.map((d) => (d.id === id ? data : d)),
      });
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

  // Toggle public/private status by ID
  const togglePublic = async (id, isPublic) => {
    try {
      const deck = decks.find((d) => d.id === id);
      if (!deck) return;

      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `http://localhost:8000/decks/${id}`,
        { title: deck.title, isPublic },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({
        type: "set",
        decks: decks.map((d) => (d.id === id ? data : d)),
      });
    } catch (error) {
      console.error("Error toggling public status:", error);
    }
  };

  // Add a new deck
  const addDeck = async (title, isPublic) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `http://localhost:8000/decks`,
        {
          title,
          isPublic,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({
        type: "set",
        decks: [...decks, data],
      });
    } catch (error) {
      console.error("Error adding deck:", error);
    }
  };

  // Fetch initial decks on mount
  useEffect(() => {
    const getDecks = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:8000/decks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch({
          type: "set",
          decks: data,
        });
      } catch (error) {
        console.error("Error fetching decks:", error);
        dispatch({
          type: "set",
          decks: [],
        });
      }
    };

    getDecks();
  }, []);

  return (
    <DecksContext.Provider value={{ deleteDeck, updateTitle, togglePublic }}>
      <Flex direction="column" gap={2}>
        <DeckForm addDeck={addDeck} />
        <DeckList decks={decks} />
      </Flex>
    </DecksContext.Provider>
  );
};

export default DecksPage;