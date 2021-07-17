import React from "react";
import { Heading, Flex } from "@chakra-ui/react";
import NewClientForm from "./forms/NewClientForm";
import BaseNewModal from "./modals/BaseNewModal";

const Projects = () => {
  return (
    <section>
      <Flex
        justify="space-between"
        align="center"
        p="20px 30px"
        w="100%"
        boxShadow="0 2px 5px 0 rgba(0, 0,0, .2)"
      >
        <Heading color="gray.800" fontSize="xl">
          Projects
        </Heading>
        <BaseNewModal type="Project" toRender={<NewClientForm />} />
      </Flex>
    </section>
  );
};

export default Projects;
