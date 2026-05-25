import {
  // Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  Icon,
  // Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuCheck, LuMoveRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");
  return (
    <Container centerContent py={20}>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
        <Stack align="start">
          <Heading size="4xl">Welcome!</Heading>
          <Text color="gray.600" fontSize="xl">
            Create flashcard decks, study at your own pace, and track what you
            know and what you still need to learn.
          </Text>

          <ButtonGroup colorPalette="blue" my={8}>
            <Button
              variant="surface"
              as={Link}
              to="/public"
              px={8}
              py={6}
              fontSize="xl"
            >
              Go to public decks
            </Button>
            {token ? (
              <Button as={Link} to="/decks" px={8} py={6} fontSize="xl">
                My Decks <LuMoveRight />
              </Button>
            ) : (
              <>
                <Button as={Link} to="/login" px={8} py={6} fontSize="xl">
                  Login <LuMoveRight />
                </Button>
                <Button as={Link} to="/register" px={8} py={6} fontSize="xl">
                  Register
                </Button>
              </>
            )}
          </ButtonGroup>

          <HStack>
            <Icon as={LuCheck} color="green.600" boxSize={6} />
            <Text fontSize="xl">Create and manage study decks</Text>
            <Icon as={LuCheck} color="green.600" boxSize={6} />
            <Text fontSize="xl">Track what you know and don't</Text>
            <Icon as={LuCheck} color="green.600" boxSize={6} />
            <Text fontSize="xl">Benifit from other people's flashcards</Text>
          </HStack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
