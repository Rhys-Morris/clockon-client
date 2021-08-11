import React from "react";
import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Select,
  Skeleton,
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
import {
  convertWorkToHours,
  sum,
  totalIncome,
  greeting,
} from "../helpers/helper";
import { BarChart, PieChart } from "./charts/DashChart";
import { dashReducer } from "../data/reducers";
import CurrencyContext from "../contexts/currencyContext";

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
  const { user, tasks, loading, workPeriods, period, error } = dashState;
  const { currency } = React.useContext(CurrencyContext);

  // ----- RENDER -----
  React.useEffect(() => {
    dispatch({ type: "request" });
    getDash()
      .then((data) => {
        // Load over at least 1 secs - smoother transition
        setTimeout(() => {
          dispatch({
            type: "success",
            tasks: data.tasks,
            user: data.user,
            work_periods: data.work_periods,
          });
        }, 1000);
      })
      .catch((e) => {
        // Redirect unauthorised
        if (e?.response?.status === 401) history.push("/401");
        dispatch({ type: "failure", data: e.message });
      });
  }, [history]);

  // Set title
  React.useEffect(() => {
    window.document.title = `ClockOn | ${
      user?.name ? `${user?.name} - ` : ""
    } Dashboard`;
  }, [user]);

  // ---- FETCH NEW WORK PERIODS -----
  React.useEffect(() => {
    dispatch({ type: "request" });
    updateDash(period)
      .then((data) => {
        if (data.work_periods) {
          setTimeout(() => {
            dispatch({ type: "updateWorkPeriods", data: data.work_periods });
          }, 1000);
        }
      })
      .catch((e) => {
        // Redirect unauthorised
        if (e?.response?.status === 401) history.push("/401");
      });
  }, [period]);

  return (
    <>
      <Flex h="100%">
        <Box
          w="200px"
          bgGradient="linear(to-b, #30415D, #031424)"
          h="100%"
          p="15px"
          position="fixed"
        >
          <Sidebar />
        </Box>
        <Box flex="1" color="gray.400" ml="200px">
          <Flex h="100%" direction="column">
            {(loading || error) && (
              <Flex direction="column" h="50vh" align="center" justify="center">
                {loading && (
                  <>
                    <Heading
                      mb="40px"
                      size="2xl"
                      color="gray.700"
                      fontWeight="400"
                    >
                      Loading Dashboard
                    </Heading>
                    <Flex w="100px" justify="space-between">
                      <Skeleton
                        startColor={applicationColors.LIGHT_BLUE}
                        endColor={applicationColors.NAVY}
                        h="30px"
                        w="30px"
                        borderRadius="50%"
                      />
                      <Skeleton
                        startColor={applicationColors.LIGHT_BLUE}
                        endColor={applicationColors.NAVY}
                        h="30px"
                        w="30px"
                        borderRadius="50%"
                      />
                      <Skeleton
                        startColor={applicationColors.LIGHT_BLUE}
                        endColor={applicationColors.NAVY}
                        h="30px"
                        w="30px"
                        borderRadius="50%"
                      />
                    </Flex>
                  </>
                )}
                {error && (
                  <Heading
                    size="2xl"
                    color={applicationColors.ERROR_COLOR}
                    fontWeight="400"
                  >
                    An error occurred whilst loading
                  </Heading>
                )}
              </Flex>
            )}
            {!loading && !error && (
              <>
                <Center h="100px" mt="50px">
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
                <Flex
                  p="30px 50px 10px 50px"
                  justify="space-around"
                  align="center"
                >
                  {/* SELECT PERIOD */}
                  <Flex direction="column" width="65%">
                    <Select
                      w="300px"
                      color="gray.700"
                      textTransform="uppercase"
                      mb="20px"
                      value={period}
                      onChange={(e) =>
                        dispatch({ type: "setPeriod", data: e.target.value })
                      }
                    >
                      <option value="week">Last week</option>
                      <option value="month">Last six weeks</option>
                    </Select>
                    {/* GRAPH */}
                    <Heading
                      alignSelf="center"
                      as="h3"
                      size="md"
                      color="gray.700"
                      mb="10px"
                    >
                      Hours Worked Per Project
                    </Heading>
                    <BarChart workPeriods={workPeriods} period={period} />
                  </Flex>
                  {/* TOTALS */}
                  <Flex direction="column">
                    <Heading as="h3" size="md" color="gray.700" mb="10px">
                      Popular Projects
                    </Heading>
                    {workPeriods && workPeriods.length !== 0 && (
                      <PieChart workPeriods={workPeriods} />
                    )}
                    {(!workPeriods || workPeriods.length === 0) && (
                      <Text fontSize="3xl" color="gray.400" mb="20px">
                        No work to display
                      </Text>
                    )}
                    <Heading as="h3" size="md" color="gray.700">
                      Total Hours
                    </Heading>
                    <Text fontSize="3xl" color="gray.400" mb="20px">
                      {workPeriods && workPeriods.length !== 0
                        ? msToFormattedTime(
                            sum(convertWorkToHours(workPeriods)) *
                              MILLISECONDS_IN_HOUR
                          )
                        : "No work to display"}
                    </Text>
                    <Heading as="h3" size="md" color="gray.700">
                      Estimated Total Income
                    </Heading>
                    <Text fontSize="3xl" color="gray.400" mb="20px">
                      {workPeriods && workPeriods.length !== 0
                        ? `${currency[currency.length - 1]}${totalIncome(
                            workPeriods
                          ).toFixed(2)}`
                        : "No work to display"}
                    </Text>
                  </Flex>
                </Flex>
                {/* TASKS */}
                <Flex direction="column" p="50px">
                  <Heading as="h3" mb="20px" color="gray.600" size="lg">
                    Priority Tasks
                  </Heading>
                  {(!tasks || tasks.length === 0) && (
                    <Text>No tasks to display</Text>
                  )}
                  {tasks?.map((task) => {
                    return (
                      <Flex
                        key={task.id}
                        align="center"
                        p="3px"
                        w="100%"
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
                          w="175px"
                          mr="10px"
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {task.project}
                        </Text>
                        <Text
                          whiteSpace="nowrap"
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
