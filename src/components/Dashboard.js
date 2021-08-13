import React from "react";
import {
  Box,
  Flex,
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
    nextProject: null,
    active: null,
    period: "week",
  };
  const [dashState, dispatch] = React.useReducer(dashReducer, initialState);
  const {
    user,
    tasks,
    loading,
    workPeriods,
    period,
    error,
    nextProject,
    active,
  } = dashState;
  const { currency } = React.useContext(CurrencyContext);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // MEDIA QUERIES
  const [breakpoint500] = useMediaQuery("(max-width: 500px)");
  const [breakpoint900] = useMediaQuery("(max-width: 900px)");
  const [breakpoint1000] = useMediaQuery("(max-width: 1000px)");
  const [breakpoint1500] = useMediaQuery("(max-width: 1500px)");

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
            nextProject: data.next_project,
            active: [data.active_clients, data.active_projects],
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
          align="center"
          paddingTop="50px"
          bg={breakpoint1000 ? applicationColors.NAVY : "white"}
          minHeight="100vh"
          w="100%"
        >
          {(loading || error) && (
            <Flex direction="column" h="50vh" align="center" justify="center">
              {/* LOADING */}
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
              {/* ERROR */}
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
          {/* REGULAR APPEARANCE */}
          {!loading && !error && (
            <Box>
              {/* GREETING */}
              <Heading
                as="h2"
                size="2xl"
                mb={breakpoint1500 ? "30px" : "0"}
                style={{ fontWeight: 300 }}
                color={breakpoint1000 ? "white" : "#031424"}
                textAlign="center"
              >
                {greeting()},{" "}
                <strong style={{ color: applicationColors.DARK_LIGHT_BLUE }}>
                  {user?.name}!
                </strong>
              </Heading>
              {/* ROW */}
              <Flex
                marginBottom="25px"
                direction={breakpoint1500 ? "column-reverse" : "row"}
                p="20px"
                width="100%"
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  mr={breakpoint1000 ? "0" : "40px"}
                >
                  {/* BAR GRAPH */}
                  <Box display={breakpoint500 ? "none" : "block"}>
                    <Heading
                      alignSelf="center"
                      as="h3"
                      size="lg"
                      color={breakpoint1000 ? "white" : "gray.700"}
                      mb="10px"
                    >
                      Hours Worked Per Project
                    </Heading>
                    <BarChart workPeriods={workPeriods} period={period} />
                  </Box>
                  {/* TASKS */}
                  <Flex
                    direction="column"
                    padding={breakpoint1000 ? "0" : "20px"}
                    width={breakpoint900 ? "90vw" : "750px"}
                    marginTop="50px"
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
                    >
                      Upcoming Tasks
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
                          w="90%"
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
                          fontSize={breakpoint1000 ? "sm" : "med"}
                        >
                          <Text width="100px">
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
                            w="100px"
                            mr="20px"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {task.project}
                          </Text>
                          <Text
                            whiteSpace={breakpoint1000 ? "wrap" : "nowrap"}
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
                {/* WRAPPER */}
                <Flex
                  direction="column"
                  width={breakpoint1000 ? "95%" : "90%"}
                  alignSelf="center"
                  align={breakpoint1500 ? "center" : "start"}
                  mb={breakpoint1500 ? "75px" : "0"}
                >
                  <Flex direction="row" justify="space-around">
                    {/* TOTALS */}
                    <Flex direction="column" align="center">
                      <Select
                        alignSelf="flex-end"
                        w={breakpoint1500 ? "100%" : "200px"}
                        mb={breakpoint1000 ? "20px" : "10px"}
                        color={breakpoint1000 ? "white" : "gray.700"}
                        textTransform="uppercase"
                        value={period}
                        fontSize={breakpoint1000 ? "md" : "lg"}
                        onChange={(e) =>
                          dispatch({
                            type: "setPeriod",
                            data: e.target.value,
                          })
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
                      <Heading
                        as="h3"
                        size="lg"
                        color={breakpoint1000 ? "white" : "gray.700"}
                        mb="10px"
                      >
                        Currently Active Projects
                      </Heading>
                      <Flex
                        direction="row"
                        align="center"
                        mt={breakpoint1000 ? "30px" : "0"}
                      >
                        <Box>
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
                      {/* NEXT PROJECT */}
                      <Box
                        borderRadius="5px"
                        marginTop="20px"
                        width="450px"
                        height="120px"
                        bgGradient="linear(to-r, #30415D, #031424)"
                        boxShadow="2px 2px 8px 2px rgba(0,0,0,.2)"
                        color="white"
                        border={breakpoint1000 ? "3px solid white" : null}
                        fontWeight="bold"
                      >
                        <Flex justify="space-between">
                          <Text p="15px 20px" casing="uppercase">
                            NEXT DUE:
                          </Text>
                          <Text p="15px 20px">
                            {formattedTaskDate(nextProject?.due_date)}
                          </Text>
                        </Flex>
                        <Text p="0 30px" casing="uppercase" fontSize="2xl">
                          {nextProject?.name}
                        </Text>
                      </Box>
                      {/* ACTIVE */}
                      <Flex direction="row" justify="center" align="center">
                        <Flex
                          justify="center"
                          align="center"
                          borderRadius="5px"
                          marginTop="20px"
                          marginRight="50px"
                          width="200px"
                          height="200px"
                          boxShadow="2px 2px 8px 2px rgba(0,0,0,.2)"
                          border={
                            breakpoint1000
                              ? "3px solid white"
                              : `3px solid ${applicationColors.NAVY}`
                          }
                          bgGradient={`linear(to-r, ${applicationColors.SOFT_LIGHT_BLUE}, ${applicationColors.DARK_LIGHT_BLUE})`}
                        >
                          <Text
                            casing="uppercase"
                            fontSize="3xl"
                            textAlign="center"
                            color="gray.800"
                            fontWeight="bold"
                          >
                            {active && active[0] ? active[0] : 0} Active Client
                            {active && active[0] === 1 ? "" : "s"}
                          </Text>
                        </Flex>
                        <Flex
                          justify="center"
                          align="center"
                          borderRadius="5px"
                          marginTop="20px"
                          width="200px"
                          height="200px"
                          boxShadow="2px 2px 8px 2px rgba(0,0,0,.2)"
                          border={
                            breakpoint1000
                              ? "3px solid white"
                              : `3px solid ${applicationColors.NAVY}`
                          }
                          bgGradient={`linear(to-r, ${applicationColors.SOFT_LIGHT_BLUE}, ${applicationColors.DARK_LIGHT_BLUE})`}
                        >
                          <Text
                            casing="uppercase"
                            fontSize="3xl"
                            textAlign="center"
                            color="gray.800"
                            fontWeight="bold"
                          >
                            {active && active[1] ? active[1] : 0} Active Project
                            {active && active[1] === 1 ? "" : "s"}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Dashboard;
