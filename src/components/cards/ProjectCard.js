import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTimes } from "@fortawesome/free-solid-svg-icons";
import ConfirmDestroyModal from "../modals/ConfirmDestroyModal";
import { destroyProject } from "../../data/api";
import { useHistory } from "react-router-dom";
import applicationColors from "../../style/colors";
import PropTypes from "prop-types";

const ProjectCard = ({ project, dispatch }) => {
  const dueDate = project.due_date;
  const history = useHistory();

  const destroyCard = () => {
    destroyProject(project.id).then((data) =>
      dispatch({ type: "setProjects", data: data.projects })
    );
  };

  return (
    <Flex
      align="center"
      color="gray.600"
      fontWeight="bold"
      boxShadow="0 1px 2px 0 rgba(0, 0,0, .2)"
      p="15px 30px"
      _hover={{
        transition: ".3s",
        bg: "#eeeeff",
        cursor: "pointer",
      }}
      onClick={(e) => {
        if (e.target.closest("div").id !== "destroy")
          history.push(`/project/${project.id}`);
      }}
    >
      <Flex flex="2" align="center" justifyContent="space-between">
        <Flex align="center">
          <Box
            style={{
              backgroundColor: project.color,
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          ></Box>
          <Text fontSize="xs" casing="uppercase">
            {project.name}
          </Text>
        </Flex>
        {project.billable && <FontAwesomeIcon icon={faDollarSign} />}
      </Flex>
      <Text fontSize="xs" casing="uppercase" flex="1.5" textAlign="center">
        {project.client}
      </Text>
      <Text fontSize="sm" casing="uppercase" flex="1.5" textAlign="center">
        {project.work_periods ? project.work_periods.toFixed(1) : 0}
      </Text>
      <Text fontSize="sm" casing="uppercase" flex="2" textAlign="center">
        {dueDate}
      </Text>
      <ConfirmDestroyModal
        trigger={
          <FontAwesomeIcon
            icon={faTimes}
            color={applicationColors.SOFT_ERROR_COLOR}
            style={{ cursor: "pointer" }}
          />
        }
        action={destroyCard}
      />
    </Flex>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object,
  dispatch: PropTypes.func,
};

export default ProjectCard;
