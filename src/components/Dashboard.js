import React from "react";
import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Select,
  Skeleton,
  useMediaQuery,
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
import { HamburgerBox, HamburgerLine } from "./styled/HamburgerElements";

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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // MEDIA QUERIES
  const [breakpoint450] = useMediaQuery("(max-width: 450px)");
  const [breakpoint600] = useMediaQuery("(max-width: 600px)");
  const [breakpoint800] = useMediaQuery("(max-width: 800px)");
  const [breakpoint1000] = useMediaQuery("(max-width: 1000px)");
  const [breakpoint1500] = useMediaQuery("(max-width: 1500px)");
  const [breakpoint1800] = useMediaQuery("(max-width: 1800px)");

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
        {/* Hamburger */}
        <Box
          display={breakpoint1000 && !sidebarOpen ? "block" : "none"}
          position="fixed"
          left="10px"
          top="10px"
          id="hamburger"
          cursor="pointer"
          borderRadius="50%"
          boxShadow="3px 3px 10px 3px rgba(0, 0,0, .2)"
          zIndex="1000"
          onClick={() => setSidebarOpen(true)}
        >
          <HamburgerBox>
            <HamburgerLine />
            <HamburgerLine />
            <HamburgerLine />
          </HamburgerBox>
        </Box>
        {/* Sidebar */}
        <Box
          w="200px"
          bgGradient="linear(to-b, #30415D, #031424)"
          h="100%"
          p="15px"
          opacity={breakpoint1000 && !sidebarOpen ? 0 : 1}
          transition=".3s"
          display={breakpoint1000 && !sidebarOpen ? "none" : "block"}
          position="fixed"
          id="sidebar"
          zIndex="1000"
        >
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </Box>
        <Box flex="1" ml={breakpoint1000 ? "0" : "200px"}>
          <Flex
            direction="column"
            bg={breakpoint1000 ? applicationColors.NAVY : "white"}
            minHeight="100vh"
          >
            {(loading || error) && (
              <Flex direction="column" h="50vh" align="center" justify="center">
                {loading && (
                  <>
                    <Heading
                      mb="40px"
                      size="2xl"
                      color={breakpoint1000 ? "white" : "gray.700"}
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
                <Center h="100px" mt="30px">
                  {/* GREETING */}
                  <Heading
                    as="h2"
                    size="2xl"
                    mt={breakpoint800 ? "30px" : "0"}
                    mb={breakpoint1500 ? "20px" : "0"}
                    style={{ fontWeight: 300 }}
                    color={breakpoint1000 ? "white" : "#031424"}
                  >
                    {greeting()},{" "}
                    <strong
                      style={{ color: applicationColors.DARK_LIGHT_BLUE }}
                    >
                      {user?.name}!
                    </strong>
                  </Heading>
                </Center>
                {/* BAR GRAPH */}
                <Flex
                  align="center"
                  marginBottom="25px"
                  justify="center"
                  maxWidth="2000px"
                  alignSelf="center"
                  // Hide on mobiles
                  display={breakpoint450 ? "none" : "flex"}
                >
                  {/* SELECT PERIOD */}
                  <Flex direction="column" justify="center">
                    <Select
                      w={breakpoint800 ? "auto" : "300px"}
                      mb={breakpoint1000 ? "20px" : "10px"}
                      color={breakpoint1000 ? "white" : "gray.700"}
                      textTransform="uppercase"
                      value={period}
                      fontSize={breakpoint1000 ? "md" : "lg"}
                      onChange={(e) =>
                        dispatch({ type: "setPeriod", data: e.target.value })
                      }
                    >
                      <option
                        style={
                          breakpoint1000
                            ? { background: applicationColors.NAVY }
                            : {}
                        }
                        value="week"
                      >
                        Last week
                      </option>
                      <option
                        style={
                          breakpoint1000
                            ? { background: applicationColors.NAVY }
                            : {}
                        }
                        value="month"
                      >
                        Last six weeks
                      </option>
                    </Select>
                    {/* GRAPH */}
                    <Heading
                      alignSelf="center"
                      as="h3"
                      size="lg"
                      color={
                        breakpoint1000
                          ? applicationColors.DARK_LIGHT_BLUE
                          : "gray.700"
                      }
                      mb="10px"
                    >
                      Hours Worked Per Project
                    </Heading>
                    <BarChart workPeriods={workPeriods} period={period} />
                  </Flex>
                </Flex>
                {/* TOTALS & TASKS */}
                <Flex
                  direction={breakpoint1500 ? "column" : "row"}
                  width={breakpoint1000 ? "95%" : "90%"}
                  maxWidth="1600px"
                  alignSelf="center"
                  align="center"
                  justify="space-around"
                >
                  {/* TOTALS */}
                  <Flex
                    direction={breakpoint450 ? "column" : "row"}
                    align="center"
                    mt={breakpoint450 ? "10px" : breakpoint1000 ? "30px" : "0"}
                  >
                    <Box>
                      <Heading
                        as="h3"
                        size="lg"
                        color={
                          breakpoint1000
                            ? applicationColors.DARK_LIGHT_BLUE
                            : "gray.700"
                        }
                        mb="10px"
                      >
                        Popular Projects
                      </Heading>
                      {workPeriods && workPeriods.length !== 0 && (
                        <PieChart workPeriods={workPeriods} />
                      )}
                      {(!workPeriods || workPeriods.length === 0) && (
                        <Text
                          fontSize="3xl"
                          color={breakpoint1000 ? "white" : "gray.400"}
                          mb="20px"
                        >
                          No work to display
                        </Text>
                      )}
                    </Box>
                    <Box>
                      <Heading
                        as="h3"
                        size="md"
                        color={
                          breakpoint1000
                            ? applicationColors.DARK_LIGHT_BLUE
                            : "gray.700"
                        }
                      >
                        Total Hours
                      </Heading>
                      <Text
                        fontSize={breakpoint1000 ? "2xl" : "3xl"}
                        color={breakpoint1000 ? "white" : "gray.400"}
                        mb="20px"
                      >
                        {workPeriods && workPeriods.length !== 0
                          ? msToFormattedTime(
                              sum(convertWorkToHours(workPeriods)) *
                                MILLISECONDS_IN_HOUR
                            )
                          : "No work to display"}
                      </Text>
                      <Heading
                        as="h3"
                        size="md"
                        color={
                          breakpoint1000
                            ? applicationColors.DARK_LIGHT_BLUE
                            : "gray.700"
                        }
                      >
                        Estimated Total Income
                      </Heading>
                      <Text
                        fontSize={breakpoint1000 ? "2xl" : "3xl"}
                        color={breakpoint1000 ? "white" : "gray.400"}
                        mb="20px"
                      >
                        {workPeriods && workPeriods.length !== 0
                          ? `${currency[currency.length - 1]}${totalIncome(
                              workPeriods
                            ).toFixed(2)}`
                          : "No work to display"}
                      </Text>
                    </Box>
                  </Flex>
                  {/* TASKS */}
                  <Flex
                    direction="column"
                    alignSelf="center"
                    p={breakpoint1500 ? "20px 0 " : "20px"}
                    width={
                      breakpoint1500
                        ? "100%"
                        : breakpoint1800
                        ? "600px"
                        : "750px"
                    }
                  >
                    <Heading
                      as="h3"
                      mb="20px"
                      color={
                        breakpoint1000
                          ? applicationColors.DARK_LIGHT_BLUE
                          : "gray.700"
                      }
                      size="lg"
                      textAlign={breakpoint600 ? "center" : null}
                    >
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
                          fontSize={
                            breakpoint600
                              ? "xs"
                              : breakpoint800
                              ? "sm"
                              : "inherit"
                          }
                          fontWeight={
                            msTimestamp(Date.now()) > msTimestamp(task.due_date)
                              ? "bold"
                              : "400"
                          }
                          color={
                            msTimestamp(Date.now()) > msTimestamp(task.due_date)
                              ? applicationColors.ERROR_COLOR
                              : breakpoint1000
                              ? "white"
                              : "gray.600"
                          }
                        >
                          <Text
                            width={
                              breakpoint600
                                ? "80px"
                                : breakpoint800
                                ? "90px"
                                : "100px"
                            }
                          >
                            {formattedTaskDate(task.due_date)}
                          </Text>
                          <Box
                            bg={task.project_color}
                            mr="5px"
                            ml={breakpoint800 ? "5px" : "10px"}
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                            }}
                          ></Box>
                          <Text
                            w={breakpoint600 ? "80px" : "100px"}
                            mr="20px"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {task.project}
                          </Text>
                          <Text
                            whiteSpace={breakpoint800 ? "wrap" : "nowrap"}
                            overflow="hidden"
                            textOverflow="ellipsis"
                            flex="1"
                          >
                            {task.title}
                          </Text>
                        </Flex>
                      );
                    })}
                  </Flex>
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
