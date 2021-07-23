import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import axios from "axios";

const NewClientForm = ({ action, onClose }) => {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/clients",
        {
          client: {
            name,
            contact,
            email,
            active: true,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.clients) action(res.data.clients);
        if (res.data.errors) {
          // TO IMPLEMENT
        }
      })
      .catch((e) => {
        console.error(e);
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
