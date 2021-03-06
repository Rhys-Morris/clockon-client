import React from "react";
import {
  Heading,
  Flex,
  Text,
  Input,
  Select,
  Center,
  Box,
  Spinner,
} from "@chakra-ui/react";
import BaseNewModal from "./modals/BaseNewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faDollarSign,
  faEuroSign,
  faPoundSign,
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
} from "../style/styleObjects";
import { getProjects, addProject } from "../data/api";
import { projectsReducer } from "../data/reducers";
import { useHistory } from "react-router";
import applicationColors from "../style/colors";
import CurrencyContext from "../contexts/currencyContext";

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
    loading,
    error,
  } = projectsState;
  let history = useHistory();
  const { currency } = React.useContext(CurrencyContext);

  // Set title
  React.useEffect(() => {
    window.document.title = "ClockOn | Projects";
  }, []);

  // ---- SET PROJECTS ON RENDER -----
  React.useEffect(() => {
    dispatch({ type: "request" });
    getProjects()
      .then((data) => {
        dispatch({ type: "setProjects", data: data.projects });
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          history.push("/401");
        }
        dispatch({ type: "setError", data: e.message });
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
        position="fixed"
      >
        <Sidebar />
      </Box>
      <Box flex="1" color="gray.400" ml="200px">
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
                <FontAwesomeIcon
                  icon={
                    currency === "GBP??"
                      ? faPoundSign
                      : currency === "EUR???"
                      ? faEuroSign
                      : faDollarSign
                  }
                  style={iconMarginRight}
                />
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
            {loading && (
              <Spinner
                h="50px"
                w="50px"
                ml="50px"
                mt="25px"
                color={applicationColors.DARK_LIGHT_BLUE}
              />
            )}
            {error && (
              <Text
                ml="50px"
                mt="25px"
                fontSize="4xl"
                color={applicationColors.ERROR_COLOR}
              >
                {error}
              </Text>
            )}
            {!loading && !error && projects.length === 0 && (
              <Text p="15px 30px">No projects currently active</Text>
            )}
            {!loading &&
              !error &&
              projects.length >= 1 &&
              filteredProjects.length === 0 && (
                <Text p="15px 30px">No projects match your search</Text>
              )}
            {!loading &&
              !error &&
              filteredProjects.length >= 1 &&
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
