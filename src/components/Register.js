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
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { register } from "../data/api";
import applicationColors from "../style/colors";

const Register = () => {
  let history = useHistory();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Media Queries
  const [breakpoint1400] = useMediaQuery("(max-width: 1200px)");
  const [breakpoint1200] = useMediaQuery("(max-width: 1200px)");
  const [breakpoint1000] = useMediaQuery("(max-width: 1000px)");
  const [breakpoint800] = useMediaQuery("(max-width: 850px)");
  const [breakpoint600] = useMediaQuery("(max-width: 600px)");
  const [breakpoint400] = useMediaQuery("(max-width: 400px)");

  // Set title
  React.useEffect(() => {
    window.document.title = "ClockOn | Register";
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    register({ name, email, password })
      .then((data) => {
        if (data.token) {
          // Set token and redirect
          sessionStorage.setItem("token", data.token);
          setTimeout(() => {
            history.push("/dashboard");
          }, 1000);
        }
        if (data.error) {
          // Display errors
          setError(data.error);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Flex h="100%" w="100%" align="center" justify="center">
      <Flex
        color="gray.600"
        align="center"
        justify="center"
        h={breakpoint800 ? "65%" : "75%"}
        w={
          breakpoint400
            ? "95%"
            : breakpoint600
            ? "80%"
            : breakpoint800
            ? "60%"
            : breakpoint1000
            ? "90%"
            : "80%"
        }
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
        <form onSubmit={onSubmit} flex="1" p="30px" data-testid="form">
          <Heading as="h1" size="lg" mb="30px">
            Get Started
          </Heading>
          <Flex direction="column" align="center">
            <FormControl isRequired mb="10px">
              <FormLabel>First Name:</FormLabel>
              <Input
                data-cy="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
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
          <Button
            bg="#8eaedd"
            _hover={{ bg: "#B6CBE8" }}
            color="white"
            type="submit"
            mt="15px"
            w="100%"
            data-cy="submit"
          >
            {loading ? <Spinner /> : "Register"}
          </Button>
          {/* Single error */}
          {error && error.length === 1 && (
            <Text
              mt="10px"
              color={applicationColors.ERROR_COLOR}
              data-cy="error"
            >
              {/* Display more meaningful error message if name validation fails */}
              {error[0] === "Name is invalid"
                ? "Name can only contain alphabet characters"
                : error[0]}
            </Text>
          )}
          {/* Multiple errors */}
          {error && error.length > 1 && (
            <ul style={{ marginTop: "10px" }}>
              {error.map((e, index) => (
                <li
                  key={index}
                  style={{ color: applicationColors.ERROR_COLOR }}
                >
                  {e === "Name is invalid"
                    ? "Name can only contain alphabet characters"
                    : e}
                </li>
              ))}
            </ul>
          )}
        </form>
        {breakpoint800 ? null : (
          <Image
            ml="30px"
            w="50%"
            maxWidth={
              breakpoint1200 ? "400px" : breakpoint1400 ? "450px" : "600px"
            }
            src="./assets/register.jpg"
            alt="vector image of freelancer"
            flex="1"
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Register;
