import React from "react";
import { Box, Flex, Center, Heading, Spinner, Text } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { getDash } from "../data/api";
import { useHistory } from "react-router-dom";
import { formattedTaskDate, msTimestamp } from "../helpers/date";
import applicationColors from "../style/colors";

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
  const { user, tasks, loading } = dashState;

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
            {loading && (
              <Center>
                <Spinner />
              </Center>
            )}
            {!loading && (
              <>
                <Center h="100px">
                  {/* GREETING */}

                  <Heading
                    as="h2"
                    size="2xl"
                    p="20px"
                    style={{ fontWeight: 300 }}
                    color="#031424"
                  >
                    {greeting()}, <strong>{user?.name}!</strong>
                  </Heading>
                </Center>
                {/* TASKS */}
                <Flex direction="column">
                  <Heading as="h3" mb="20px" color="gray.600" size="lg">
                    Priority Tasks
                  </Heading>
                  {tasks?.map((task) => {
                    return (
                      <Flex
                        key={task.id}
                        align="center"
                        color="gray.600"
                        p="3px"
                        w="50%"
                        bg={
                          msTimestamp(Date.now()) > msTimestamp(task.due_date)
                            ? applicationColors.SOFT_ERROR_COLOR
                            : null
                        }
                      >
                        <Text w="110px">
                          {formattedTaskDate(task.due_date)}
                        </Text>
                        <Box
                          bg={task.project_color}
                          mr="5px"
                          ml="10px"
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                          }}
                        ></Box>
                        <Text
                          w="120px"
                          mr="10px"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {task.project}
                        </Text>
                        <Text
                          w="150px"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {task.title}
                        </Text>
                      </Flex>
                    );
                  })}
                </Flex>
              </>
            )}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
