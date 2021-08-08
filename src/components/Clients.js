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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ClientCard from "./cards/ClientCard";
import BaseNewModal from "./modals/BaseNewModal";
import Sidebar from "./Sidebar";
import { getClients } from "../data/api";
import { useHistory } from "react-router-dom";
import applicationColors from "../style/colors";
import { clientsReducer } from "../data/reducers";

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

  // ----- RENDER -----
  React.useEffect(() => {
    // Check for token
    if (!sessionStorage.getItem("token")) {
      history.push("/401");
    }
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

  return (
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
        <section
          style={{
            width: "100%",
          }}
        >
          {/* Header of page */}
          <Flex
            justify="space-between"
            align="center"
            p="20px 30px"
            w="100%"
            boxShadow="0 2px 5px 0 rgba(0, 0,0, .2)"
          >
            <Flex justify="center" align="center">
              <Heading color="gray.800" fontSize="xl">
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
                  w="300px"
                  ml="20px"
                  style={{ border: "1px solid lightgrey" }}
                />
              </InputGroup>
              <Select
                ml="10px"
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
            <Flex p="30px" wrap="wrap">
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
