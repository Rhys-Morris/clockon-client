import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ project }) => {
  return (
    <Flex
      align="center"
      color="gray.600"
      fontWeight="bold"
      boxShadow="0 1px 2px 0 rgba(0, 0,0, .2)"
      p="15px 30px"
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
      <Text fontSize="xs" casing="uppercase" flex="1.5" textAlign="center">
        {project.hoursLogged}
      </Text>
      <Text fontSize="xs" casing="uppercase" flex="2" textAlign="center">
        {project.dueDate}
      </Text>
    </Flex>
  );
};
export default ProjectCard;
