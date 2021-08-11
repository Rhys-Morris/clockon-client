import React from "react";
import { ChakraProvider, Center, Box } from "@chakra-ui/react";
import Dashboard from "./components/Dashboard";
import Clients from "./components/Clients";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Project from "./components/Project";
import Register from "./components/Register";
import Invoice from "./components/Invoice";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "@fontsource/raleway/400.css";
import theme from "./style/theme";
import LandingPage from "./components/LandingPage";
import Unauthorised from "./components/errorPages/401";
import NoContent from "./components/errorPages/404";
import { WageProvider, WageConsumer } from "./contexts/hourlyRate";
import { CurrencyConsumer, CurrencyProvider } from "./contexts/currencyContext";
function App() {
  const [hourlyRate, setHourlyRate] = React.useState(
    localStorage.getItem("clockon-wage") || 35.0
  );
  const [currency, setCurrency] = React.useState(
    localStorage.getItem("clockon-currency") || "AUD$"
  );

  const updateHourlyRate = (wage) => setHourlyRate(wage);
  const updateCurrency = (currency) => setCurrency(currency);

  return (
    <WageProvider value={{ hourlyRate, updateHourlyRate }}>
      <CurrencyProvider value={{ currency, updateCurrency }}>
        <ChakraProvider theme={theme}>
          <Router>
            <Center>
              <Box h="100vh" width="100%" color="white" id="box">
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/register" component={Register} />
                  <Route
                    exact
                    path="/invoice"
                    render={() => (
                      <CurrencyConsumer>{() => <Invoice />}</CurrencyConsumer>
                    )}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    render={() => (
                      <CurrencyConsumer>{() => <Dashboard />}</CurrencyConsumer>
                    )}
                  />
                  <Route exact path="/clients" component={Clients} />
                  <Route
                    exact
                    path="/projects"
                    render={() => (
                      <CurrencyConsumer>{() => <Projects />}</CurrencyConsumer>
                    )}
                  />
                  <Route
                    exact
                    path="/project/:id"
                    render={() => (
                      <CurrencyConsumer>
                        {() => <WageConsumer>{() => <Project />}</WageConsumer>}
                      </CurrencyConsumer>
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
      </CurrencyProvider>
    </WageProvider>
  );
}

export default App;
