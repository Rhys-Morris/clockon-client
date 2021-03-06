import React from "react";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import WorkPeriodRow from "./cards/WorkPeriodRow";
import PropTypes from "prop-types";

const WorkPeriods = ({ workPeriods, updateWorkPeriods }) => {
  return (
    <Flex
      flex="1"
      direction="column"
      style={{ borderLeft: "1px solid rgba(0,0,0,.12)" }}
    >
      {/* Heading */}
      <Flex justify="space-between" align="center" p="10px 20px">
        <Heading as="h3" fontWeight="bold" fontSize="2xl" color="gray.500">
          Recent Work Completed
        </Heading>
        <Link
          as={RouterLink}
          to="/work"
          color="gray.600"
          fontSize="lg"
          _hover={{ textDecoration: "none", color: "gray.400" }}
        >
          Add work period
        </Link>
      </Flex>
      {workPeriods?.length === 0 && (
        <Text m="10px 25px">No work currently undertaken</Text>
      )}
      {workPeriods &&
        workPeriods
          .reverse()
          .slice(0, 8)
          .map((wp) => (
            <WorkPeriodRow
              key={wp.id}
              workPeriod={wp}
              updateWorkPeriods={updateWorkPeriods}
            />
          ))}
    </Flex>
  );
};

WorkPeriods.propTypes = {
  workPeriods: PropTypes.array,
  updateWorkPeriods: PropTypes.func,
};

export default WorkPeriods;
