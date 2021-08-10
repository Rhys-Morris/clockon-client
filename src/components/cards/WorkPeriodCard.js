import React from "react";
import { Flex, Box, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { msToFormattedTime } from "../../helpers/date";
import { destroyWorkPeriod } from "../../data/api";
import ConfirmDestroyModal from "../modals/ConfirmDestroyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import applicationColors from "../../style/colors";
import PropTypes from "prop-types";

const WorkPeriodCard = ({ workPeriod, updateCurrentView }) => {
  const destroy = () => {
    destroyWorkPeriod(workPeriod.project_id, workPeriod.id).then((data) => {
      if (data.work_periods) {
        updateCurrentView(data.work_periods);
      }
    });
  };

  return (
    <Flex m="5px 0" align="center" w="100%" maxWidth="1000px" data-cy="work">
      <Flex align="center">
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
            width: "140px",
            display: "inline-block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          as={RouterLink}
          to={`/project/${workPeriod.project_id}`}
        >
          {workPeriod.project}
        </Link>
      </Flex>
      <Text
        style={{
          width: "500px",
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {workPeriod.title}
      </Text>
      <Text
        display="inline"
        color="#bbb"
        fontStyle="italic"
        w="200px"
        mr="20px"
      >
        {msToFormattedTime(workPeriod.end_time - workPeriod.start_time)}
      </Text>
      <ConfirmDestroyModal
        trigger={
          <FontAwesomeIcon
            icon={faTimes}
            color={applicationColors.ERROR_COLOR}
            cursor="pointer"
            size="lg"
            data-cy="work-delete"
          />
        }
        action={destroy}
      />
    </Flex>
  );
};

WorkPeriodCard.propTypes = {
  workPeriod: PropTypes.object,
  updateCurrentView: PropTypes.func,
};

export default WorkPeriodCard;
