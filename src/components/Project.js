import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Spinner,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getProject } from "../data/api";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BaseEditModal from "./modals/BaseEditModal";
import { updateProject } from "../data/api";

const projectReducer = (state, action) => {
  switch (action.type) {
    case "request":
      return { ...state, loading: true, error: null };
    case "success":
      return { ...state, loading: false, project: action.data };
    case "failure":
      return { ...state, loading: false, error: action.data };
    default:
      return { ...state };
  }
};

const Project = () => {
  const initialState = {
    error: null,
    loading: false,
    project: null,
  };
  const { id } = useParams();
  const [projectStore, dispatch] = React.useReducer(
    projectReducer,
    initialState
  );
  const { loading, project, error } = projectStore;

  const update = (project) => {
    updateProject(project)
      .then((data) => {
        if (data.project) dispatch({ type: "success", data: data.project });
        if (data.error) dispatch({ type: "failure", data: data.error });
        console.log(data);
      })
      .catch((e) => {
        console.warn(e);
        dispatch({ type: "failure", data: e });
      });
  };

  // ----- FETCH PROJECT -----
  React.useEffect(() => {
    dispatch({ type: "request" });
    getProject(id)
      .then((data) => {
        if (data.project) dispatch({ type: "success", data: data.project });
        if (data.error) dispatch({ type: "failure", data: data.error });
      })
      .catch((e) => {
        console.warn(e);
        dispatch({
          type: "failure",
          data: "An unexpected error occurred fetching the project",
        });
      });
  }, []);

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
            <Flex align="center">
              <ChakraLink
                as={Link}
                to="/projects"
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Heading as="h1" color="gray.800" fontSize="xl" mr="10px">
                  Projects
                </Heading>
              </ChakraLink>
              <FontAwesomeIcon icon={faChevronRight} color="#222" />
              <Box
                bg={project?.color}
                mr="3px"
                ml="10px"
                style={{ width: "10px", height: "10px", borderRadius: "50%" }}
              ></Box>
              <Heading as="h2" fontWeight="300" fontSize="xl" color="gray.500">
                {project?.name}
              </Heading>
              <Text fontSize="xl" color="gray.500" ml="10px" mr="10px">
                |
              </Text>
              <Text fontWeight="300" fontSize="lg">
                {project?.client}
              </Text>
            </Flex>
            <BaseEditModal type={"Project"} action={update} entity={project} />
          </Flex>
        </section>
      </Box>
      {loading && <Spinner />}
    </Flex>
  );
};

export default Project;
