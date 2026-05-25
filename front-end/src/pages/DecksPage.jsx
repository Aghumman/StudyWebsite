import { useEffect, useReducer } from "react";
import { DeckForm, DeckList, DecksContext, decksReducer } from "../components";
import axios from "axios";
import { Flex } from "@chakra-ui/react";

const DecksPage = () => {
  const [decks, dispatch] = useReducer(decksReducer, []);

  const deleteDeck = async (index) => {
    const deck = decks[index];
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8000/decks/${deck.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "set",
      decks: decks.filter((t) => t.id !== deck.id),
    });
  };

  const updateTitle = async (index, title) => {
    const deck = decks[index];

    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `http://localhost:8000/decks/${deck.id}`,
      {
        ...deck,
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    dispatch({
      type: "set",
      decks: decks.map((t) => (t.id === deck.id ? data : t)),
    });
  };

  const addDeck = async (title, isPublic) => {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `http://localhost:8000/decks`,
      {
        title,
        isPublic,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    dispatch({
      type: "set",
      decks: [...decks, data],
    });
  };

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
      } catch {
        dispatch({
          type: "set",
          decks: [],
        });
      }
    };

    getDecks();
  }, []);
  const togglePublic = async (index, isPublic) => {
    const deck = decks[index];
    const token = localStorage.getItem("token");
    const { data } = await axios.put(
      `http://localhost:8000/decks/${deck.id}`,
      { title: deck.title, isPublic },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    dispatch({
      type: "set",
      decks: decks.map((d) => (d.id === deck.id ? data : d)),
    });
  };

  return (
    // Provider
    <DecksContext value={{ deleteDeck, updateTitle, togglePublic }}>
      <Flex direction="column" gap={2}>
        <DeckForm addDeck={addDeck} />
        <DeckList decks={decks} />
      </Flex>
    </DecksContext>
  );
};

export default DecksPage;
