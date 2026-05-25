import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { LuArrowLeft, LuArrowRight, LuX } from "react-icons/lu";

const StudyMode = ({ cards, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
  const [unknown, setUnknown] = useState([]);
  const [done, setDone] = useState(false);
  const [practicing, setPracticing] = useState(null);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceFlipped, setPracticeFlipped] = useState(false);

  const markKnown = () => {
    setKnown((prev) => [...prev, cards[current]]);
    advance();
  };

  const markUnknown = () => {
    setUnknown((prev) => [...prev, cards[current]]);
    advance();
  };

  const advance = () => {
    if (current + 1 >= cards.length) {
      setDone(true);
    } else {
      setCurrent((prev) => prev + 1);
      setFlipped(false);
    }
  };

  const next = () => {
    setPracticeIndex(
      (prev) => (prev + 1) % (practicing === "known" ? known : unknown).length,
    );
    setPracticeFlipped(false);
  };

  const prev = () => {
    setPracticeIndex(
      (prev) =>
        (prev - 1 + (practicing === "known" ? known : unknown).length) %
        (practicing === "known" ? known : unknown).length,
    );
    setPracticeFlipped(false);
  };

  const startPractice = (type) => {
    setPracticing(type);
    setPracticeIndex(0);
    setPracticeFlipped(false);
  };

  const resetStudy = () => {
    setCurrent(0);
    setFlipped(false);
    setKnown([]);
    setUnknown([]);
    setDone(false);
    setPracticing(null);
    setPracticeIndex(0);
    setPracticeFlipped(false);
  };

  if (practicing) {
    const practiceCards = practicing === "known" ? known : unknown;

    if (practiceCards.length === 0) {
      return (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="gray.900"
          zIndex={1000}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="2xl" mb={6}>
            No cards in this group!
          </Text>
          <Button
            onClick={() => setPracticing(null)}
            colorPalette="blue"
            size="lg"
          >
            Back to summary
          </Button>
        </Box>
      );
    }

    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="gray.900"
        zIndex={1000}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          position="absolute"
          top={4}
          right={4}
          onClick={() => setPracticing(null)}
          colorPalette="gray"
          variant="ghost"
          color="white"
          size="lg"
        >
          <LuX /> Back
        </Button>

        <Text color="gray.400" mb={2} fontSize="lg">
          Practicing: {practicing === "known" ? "✅ Known" : "❌ Unknown"}
        </Text>
        <Text color="gray.400" mb={6} fontSize="lg">
          {practiceIndex + 1} / {practiceCards.length}
        </Text>

        <Box
          w={{ base: "90%", md: "800px" }}
          h="450px"
          bg="white"
          borderRadius="2xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={() => setPracticeFlipped((p) => !p)}
          p={12}
        >
          <Text fontSize="4xl" fontWeight="bold" textAlign="center">
            {practiceFlipped
              ? practiceCards[practiceIndex].back
              : practiceCards[practiceIndex].front}
          </Text>
        </Box>

        <Text color="gray.400" mt={4} fontSize="lg">
          Click card to flip
        </Text>

        <Flex gap={8} mt={8}>
          <Button
            onClick={prev}
            colorPalette="blue"
            variant="surface"
            size="lg"
          >
            <LuArrowLeft />
          </Button>
          <Button
            onClick={next}
            colorPalette="blue"
            variant="surface"
            size="lg"
          >
            <LuArrowRight />
          </Button>
        </Flex>
      </Box>
    );
  }

  if (done) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="gray.900"
        zIndex={1000}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Text color="white" fontSize="3xl" fontWeight="bold" mb={4}>
          Session Complete!
        </Text>

        <Flex gap={6} mb={8}>
          <Box
            bg="green.800"
            p={8}
            borderRadius="xl"
            textAlign="center"
            cursor="pointer"
            onClick={() => startPractice("known")}
            _hover={{ bg: "green.700" }}
          >
            <Text color="white" fontSize="4xl" fontWeight="bold">
              {known.length}
            </Text>
            <Text color="green.200" fontSize="xl">
              ✅ Known
            </Text>
            <Text color="green.300" fontSize="md" mt={2}>
              Click to practice
            </Text>
          </Box>

          <Box
            bg="red.800"
            p={8}
            borderRadius="xl"
            textAlign="center"
            cursor="pointer"
            onClick={() => startPractice("unknown")}
            _hover={{ bg: "red.700" }}
          >
            <Text color="white" fontSize="4xl" fontWeight="bold">
              {unknown.length}
            </Text>
            <Text color="red.200" fontSize="xl">
              ❌ Unknown
            </Text>
            <Text color="red.300" fontSize="md" mt={2}>
              Click to practice
            </Text>
          </Box>
        </Flex>

        <Flex gap={4}>
          <Button
            onClick={resetStudy}
            colorPalette="blue"
            variant="surface"
            size="lg"
          >
            Study Again
          </Button>
          <Button
            onClick={onClose}
            colorPalette="gray"
            variant="surface"
            size="lg"
          >
            Exit
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="gray.900"
      zIndex={1000}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Button
        position="absolute"
        top={4}
        right={4}
        onClick={onClose}
        colorPalette="gray"
        variant="ghost"
        color="white"
        size="lg"
      >
        <LuX /> Exit
      </Button>

      <Text color="gray.400" mb={6} fontSize="lg">
        {current + 1} / {cards.length}
      </Text>

      <Box
        w={{ base: "90%", md: "800px" }}
        h="450px"
        bg="white"
        borderRadius="2xl"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onClick={() => setFlipped((p) => !p)}
        p={12}
      >
        <Text fontSize="4xl" fontWeight="bold" textAlign="center">
          {flipped ? cards[current].back : cards[current].front}
        </Text>
      </Box>

      <Text color="gray.400" mt={4} fontSize="lg">
        Click card to flip
      </Text>

      <Flex gap={4} mt={8}>
        <Button
          onClick={markUnknown}
          colorPalette="red"
          size="lg"
          px={8}
          py={6}
          fontSize="xl"
        >
          ❌ Unknown
        </Button>
        <Button
          onClick={markKnown}
          colorPalette="green"
          size="lg"
          px={8}
          py={6}
          fontSize="xl"
        >
          ✅ Known
        </Button>
      </Flex>
    </Box>
  );
};

export default StudyMode;
