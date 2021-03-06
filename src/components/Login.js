import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Button,
  Text,
  Input,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { login } from "../data/api";

const Login = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(email, password)
      .then((data) => {
        if (data.error === "Invalid email or password") {
          setLoading(false);
          setError("Invalid email or password");
        } else {
          sessionStorage.setItem("token", data.token);
          setTimeout(() => history.push("/dashboard"), 1000);
        }
      })
      .catch((err) => {
        console.warn(err);
        setLoading(false);
        setError(err.message);
      });
  };
  return (
    <form onSubmit={onSubmit} flex="1" p="30px">
      <Flex direction="column" align="center">
        <FormControl isRequired mb="10px">
          <FormLabel>Email:</FormLabel>
          <Input
            data-cy="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired mb="10px">
          <FormLabel>Password:</FormLabel>
          <Input
            data-cy="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
      </Flex>
      {error && (
        <Box w="100%" color="salmon" data-cy="error">
          {error}
        </Box>
      )}
      <Button
        bg="#8eaedd"
        _hover={{ bg: "#B6CBE8" }}
        color="white"
        type="submit"
        mt="15px"
        w="100%"
        data-cy="submit"
      >
        {loading ? <Spinner /> : "Log in"}
      </Button>
      <Text sz="xs" mt="10px">
        {"Don't have an account?"}{" "}
        <Link to="/register" style={{ textDecoration: "underline" }}>
          Register
        </Link>
      </Text>
    </form>
  );
};

export default Login;
