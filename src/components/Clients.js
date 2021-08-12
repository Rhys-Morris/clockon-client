import React from "react";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Box,
  Select,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ClientCard from "./cards/ClientCard";
import BaseNewModal from "./modals/BaseNewModal";
import Sidebar from "./Sidebar";
import { getClients } from "../data/api";
import { useHistory } from "react-router-dom";
import applicationColors from "../style/colors";
import { clientsReducer } from "../data/reducers";
import { HamburgerBox, HamburgerLine } from "./styled/HamburgerElements";

const Clients = () => {
  // ----- STATE -----
  const initialState = {
    loading: false,
    error: null,
    clients: [],
    filteredClients: [],
  };

  const [searchValue, setSearchValue] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("active");
  const [clientsStore, dispatch] = React.useReducer(
    clientsReducer,
    initialState
  );
  const { loading, error, clients, filteredClients } = clientsStore;
  let history = useHistory();

  // MEDIA QUERIES
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [breakpoint1000] = useMediaQuery("(max-width: 1000px)");
  const [breakpoint650] = useMediaQuery("(max-width: 650px)");
  const [breakpoint500] = useMediaQuery("(max-width: 500px)");
  const [breakpoint400] = useMediaQuery("(max-width: 400px)");

  // ----- RENDER -----
  React.useEffect(() => {
    dispatch({ type: "request" });
    getClients()
      .then((data) => {
        if (data.clients) dispatch({ type: "success", data: data.clients });
        if (data.error) dispatch({ type: "failure", data: data.error });
      })
      .catch((e) => {
        if (e?.response?.status === 401) history.push("/401");
        dispatch({ type: "failure", data: e });
      });
  }, [history]);

  // ----- FILTER CLIENTS ----
  React.useEffect(() => {
    // Wrap in try catch to prevent bug with trailing "\"
    try {
      let filtered = clients.filter((client) => {
        if (!searchValue) return true;
        // TO DO - see if this can be fixed more concretely
        if (searchValue === "\\") return false;
        if (searchValue) return client.name.match(new RegExp(searchValue, "i"));
      });
      filtered = filtered.filter((client) => {
        if (activeFilter === "both") return true;
        if (activeFilter === "active" && client.active) return true;
        if (activeFilter === "inactive" && !client.active) return true;
        return false;
      });
      dispatch({ type: "setFiltered", data: filtered });
    } catch (err) {
      console.warn(err);
    }
  }, [searchValue, clients, activeFilter]);

  // ----- UPDATE CLIENTS  -----
  const updateClients = (updatedClients) => {
    dispatch({ type: "setClients", data: updatedClients });
    setSearchValue("");
  };

  // Set title
  React.useEffect(() => {
    window.document.title = "ClockOn | Clients";
  }, []);

  return (
    <Flex h="100%">
      {/* Hamburger */}
      <Box
        display={breakpoint1000 && !sidebarOpen ? "block" : "none"}
        position="fixed"
        left="10px"
        top="10px"
        id="hamburger"
        cursor="pointer"
        borderRadius="50%"
        boxShadow="3px 3px 10px 3px rgba(0, 0,0, .2)"
        zIndex="1000"
        onClick={() => setSidebarOpen(true)}
      >
        <HamburgerBox>
          <HamburgerLine />
          <HamburgerLine />
          <HamburgerLine />
        </HamburgerBox>
      </Box>
      <Box
        w="200px"
        bgGradient="linear(to-b, #30415D, #031424)"
        h="100%"
        p="15px"
        opacity={breakpoint1000 && !sidebarOpen ? 0 : 1}
        transition=".3s"
        display={breakpoint1000 && !sidebarOpen ? "none" : "block"}
        position="fixed"
        id="sidebar"
        zIndex="1000"
      >
        <Sidebar setSidebarOpen={setSidebarOpen} />
      </Box>
      <Box flex="1" color="gray.400" ml={breakpoint1000 ? "0" : "200px"}>
        <section
          style={{
            width: "100%",
            minHeight: "100vh",
            background: breakpoint1000 ? applicationColors.NAVY : "white",
            paddingTop: breakpoint1000 ? "50px" : "0",
          }}
        >
          {/* Header of page */}
          <Flex
            justify="space-between"
            direction={breakpoint650 ? "column" : "row"}
            align={breakpoint650 ? "start" : "center"}
            p={breakpoint400 ? "30px 10px" : "20px 30px"}
            w="100%"
            boxShadow="0 2px 5px 0 rgba(0, 0,0, .2)"
          >
            <Flex
              justify="center"
              align="center"
              mb={breakpoint650 ? "30px" : "0"}
            >
              <Heading
                color={
                  breakpoint1000
                    ? applicationColors.DARK_LIGHT_BLUE
                    : "gray.800"
                }
                fontSize="xl"
              >
                Clients
              </Heading>
              <InputGroup>
                <InputLeftElement>
                  <SearchIcon style={{ position: "relative", left: "30px" }} />
                </InputLeftElement>

                <Input
                  data-cy="search"
                  placeholder="Find a client"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  flex="1"
                  ml="20px"
                  fontSize={breakpoint500 ? "sm" : "inherit"}
                  style={{ border: "1px solid lightgrey" }}
                />
              </InputGroup>
              <Select
                ml="10px"
                w="175px"
                fontSize={breakpoint500 ? "sm" : "inherit"}
                style={{ border: "1px solid lightgrey" }}
                onChange={(e) => setActiveFilter(e.target.value)}
                data-cy="active-select"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="both">Both</option>
              </Select>
            </Flex>
            <BaseNewModal type={"Client"} action={updateClients} />
          </Flex>
          {/* Client Cards */}
          {loading && (
            <Spinner
              h="100px"
              w="100px"
              ml="100px"
              mt="50px"
              color={applicationColors.DARK_LIGHT_BLUE}
            />
          )}
          {error && (
            <Text
              ml="50px"
              mt="50px"
              fontSize="4xl"
              color={applicationColors.ERROR_COLOR}
            >
              {error}
            </Text>
          )}
          {!loading && !error && (
            <Flex
              p={breakpoint1000 ? "5px" : "30px"}
              wrap="wrap"
              justify={breakpoint1000 ? "center" : "flex-start"}
            >
              {clients.length === 0 && <Text>No clients currently active</Text>}
              {clients.length >= 1 && filteredClients.length === 0 && (
                <Text>No clients match your search</Text>
              )}
              {filteredClients.length >= 1 &&
                filteredClients.map((client) => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    updateClients={updateClients}
                  />
                ))}
            </Flex>
          )}
        </section>
      </Box>
    </Flex>
  );
};

export default Clients;
