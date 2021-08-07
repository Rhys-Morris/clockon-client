import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { addClient } from "../../data/api";
import { validateEmail } from "../../helpers/helper";
import applicationColors from "../../style/colors";
import PropTypes from "prop-types";

const ClientForm = ({ action, onClose, type }) => {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(null);

  const validateInput = () => {
    if (name.length > 40) return [false, "Name must be < 40 characters"];
    if (email.length > 40) return [false, "Email must be < 40 characters"];
    if (contact.length > 40) return [false, "Contact must be < 40 characters"];
    if (!validateEmail(email)) return [false, "Email is an invalid format"];
    return [true];
  };

  const submitForm = (e) => {
    e.preventDefault();
    const clientDetails = { name, contact, email };
    const [valid, errorMessage] = validateInput();
    if (valid) {
      addClient(clientDetails)
        .then((data) => {
          if (data.clients) {
            action(data.clients);
            onClose();
          }
          if (data.error) {
            setError(data.error);
          }
        })
        .catch((e) => {
          console.warn(e);
        });
    } else {
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={submitForm} data-testid="form">
      <FormControl isRequired>
        <FormLabel fontSize="sm" casing="uppercase">
          Client Name
        </FormLabel>
        <Input
          data-cy="name"
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
          data-cy="contact"
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
          data-cy="email"
          placeholder="johnsmith@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </FormControl>
      {error && (
        <Text mt="15px" color={applicationColors.ERROR_COLOR} data-cy="error">
          {error}
        </Text>
      )}
      <Center mt="15px">
        <Button type="submit" data-cy="submit">
          {type} Client
        </Button>
      </Center>
    </form>
  );
};

ClientForm.propTypes = {
  action: PropTypes.func,
  onClose: PropTypes.func,
  type: PropTypes.string,
};

export default ClientForm;
