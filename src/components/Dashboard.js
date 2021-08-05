import React from "react";
import {
  Box,
  Flex,
  Center,
  Heading,
  Spinner,
  Text,
  Select,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { getDash, updateDash } from "../data/api";
import { useHistory } from "react-router-dom";
import {
  formattedTaskDate,
  MILLISECONDS_IN_HOUR,
  msTimestamp,
  msToFormattedTime,
} from "../helpers/date";
import applicationColors from "../style/colors";
import { convertWorkToHours, sum, totalIncome } from "../helpers/helper";
import { BarChart, PieChart } from "./charts/DashChart";

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
        workPeriods: action.work_periods,
        user: action.user,
      };
    case "failure":
      return { ...state, loading: false, error: null };
    case "setPeriod":
      return { ...state, period: action.data };
    case "updateWorkPeriods":
      return {
        ...state,
        workPeriods: action.data,
        loading: false,
        error: null,
      };
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
    workPeriods: null,
    period: "week",
  };
  const [dashState, dispatch] = React.useReducer(dashReducer, initialState);
  const { user, tasks, loading, workPeriods, period } = dashState;

  // ----- RENDER -----
  React.useEffect(() => {
    // Handle no token
    if (!sessionStorage.getItem("token")) history.push("/401");
    // Start request
    dispatch({ type: "request" });
    getDash()
      .then((data) => {
        if (data.user) console.log(data);
        dispatch({
          type: "success",
          tasks: data.tasks,
          user: data.user,
          work_periods: data.work_periods,
        });
      })
      // BUG
      .catch((e) => {
        if (e?.response?.status === 401) history.push("/401");
      });
  }, [history]);

  // ---- FETCH NEW WORK PERIODS -----
  React.useEffect(() => {
    dispatch({ type: "request" });
    updateDash(period)
      .then((data) => {
        if (data.work_periods) {
          dispatch({ type: "updateWorkPeriods", data: data.work_periods });
        }
      })
      .catch((e) => console.warn(e));
  }, [period]);

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
                <Center h="100px" boxShadow="0 1px 3px 0 rgba(0, 0,0, .2)">
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
                {/* MAIN DASH */}
                <Flex p="50px" justify="space-around">
                  {/* SELECT PERIOD */}
                  <Flex direction="column" width="65%">
                    <Select
                      w="300px"
                      color="gray.700"
                      textTransform="uppercase"
                      value={period}
                      onChange={(e) =>
                        dispatch({ type: "setPeriod", data: e.target.value })
                      }
                    >
                      <option value="week">Last week</option>
                      <option value="fortnight">Last fortnight</option>
                      <option value="month">Last month</option>
                    </Select>
                    {/* GRAPH */}
                    <BarChart workPeriods={workPeriods} period={period} />
                  </Flex>
                  {/* TOTALS */}
                  <Flex direction="column">
                    <Heading as="h3" size="md" color="gray.700">
                      Total Hours
                    </Heading>
                    <Text fontSize="3xl" color="gray.400" mb="20px">
                      {workPeriods && workPeriods.length !== 0
                        ? msToFormattedTime(
                            sum(convertWorkToHours(workPeriods)) *
                              MILLISECONDS_IN_HOUR
                          )
                        : "No work completed"}
                    </Text>
                    <Heading as="h3" size="md" color="gray.700">
                      Total Income
                    </Heading>
                    <Text fontSize="3xl" color="gray.400" mb="20px">
                      {workPeriods && workPeriods.length !== 0
                        ? `$${totalIncome(workPeriods).toFixed(2)}`
                        : "No work completed"}
                    </Text>
                    <Heading as="h3" size="md" color="gray.700" mb="10px">
                      Most Popular Project
                    </Heading>
                    <PieChart workPeriods={workPeriods} period={period} />
                  </Flex>
                </Flex>
                {/* TASKS */}
                <Flex direction="column" p="50px">
                  <Heading as="h3" mb="20px" color="gray.600" size="lg">
                    Priority Tasks
                  </Heading>
                  {tasks?.map((task) => {
                    return (
                      <Flex
                        key={task.id}
                        align="center"
                        p="3px"
                        w="50%"
                        fontWeight={
                          msTimestamp(Date.now()) > msTimestamp(task.due_date)
                            ? "bold"
                            : "400"
                        }
                        color={
                          msTimestamp(Date.now()) > msTimestamp(task.due_date)
                            ? applicationColors.ERROR_COLOR
                            : "gray.600"
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
