import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { msToFormattedTime, msTimestamp } from "../../helpers/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import applicationColors from "../../style/colors";
import { destroyWorkPeriod } from "../../data/api";
import ConfirmDestroyModal from "../modals/ConfirmDestroyModal";

const WorkPeriodRow = ({ workPeriod, updateWorkPeriods }) => {
  const destroy = () => {
    destroyWorkPeriod(workPeriod.project_id, workPeriod.id).then((data) => {
      if (data.work_periods) {
        updateWorkPeriods(data.work_periods);
      }
    });
  };
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
        <ConfirmDestroyModal
          trigger={
            <FontAwesomeIcon
              icon={faTimes}
              color={applicationColors.ERROR_COLOR}
              cursor="pointer"
            />
          }
          action={destroy}
        />
      </Flex>
    </Flex>
  );
};

export default WorkPeriodRow;
