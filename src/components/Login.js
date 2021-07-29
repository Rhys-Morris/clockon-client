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
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:4000/login", {
        email,
        password,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        if (data.error === "Invalid username or password") {
          setLoading(false);
          setError("Invalid username or password");
        } else {
          sessionStorage.setItem("token", data.token);
          history.push("/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
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
      {error && (
        <Box w="100%" color="salmon">
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
      >
        {loading ? <Spinner /> : "Log in"}
      </Button>
      <Text sz="xs" mt="10px">
        Don't have an account?{" "}
        <Link to="/register" style={{ textDecoration: "underline" }}>
          Register
        </Link>
      </Text>
    </form>
  );
};

export default Login;
