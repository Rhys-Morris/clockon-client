import React from "react";
import { ChakraProvider, Center, Box } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import Clients from "./components/Clients";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Project from "./components/Project";
import Register from "./components/Register";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "@fontsource/raleway/400.css";
import theme from "./style/theme";
import LandingPage from "./components/LandingPage";
import Unauthorised from "./components/errorPages/401";
import NoContent from "./components/errorPages/404";
import { WageProvider, WageConsumer } from "./contexts/hourlyRate";
function App() {
  const [hourlyRate, setHourlyRate] = React.useState(35.0);

  console.log(typeof hourlyRate);

  const updateHourlyRate = (wage) => setHourlyRate(wage);
  return (
    <WageProvider value={{ hourlyRate, updateHourlyRate }}>
      <ChakraProvider theme={theme}>
        <Router>
          <Center>
            <Box h="100vh" w="100vw" color="white">
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/clients" component={Clients} />
                <Route exact path="/projects" component={Projects} />
                <Route
                  exact
                  path="/project/:id"
                  render={(props) => (
                    <WageConsumer>{() => <Project />}</WageConsumer>
                  )}
                />
                <Route exact path="/work" component={Work} />
                <Route exact path="/401" component={Unauthorised} />
                <Route component={NoContent} />
              </Switch>
            </Box>
          </Center>
        </Router>
      </ChakraProvider>
    </WageProvider>
  );
}

export default App;
