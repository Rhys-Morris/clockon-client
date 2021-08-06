import React from "react";
import { Flex, Box, Heading, Text, Input, Center } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import WorkPeriodForm from "./forms/WorkPeriodForm";
import Timer from "./Timer";
import { getWorkPeriods } from "../data/api";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_WEEK } from "../helpers/date";
import WorkPeriodCard from "./cards/WorkPeriodCard";
import { useHistory } from "react-router-dom";
import applicationColors from "../style/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faClock,
  faPenAlt,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import NewButton from "./styled/NewButton";

const Work = () => {
  const [workPeriods, setWorkPeriods] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [filteredWork, setFilteredWork] = React.useState([]);
  const [nameFilter, setNameFilter] = React.useState([]);
  const [detailsFilter, setDetailsFilter] = React.useState("");
  let history = useHistory();

  // GET WORK PERIODS ON RENDER
  React.useEffect(() => {
    getWorkPeriods()
      .then((data) => {
        if (data.work_periods) {
          setWorkPeriods(data.work_periods);
          setFilteredWork(data.work_periods);
        }
        // ERROR HANDLING
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          history.push("/401");
        }
      });
  }, []);

  // SET WORK PERIODS WHEN ALTERED DOWNSTREAM
  const updateCurrentView = (workPeriods) => {
    setWorkPeriods(workPeriods);
  };

  // WORK FROM LAST 24 HOURS
  const today = () => {
    return filteredWork.filter(
      (wp) => Date.now() - wp.end_time < MILLISECONDS_IN_DAY
    );
  };
  // WORK FROM LAST 1 WEEK
  const lastWeek = () => {
    return filteredWork.filter(
      (wp) =>
        Date.now() - wp.end_time < MILLISECONDS_IN_WEEK &&
        Date.now() - wp.end_time > MILLISECONDS_IN_DAY
    );
  };

  // WORK > 1 WEEK
  const remaining = () => {
    return filteredWork.filter(
      (wp) => Date.now() - wp.end_time > MILLISECONDS_IN_WEEK
    );
  };

  // FILTER
  React.useEffect(() => {
    let filtered = [...workPeriods];
    if (nameFilter) {
      filtered = filtered.filter((wp) =>
        wp.project.match(new RegExp(nameFilter, "i"))
      );
    }
    if (detailsFilter) {
      filtered = filtered.filter((wp) =>
        wp.title.match(new RegExp(detailsFilter, "i"))
      );
    }
    setFilteredWork(filtered);
  }, [workPeriods, nameFilter, detailsFilter]);

  const buttonStyle = {
    flexDirection: "column",
    background: applicationColors.DARK_LIGHT_BLUE,
    borderRadius: "10px",
    height: "300px",
    width: "300px",
    padding: "10px",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "0 20px",
    boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.15)",
    transition: ".3s",
    cursor: "pointer",
  };

  console.log(workPeriods);

  return (
    <Flex h="100%">
      <Box
        w="200px"
        bgGradient="linear(to-b, #30415D, #031424)"
        h="100%"
        p="15px"
      >
        <Sidebar />
      </Box>
      <Box flex="1" color="gray.600">
        <section>
          {/* HEADER */}
          <Box p="30px 35px" w="100%" boxShadow="0 1px 3px 0 rgba(0, 0,0, .2)">
            <Heading color="gray.800" fontSize="xl">
              Log Your Work
            </Heading>
          </Box>
          <Flex
            direction="column"
            justify="center"
            align="flex-start"
            mt="20px"
            p="30px 100px"
          >
            {/* Buttons */}
            {!showForm && !showTimer && (
              <Flex align="center" alignSelf="center" mt="30px">
                <Flex
                  style={buttonStyle}
                  _hover={{ transform: "translateY(-5px)" }}
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  <FontAwesomeIcon color="white" size="9x" icon={faPencilAlt} />
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="md"
                    color="white"
                  >
                    Manually enter a previous work period
                  </Text>
                </Flex>
                <Flex
                  style={buttonStyle}
                  _hover={{ transform: "translateY(-5px)" }}
                  onClick={() => {
                    setShowTimer(true);
                  }}
                >
                  <FontAwesomeIcon color="white" size="9x" icon={faClock} />
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    fontSize="md"
                    color="white"
                  >
                    Set a timer to start work now
                  </Text>
                </Flex>
              </Flex>
            )}
            {showForm && (
              <WorkPeriodForm
                setShowForm={setShowForm}
                updateCurrentView={updateCurrentView}
              />
            )}
            {showTimer && (
              <Timer
                setShowTimer={setShowTimer}
                updateCurrentView={updateCurrentView}
              />
            )}
            {(showTimer || showForm) && (
              <NewButton
                onClick={() => {
                  setShowForm(false);
                  setShowTimer(false);
                }}
              >
                Go Back
              </NewButton>
            )}
            <Heading as="h3" fontWeight="300" mt="50px" size="lg">
              Recent Work
            </Heading>
            {/* Filters */}
            <Flex mt="20px" align="center" justify="start" mb="30px">
              <Text fontSize="md" mr="10px" w="20">
                Filter by:
              </Text>
              <Center mr="10px">
                <FontAwesomeIcon
                  icon={faClipboard}
                  style={{ marginRight: "5px" }}
                />
                <Input
                  placeholder="Project name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </Center>
              <Center mr="10px">
                <FontAwesomeIcon
                  icon={faPenAlt}
                  style={{ marginRight: "5px" }}
                />
                <Input
                  placeholder="Work details"
                  value={detailsFilter}
                  onChange={(e) => setDetailsFilter(e.target.value)}
                />
              </Center>
            </Flex>
            {/* WORK PERIODS */}
            <Box
              w="100%"
              maxWidth="1200px"
              h="40vh"
              overflowY="scroll"
              pr="30px"
            >
              {/* Today */}
              <Heading
                as="h4"
                fontWeight="300"
                mt="30px"
                mb="10px"
                size="md"
                textTransform="uppercase"
              >
                Last 24 Hours
              </Heading>
              {(workPeriods?.length === 0 ||
                (workPeriods?.length > 0 && today().length === 0)) && (
                <Text>No work completed in the last 24 hours</Text>
              )}
              {workPeriods?.length > 0 &&
                today().map((wp) => (
                  <WorkPeriodCard
                    key={wp.id}
                    updateCurrentView={updateCurrentView}
                    workPeriod={wp}
                  />
                ))}
              {/* This Week */}
              <Heading
                as="h4"
                fontWeight="300"
                mt="30px"
                mb="10px"
                size="md"
                textTransform="uppercase"
              >
                This Week
              </Heading>
              {(workPeriods?.length === 0 ||
                (workPeriods?.length > 0 && lastWeek().length === 0)) && (
                <Text>No work completed in the last week</Text>
              )}
              {workPeriods?.length > 0 &&
                lastWeek().map((wp) => (
                  <WorkPeriodCard
                    key={wp.id}
                    updateCurrentView={updateCurrentView}
                    workPeriod={wp}
                  />
                ))}
              {/* Over 1 week */}
              <Heading
                as="h4"
                fontWeight="300"
                mt="30px"
                mb="10px"
                size="md"
                textTransform="uppercase"
              >
                PREVIOUS WORK
              </Heading>
              {(workPeriods?.length === 0 ||
                (workPeriods?.length > 0 && remaining().length === 0)) && (
                <Text>No work to display</Text>
              )}
              {workPeriods?.length > 0 &&
                remaining().map((wp) => (
                  <WorkPeriodCard
                    key={wp.id}
                    updateCurrentView={updateCurrentView}
                    workPeriod={wp}
                  />
                ))}
            </Box>
          </Flex>
        </section>
      </Box>
    </Flex>
  );
};

export default Work;
