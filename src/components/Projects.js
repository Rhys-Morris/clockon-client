import React from "react";
import {
  Heading,
  Flex,
  Text,
  Input,
  Select,
  Center,
  Box,
} from "@chakra-ui/react";
import BaseNewModal from "./modals/BaseNewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faDollarSign,
  faUser,
  faTimes,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "./cards/ProjectCard";
import Sidebar from "./Sidebar";
import {
  iconMarginRight,
  inputStyle,
  activeSelectStyle,
} from "../style/projects";
import { getProjects, addProject } from "../data/api";
import { projectsReducer } from "../data/reducers";
import { useHistory } from "react-router";

const Projects = () => {
  // ----- STATE -----
  const initialState = {
    loading: false,
    error: null,
    projects: [],
    filteredProjects: [],
    filterClient: "",
    filterProjectName: "",
    filterBillable: "both",
    filterActive: "true",
    dueDateSortedFirst: "unsorted",
  };
  const [projectsState, dispatch] = React.useReducer(
    projectsReducer,
    initialState
  );
  const {
    projects,
    filteredProjects,
    filterClient,
    filterProjectName,
    filterBillable,
    filterActive,
    dueDateSortedFirst,
  } = projectsState;
  let history = useHistory();

  // ---- SET PROJECTS ON RENDER -----
  React.useEffect(() => {
    getProjects()
      .then((data) => {
        dispatch({ type: "setProjects", data: data.projects });
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          history.push("/401");
        }
      });
  }, []);

  // ----- FILTER PROJECTS ----
  React.useEffect(() => {
    let filtered = [...projects];
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
        // BUG HERE
        if (filterActive === "true" && p.active) return true;
        if (filterActive === "false" && !p.active) {
          return true;
        }
        return false;
      });
    }
    dispatch({ type: "setFilteredProjects", data: filtered });
  }, [
    projects,
    filterProjectName,
    filterClient,
    filterBillable,
    filterActive,
    dueDateSortedFirst,
  ]);

  // ----- ADD PROJECT -----
  const addNewProject = (project) => {
    addProject(project).then((data) => {
      dispatch({ type: "setProjects", data: data.projects });
    });
  };

  return (
    <Flex h="100%">
      <Box
        w="200px"
        bgGradient="linear(to-b, #30415D, #031424)"
        h="100%"
        p="15px"
      >
        <Sidebar />
      </Box>
      <Box flex="1" color="gray.400">
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
            <BaseNewModal type="Project" action={addNewProject} />
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
                <FontAwesomeIcon
                  icon={faClipboardList}
                  style={iconMarginRight}
                />
                <Input
                  data-cy="filter-name"
                  placeholder="Project name"
                  style={inputStyle}
                  value={filterProjectName}
                  onChange={(e) =>
                    dispatch({
                      type: "setFilterProjectName",
                      data: e.target.value,
                    })
                  }
                />
              </Center>
              <Center mr="10px">
                <FontAwesomeIcon icon={faUser} style={iconMarginRight} />
                <Input
                  data-cy="filter-client"
                  placeholder="Client name"
                  style={inputStyle}
                  value={filterClient}
                  onChange={(e) =>
                    dispatch({ type: "setFilterClient", data: e.target.value })
                  }
                />
              </Center>
              <Center>
                <FontAwesomeIcon icon={faDollarSign} style={iconMarginRight} />
                <Select
                  data-cy="filter-billable"
                  value={filterBillable}
                  onChange={(e) =>
                    dispatch({
                      type: "setFilterBillable",
                      data: e.target.value,
                    })
                  }
                >
                  <option value="both">Both</option>
                  <option value="true">Billable</option>
                  <option value="false">Non-billable</option>
                </Select>
              </Center>
            </Flex>
            <Center>
              <Select
                data-cy="filter-active"
                style={activeSelectStyle}
                value={filterActive}
                onChange={(e) =>
                  dispatch({
                    type: "setFilterActive",
                    data: e.target.value,
                  })
                }
              >
                <option value="true"> Active</option>
                <option value="false">Non-Active</option>
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
              <Text
                fontSize="xs"
                casing="uppercase"
                flex="1.5"
                textAlign="center"
              >
                Client
              </Text>
              <Text
                fontSize="xs"
                casing="uppercase"
                flex="1.5"
                textAlign="center"
              >
                Hours Logged
              </Text>
              <Flex justify="center" align="start" flex="2">
                <Text
                  fontSize="xs"
                  casing="uppercase"
                  textAlign="center"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dueDateSortedFirst
                      ? dispatch({ type: "sortDueDateLast" })
                      : dispatch({ type: "sortDueDateFirst" });
                  }}
                >
                  Due Date
                </Text>
                {dueDateSortedFirst && dueDateSortedFirst !== "unsorted" && (
                  <FontAwesomeIcon
                    icon={faSortDown}
                    style={{
                      marginLeft: "3px",
                      position: "relative",
                      top: "-4px",
                    }}
                  />
                )}
                {!dueDateSortedFirst && (
                  <FontAwesomeIcon
                    icon={faSortUp}
                    style={{
                      marginLeft: "3px",
                      position: "relative",
                      top: "3px",
                    }}
                  />
                )}
              </Flex>
              {/* Keep spacing the same */}
              <FontAwesomeIcon icon={faTimes} color="transparent" />
            </Flex>
            {/* Cards */}
            {projects.length === 0 && (
              <Text p="15px 30px">No projects currently active</Text>
            )}
            {projects.length >= 1 && filteredProjects.length === 0 && (
              <Text p="15px 30px">No projects match your search</Text>
            )}
            {filteredProjects.length >= 1 &&
              filteredProjects.map((p) => {
                return (
                  <ProjectCard key={p.id} project={p} dispatch={dispatch} />
                );
              })}
          </Flex>
        </section>
      </Box>
    </Flex>
  );
};

export default Projects;
