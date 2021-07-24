import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { addClient } from "../../data/api";

const NewClientForm = ({ action, onClose }) => {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");

  const submitForm = (e) => {
    e.preventDefault();
    const clientDetails = { name, contact, email };
    addClient(clientDetails)
      .then((data) => {
        if (data.clients) action(data.clients);
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  return (
    <form onSubmit={submitForm}>
      <FormControl isRequired>
        <FormLabel fontSize="sm" casing="uppercase">
          Client Name
        </FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Colour Agency"
        ></Input>
      </FormControl>
      <FormControl mt="10px">
        <FormLabel fontSize="sm" casing="uppercase">
          Contact
        </FormLabel>
        <Input
          placeholder="John Smith"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl mt="10px">
        <FormLabel fontSize="sm" casing="uppercase">
          Email
        </FormLabel>
        <Input
          placeholder="johnsmith@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      <Center mt="15px">
        <Button onClick={onClose} type="submit">
          Create Client
        </Button>
      </Center>
    </form>
  );
};

export default NewClientForm;
