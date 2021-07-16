import { ChakraProvider, Center, Box, Flex } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <ChakraProvider>
      <Center>
        <Box h="100vh" w="1800px" color="white">
          <Flex>
            <Box w="200px" bg="#031424" h="100vh" p="15px">
              <Sidebar />
            </Box>
            <Box flex="1">
              <Dashboard />
            </Box>
          </Flex>
        </Box>
      </Center>
    </ChakraProvider>
  );
}

export default App;
