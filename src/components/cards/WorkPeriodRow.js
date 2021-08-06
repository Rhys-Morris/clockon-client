import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { msToTimer, inputFormattedTimestamp } from "../../helpers/date";
import PropTypes from "prop-types";

const WorkPeriodRow = ({ workPeriod }) => {
  return (
    <Flex align="center" m="5px 0" fontSize="lg" p="5px 25px" color="gray.600">
      <Text
        display="inline"
        color="gray.500"
        fontStyle="italic"
        marginRight="30px"
      >
        {inputFormattedTimestamp(workPeriod.end_time, true)}:
      </Text>
      <Text> {workPeriod.title}</Text>
      <Text
        display="inline"
        color="gray.400"
        fontStyle="italic"
        marginLeft="30px"
      >
        {msToTimer(workPeriod.end_time - workPeriod.start_time)}
      </Text>
    </Flex>
  );
};

WorkPeriodRow.propTypes = {
  workPeriod: PropTypes.object,
};

export default WorkPeriodRow;
