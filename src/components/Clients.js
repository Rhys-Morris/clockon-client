import React from "react";
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import ClientCard from "./cards/ClientCard";
import { mockClients } from "../data/api";
import BaseNewModal from "./modals/BaseNewModal";

const Clients = () => {
  const [clients, setClients] = React.useState([]);
  const [filteredClients, setFilteredClients] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  //   On load simulate getting clients
  React.useEffect(() => {
    setClients([...mockClients]);
    setFilteredClients([...mockClients]);
  }, []);

  // Filter clients
  React.useEffect(() => {
    if (!searchValue) return setFilteredClients([...clients]);
    const regex = new RegExp(searchValue, "i");
    const filtered = clients.filter((client) => client.name.match(regex));
    setFilteredClients(filtered);
  }, [searchValue, clients]);

  const addClient = (client) => {
    setClients([...clients, client]);
    setSearchValue("");
  };

  return (
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
                <SearchIcon style={{ position: "relative", left: "30px" }} />
              }
            />
            <Input
              placeholder="Find a client"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              ml="30px"
              style={{ border: "1px solid lightgrey" }}
            />
          </InputGroup>
        </Flex>
        <BaseNewModal type={"Client"} action={addClient} />
      </Flex>
      {/* Client Cards */}
      <Flex p="30px" wrap="wrap">
        {clients.length === 0 && <Text>No clients currently active</Text>}
        {clients.length >= 1 && filteredClients.length === 0 && (
          <Text>No clients match your search</Text>
        )}
        {filteredClients.length >= 1 &&
          filteredClients.map((client, index) => (
            <ClientCard key={index} client={client} />
          ))}
      </Flex>
    </section>
  );
};

export default Clients;
