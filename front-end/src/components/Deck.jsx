import { useState } from "react";
import EditTitle from "./EditTitle";
import { useDecksContext } from "./context";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";

const Deck = ({ title, id, index, isPublic }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const { deleteDeck, updateTitle, togglePublic } = useDecksContext();

  const onEdit = (index, title) => {
    updateTitle(index, title);
    setEditing(false);
  };

  return (
    <Flex
      align="center"
      p={3}
      borderWidth={1}
      borderRadius="lg"
      mb={2}
      cursor="pointer"
      onClick={() => !editing && navigate(`/decks/${id}`)}
    >
      {editing ? (
        <EditTitle
          index={index}
          title={title}
          onEdit={onEdit}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <Flex direction="column" gap={1}>
          <Text>{title}</Text>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => togglePublic(index, !isPublic)}
            />
            Public
          </label>
        </Flex>
      )}
      <Spacer />
      <ButtonGroup
        colorPalette="blue"
        variant="surface"
        size="xs"
        attached
        onClick={(e) => e.stopPropagation()}
      >
        {!editing && <Button onClick={() => setEditing(true)}>Edit</Button>}
        <Button onClick={() => deleteDeck(index)}>Delete</Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Deck;
