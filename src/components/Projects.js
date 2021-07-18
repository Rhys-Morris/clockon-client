import React from "react";
import {
  Heading,
  Flex,
  Text,
  Input,
  Select,
  Center,
  filter,
} from "@chakra-ui/react";
import NewClientForm from "./forms/NewClientForm";
import BaseNewModal from "./modals/BaseNewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faDollarSign,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { mockProjects } from "../data/api";
import ProjectCard from "./cards/ProjectCard";

// STYLING
const iconMarginRight = {
  marginRight: "5px",
};

const inputStyle = {
  width: "175px",
};

const activeSelectStyle = {
  border: "2px solid gray",
};

const Projects = () => {
  // State
  const [projects, setProjects] = React.useState([]);
  // Filtering Projects
  const [filteredProjects, setFilteredProjects] = React.useState([]);
  const [filterClient, setFilterClient] = React.useState("");
  const [filterProjectName, setFilterProjectName] = React.useState("");
  const [filterBillable, setFilterBillable] = React.useState("both");
  const [filterActive, setFilterActive] = React.useState("true");

  // Load projects on render
  React.useEffect(() => {
    setProjects([...mockProjects]);
  }, []);

  // Filter Side Effect
  React.useEffect(() => {
    let filtered = [...projects];
    console.log(filtered);
    if (filterClient) {
      filtered = filtered.filter((p) =>
        p.client.match(new RegExp(filterClient, "i"))
      );
    }
    if (filterProjectName) {
      filtered = filtered.filter((p) =>
        p.name.match(new RegExp(filterProjectName, "i"))
      );
    }
    if (filterBillable !== "both") {
      filtered = filtered.filter((p) => {
        if (filterBillable === "true" && p.billable) return true;
        if (filterBillable === "false" && !p.billable) return true;
        return false;
      });
    }
    if (filterActive !== "both") {
      filtered = filtered.filter((p) => {
        if (filterActive === "true" && p.active) return true;
        if (filterActive === "false" && !p.active) return true;
        return false;
      });
    }
    setFilteredProjects(filtered);
  }, [projects, filterProjectName, filterClient, filterBillable, filterActive]);

  return (
    <section>
      {/* HEADER */}
      <Flex
        justify="space-between"
        align="center"
        p="20px 30px"
        w="100%"
        boxShadow="0 1px 3px 0 rgba(0, 0,0, .2)"
      >
        <Heading color="gray.800" fontSize="xl">
          Projects
        </Heading>
        <BaseNewModal type="Project" toRender={<NewClientForm />} />
      </Flex>
      {/* FILTER ROW */}
      <Flex
        align="center"
        justify="space-between"
        p="15px 30px"
        color="gray.500"
        boxShadow="0 1px 3px 0 rgba(0, 0,0, .2)"
      >
        <Flex align="center" justify="start">
          <Text fontSize="md" mr="10px" w="20">
            Filter by:
          </Text>
          <Center mr="10px">
            <FontAwesomeIcon icon={faUser} style={iconMarginRight} />
            <Input
              placeholder="Client name"
              style={inputStyle}
              value={filterClient}
              onChange={(e) => setFilterClient(e.target.value)}
            />
          </Center>
          <Center mr="10px">
            <FontAwesomeIcon icon={faClipboardList} style={iconMarginRight} />
            <Input
              placeholder="Project name"
              style={inputStyle}
              value={filterProjectName}
              onChange={(e) => setFilterProjectName(e.target.value)}
            />
          </Center>
          <Center>
            <FontAwesomeIcon icon={faDollarSign} style={iconMarginRight} />
            <Select
              value={filterBillable}
              onChange={(e) => setFilterBillable(e.target.value)}
            >
              <option value="both">Both</option>
              <option value={true}>Billable</option>
              <option value={false}>Non-billable</option>
            </Select>
          </Center>
        </Flex>
        <Center>
          <Select
            style={activeSelectStyle}
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
          >
            <option value={true}>Active</option>
            <option value={false}>Non-Active</option>
            <option value="both">Both</option>
          </Select>
        </Center>
      </Flex>
      {/* Project Card Display */}
      <Flex direction="column" mt="30px">
        {/* Heading Row */}
        <Flex
          align="center"
          color="gray.600"
          fontWeight="bold"
          boxShadow="0 1px 1px 0 rgba(0, 0,0, .08)"
          p="5px 30px"
        >
          <Text fontSize="xs" casing="uppercase" flex="2">
            Project
          </Text>
          <Text fontSize="xs" casing="uppercase" flex="1.5" textAlign="center">
            Client
          </Text>
          <Text fontSize="xs" casing="uppercase" flex="1.5" textAlign="center">
            Hours Logged
          </Text>
          <Text fontSize="xs" casing="uppercase" flex="2" textAlign="center">
            Due Date
          </Text>
        </Flex>
        {/* Cards */}
        {filteredProjects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </Flex>
    </section>
  );
};

export default Projects;
