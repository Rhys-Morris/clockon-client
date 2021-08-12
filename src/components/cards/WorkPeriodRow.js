import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { msToTimer, formattedTaskDate } from "../../helpers/date";
import PropTypes from "prop-types";

const WorkPeriodRow = ({ workPeriod }) => {
  return (
    <Flex
      align="center"
      m="5px 0"
      fontSize="lg"
      p="5px 25px"
      color="gray.600"
      w="100%"
    >
      <Text
        display="inline"
        fontWeight="bold"
        color="gray.500"
        marginRight="20px"
        width="120px"
      >
        {formattedTaskDate(new Date(workPeriod.end_time))}:
      </Text>
      <Text flex="1"> {workPeriod.title}</Text>
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
