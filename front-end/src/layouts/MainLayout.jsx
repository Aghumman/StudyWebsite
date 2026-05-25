import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { LuBookOpen } from "react-icons/lu";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <Box bg="white" display="flex" minH="100vh" flexDirection="column">
      <Box bg="blue.50" shadow="sm">
        <Container py={5}>
          <Flex align="center">
            <HStack gap={2} as={Link} to="/">
              <LuBookOpen size={28} />
              <Heading size="xl" color="blue.600">
                Study App
              </Heading>
            </HStack>
            <Spacer />
            <HStack gap={6}>
              {token && (
                <Link
                  to="/decks"
                  style={{ color: "#3182CE", fontSize: "18px" }}
                >
                  MyDecks
                </Link>
              )}
              {token ? (
                <Button
                  colorPalette="blue"
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button size="lg" colorPalette="blue" as={Link} to="/login">
                  Login
                </Button>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>
      <Box flex="1" as="main" p={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
