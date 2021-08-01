import React from "react";
import { Box, Flex, Center, Heading, Spinner } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { getDash } from "../data/api";
import { useHistory } from "react-router-dom";

const dashReducer = (state, action) => {
  switch (action.type) {
    case "request":
      return { ...state, loading: true, error: null };
    case "success":
      return {
        ...state,
        loading: false,
        error: null,
        tasks: action.tasks,
        user: action.user,
      };
    case "failure":
      return { ...state, loading: false, error: null };
    default:
      return { ...state };
  }
};

const Dashboard = () => {
  // ----- STATE -----
  let history = useHistory();
  const initialState = {
    loading: false,
    error: null,
    user: null,
    tasks: null,
  };
  const [dashState, dispatch] = React.useReducer(dashReducer, initialState);
  const { user, tasks, loading, error } = dashState;

  // ----- RENDER -----
  React.useEffect(() => {
    // Handle no token
    if (!sessionStorage.getItem("token")) history.push("/401");
    // Start request
    dispatch({ type: "request" });
    getDash()
      .then((data) => {
        if (data.user)
          dispatch({ type: "success", tasks: data.tasks, user: data.user });
      })
      .catch((e) => {
        if (e?.response?.status === 401) history.push("/401");
      });
  }, [history]);

  const greeting = () => {
    const currentTime = new Date(Date.now()).getHours();
    if (currentTime >= 18 || currentTime < 2) return "Good Evening";
    if (currentTime >= 2 && currentTime < 12) return "Good Morning";
    if (currentTime >= 12 && currentTime < 18) return "Good Afternoon";
  };

  console.log(dashState);
  return (
    <>
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
          <Flex h="100%" direction="column">
            <Center h="100px">
              {loading && <Spinner />}
              {!loading && (
                <Heading
                  as="h2"
                  size="2xl"
                  p="20px"
                  style={{ fontWeight: 300 }}
                  color="#031424"
                >
                  {greeting()}, <strong>{user?.name}!</strong>
                </Heading>
              )}
            </Center>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
