import React from "react";
import { Flex, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { msToFormattedTime, msTimestamp } from "../../helpers/date";

const WorkPeriodCard = ({ workPeriod }) => {
  return (
    <Flex m="5px 0">
      <Box fontSize="lg">
        <Box
          display="inline-block"
          mr="5px"
          w="10px"
          h="10px"
          borderRadius="50%"
          bg={workPeriod.project_color}
        ></Box>
        <Link
          style={{
            fontWeight: "bold",
            color: "#444",
            marginRight: "20px",
            width: "250px",
            display: "inline-block",
          }}
          as={RouterLink}
          to={`/project/${workPeriod.project_id}`}
        >
          {workPeriod.project}
        </Link>{" "}
        {workPeriod.title}
        <span
          style={{
            display: "inline",
            color: "#bbb",
            fontStyle: "italic",
            marginLeft: "50px",
          }}
        >
          {msToFormattedTime(
            msTimestamp(workPeriod.end_time) -
              msTimestamp(workPeriod.start_time)
          )}
        </span>
      </Box>
    </Flex>
  );
};

export default WorkPeriodCard;
