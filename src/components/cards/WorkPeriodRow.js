import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { msToFormattedTime, msTimestamp } from "../../helpers/date";

const WorkPeriodRow = ({ workPeriod }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      m="5px 0"
      fontSize="lg"
      p="5px 25px"
      color="gray.600"
    >
      <Text> {workPeriod.title}</Text>
      <Flex align="center">
        <Text
          display="inline"
          color="gray.400"
          fontStyle="italic"
          marginRight="30px"
        >
          {msToFormattedTime(
            msTimestamp(workPeriod.end_time) -
              msTimestamp(workPeriod.start_time)
          )}
        </Text>
      </Flex>
    </Flex>
  );
};

export default WorkPeriodRow;
