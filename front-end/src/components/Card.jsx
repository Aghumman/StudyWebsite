import { useState } from "react";
import { useDecksContext } from "./context";
import { Button, ButtonGroup, Flex, Spacer, Text } from "@chakra-ui/react";

const Card = ({ front, back, index }) => {
  const [flipped, setFlipped] = useState(false);
  const { deleteCard } = useDecksContext();

  return (
    <Flex align="center" p={3} borderWidth={1} borderRadius="lg" mb={2}>
      <Text cursor="pointer" onClick={() => setFlipped((prev) => !prev)}>
        {flipped ? back : front}
      </Text>
      <Spacer />
      <ButtonGroup
        colorPalette={"blue"}
        variant={"surface"}
        size={"xs"}
        attached
      >
        <Button onClick={() => deleteCard(index)}>Delete</Button>
      </ButtonGroup>
    </Flex>
  );
};
export default Card;
