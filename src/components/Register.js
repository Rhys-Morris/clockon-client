import React from "react";
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  let history = useHistory();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/register", {
        name,
        email,
        password,
      })
      .catch((err) => console.error(err));
  };
  return (
    <Flex h="100%" w="100%" align="center" justify="center">
      <Flex
        color="gray.600"
        align="center"
        justify="center"
        h="75%"
        w="80%"
        maxWidth="1200px"
        border="3px solid #8eaedd"
        borderRadius="20px"
        boxShadow="3px 3px 10px 2px rgba(0, 0, 0, .2)"
        position="relative"
      >
        <Link to="/">
          <FontAwesomeIcon
            size="2x"
            icon={faHome}
            color="8eaedd"
            style={{
              position: "absolute",
              left: "20px",
              top: "20px",
            }}
          />
        </Link>
        <form onSubmit={onSubmit} flex="1" p="30px">
          <Heading as="h1" size="lg" mb="30px">
            Get Started
          </Heading>
          <Flex direction="column" align="center">
            <FormControl isRequired mb="10px">
              <FormLabel>First Name:</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired mb="10px">
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mb="10px">
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </Flex>
          <Button
            bg="#8eaedd"
            _hover={{ bg: "#B6CBE8" }}
            color="white"
            type="submit"
            mt="15px"
            w="100%"
          >
            Register
          </Button>
        </form>
        <Image
          ml="30px"
          w="50%"
          maxWidth="600px"
          src="./assets/register.jpg"
          alt="vector image of freelancer"
          flex="1"
        />
      </Flex>
    </Flex>
  );
};

export default Register;
