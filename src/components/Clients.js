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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ClientCard from "./cards/ClientCard";
import BaseNewModal from "./modals/BaseNewModal";
import Sidebar from "./Sidebar";
import { getClients } from "../data/api";
import { useHistory } from "react-router-dom";

const Clients = () => {
  const [clients, setClients] = React.useState([]);
  const [filteredClients, setFilteredClients] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("active");
  let history = useHistory();

  //   On load get clients
  React.useEffect(() => {
    getClients()
      .then((data) => {
        setClients([...data.clients]);
        setFilteredClients([...data.clients]);
      })
      .catch((e) => {
        if (e?.response?.status === 401) history.push("/401");
      });
    // TO DO - move to dispatch
  }, []);

  // ----- FILTER CLIENTS ----
  React.useEffect(() => {
    const regex = new RegExp(searchValue, "i");
    let filtered = clients.filter((client) => {
      if (!searchValue) return true;
      return client.name.match(regex);
    });
    filtered = filtered.filter((client) => {
      if (activeFilter === "both") return true;
      if (activeFilter === "active" && client.active) return true;
      if (activeFilter === "inactive" && !client.active) return true;
      return false;
    });
    setFilteredClients(filtered);
  }, [searchValue, clients, activeFilter]);

  // ----- UPDATE CLIENTS - ADDITION / DELETION -----
  const updateClients = (updatedClients) => {
    setClients([...updatedClients]);
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
                <InputLeftElement
                  children={
                    <SearchIcon
                      style={{ position: "relative", left: "30px" }}
                    />
                  }
                />
                <Input
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
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="both">Both</option>
              </Select>
            </Flex>
            <BaseNewModal type={"Client"} action={updateClients} />
          </Flex>
          {/* Client Cards */}
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
        </section>
      </Box>
    </Flex>
  );
};

export default Clients;
