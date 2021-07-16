import { ChakraProvider, Center, Box, Flex } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Center>
          <Box h="100vh" w="1800px" color="white">
            <Flex h="100%">
              <Box
                w="200px"
                bgGradient="linear(to-b, #30415D, #031424)"
                h="100%"
                p="15px"
              >
                <Sidebar />
              </Box>
              <Box flex="1">
                <Dashboard />
              </Box>
            </Flex>
          </Box>
        </Center>
        <Switch></Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
