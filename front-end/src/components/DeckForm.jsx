import { Button, Field, Input } from "@chakra-ui/react";
import { useState } from "react";

const DeckForm = ({ addDeck }) => {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDeck(title, isPublic);
    setTitle("");
    setIsPublic(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root>
        <Field.Label>New Deck</Field.Label>
        <Input
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field.Root>
      <Button type="submit" colorPalette="blue" mt={2}>
        Add Deck
      </Button>
    </form>
  );
};

export default DeckForm;
