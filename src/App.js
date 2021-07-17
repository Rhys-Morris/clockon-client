import { ChakraProvider, Center, Box, Flex } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import Clients from "./components/Clients";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Sidebar from "./components/Sidebar";
import LandingPage from "./components/LandingPage";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "@fontsource/raleway/400.css";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        {/* <Route exact path="/" component={LandingPage} /> */}
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
              <Box flex="1" color="gray.400">
                <Switch>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/clients" component={Clients} />
                  <Route exact path="/projects" component={Projects} />
                  <Route exact path="/time" component={Work} />
                </Switch>
              </Box>
            </Flex>
          </Box>
        </Center>
      </Router>
    </ChakraProvider>
  );
}

export default App;
