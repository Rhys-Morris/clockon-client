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

const Work = () => {
  const [workPeriods, setWorkPeriods] = React.useState([]);

  // GET WORK PERIODS ON RENDER
  React.useEffect(() => {
    getWorkPeriods().then((data) => {
      if (data.work_periods) {
        setWorkPeriods(data.work_periods);
      }
      // ERROR HANDLING
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
            align="center"
            mt="20px"
            p="30px"
          >
            <Heading as="h2" size="lg" fontWeight="400" mb="10px">
              Add a new work period
            </Heading>
            <WorkPeriodForm updateCurrentView={updateCurrentView} />
            <Heading as="h3">Recent Work</Heading>
            {/* Today */}
            <Heading as="h4">Today</Heading>
            {workPeriods?.length > 0 && today().length === 0 && (
              <Text>No work completed in the last 24 hours</Text>
            )}
            {workPeriods?.length > 0 &&
              today().map((wp) => <p key={wp.id}>{wp.title}</p>)}
            {/* This Week */}
            <Heading as="h4">This Week</Heading>
            {workPeriods?.length > 0 && lastWeek().length === 0 && (
              <Text>No work completed in the last week</Text>
            )}
            {workPeriods?.length > 0 &&
              lastWeek().map((wp) => <p key={wp.id}>{wp.title}</p>)}
          </Flex>
        </section>
      </Box>
    </Flex>
  );
};

export default Work;
