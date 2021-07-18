import React from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    // TO DO - LOGIC
    // Once sent to database and JWT returned
    history.push("/dashboard");
  };
  return (
    <Flex h="100%" w="100%" align="center" justify="center">
      <Flex
        color="gray.600"
        align="center"
        justify="center"
        h="80%"
        w="80%"
        maxWidth="1200px"
        border="3px solid darkgray"
        borderRadius="20px"
        boxShadow="3px 3px 10px 2px rgba(0, 0, 0, .15)"
      >
        <form onSubmit={onSubmit} flex="1" p="30px">
          <Heading as="h1" size="lg" mb="30px">
            Get Started
          </Heading>
          <Flex direction="column" align="center">
            <FormControl isRequired mb="10px">
              <FormLabel>First Name:</FormLabel>
              <Input />
            </FormControl>
            <FormControl isRequired mb="10px">
              <FormLabel>Username:</FormLabel>
              <Input />
            </FormControl>
            <FormControl isRequired mb="10px">
              <FormLabel>Email</FormLabel>
              <Input />
            </FormControl>
          </Flex>
          <Button bg="#8eaedd" color="white" type="submit" mt="15px" w="100%">
            Register
          </Button>
        </form>
        <Image
          w="50%"
          maxWidth="700px"
          src="./assets/register.jpg"
          alt="vector image of freelancer"
          flex="1"
        />
      </Flex>
    </Flex>
  );
};

export default Register;
