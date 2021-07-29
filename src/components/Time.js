import React from "react";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import WorkPeriodForm from "./forms/WorkPeriodForm";
import { getWorkPeriods } from "../data/api";
import {
  msTimestamp,
  MILLISECONDS_IN_DAY,
  MILLISECONDS_IN_WEEK,
} from "../helpers/date";
import WorkPeriodCard from "./cards/WorkPeriodCard";
import { useHistory } from "react-router-dom";

const Work = () => {
  const [workPeriods, setWorkPeriods] = React.useState([]);
  let history = useHistory();

  // GET WORK PERIODS ON RENDER
  React.useEffect(() => {
    getWorkPeriods()
      .then((data) => {
        if (data.work_periods) {
          setWorkPeriods(data.work_periods);
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

  // WORK FORM LAST 24 HOURS
  const today = () => {
    return workPeriods.filter(
      (wp) => Date.now() - msTimestamp(wp.end_time) < MILLISECONDS_IN_DAY
    );
  };
  // WORK FORM LAST 1 WEEK
  const lastWeek = () => {
    return workPeriods.filter(
      (wp) =>
        Date.now() - msTimestamp(wp.end_time) < MILLISECONDS_IN_WEEK &&
        Date.now() - msTimestamp(wp.end_time) > MILLISECONDS_IN_DAY
    );
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
              Time
            </Heading>
          </Box>
          <Flex
            direction="column"
            justify="center"
            align="flex-start"
            mt="20px"
            p="30px 100px"
          >
            <Heading
              as="h2"
              size="lg"
              fontWeight="400"
              mb="10px"
              alignSelf="center"
            >
              Add a new work period
            </Heading>
            <WorkPeriodForm updateCurrentView={updateCurrentView} />
            <Heading as="h3" fontWeight="300" mt="50px" size="lg">
              Recent Work
            </Heading>
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
            {workPeriods?.length > 0 && today().length === 0 && (
              <Text>No work completed in the last 24 hours</Text>
            )}
            {workPeriods?.length > 0 &&
              today().map((wp) => (
                <WorkPeriodCard key={wp.id} workPeriod={wp} />
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
            {workPeriods?.length > 0 && lastWeek().length === 0 && (
              <Text>No work completed in the last week</Text>
            )}
            {workPeriods?.length > 0 &&
              lastWeek().map((wp) => (
                <WorkPeriodCard key={wp.id} workPeriod={wp} />
              ))}
          </Flex>
        </section>
      </Box>
    </Flex>
  );
};

export default Work;
