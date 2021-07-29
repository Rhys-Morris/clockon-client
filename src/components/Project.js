import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Spinner,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { getProject } from "../data/api";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import BaseEditModal from "./modals/BaseEditModal";
import { updateProject } from "../data/api";
import Tasks from "./Tasks";
import Expenses from "./Expenses";
import WorkPeriods from "./WorkPeriods";
import { projectReducer } from "../data/reducers";
import {
  convertWorkToHours,
  formattedWorkPeriodDuration,
  sum,
} from "../helpers/helper";
import WageContext from "../contexts/hourlyRate";
import applicationColors from "../style/colors";

const Project = () => {
  const initialState = {
    error: null,
    loading: false,
    project: null,
    tasks: null,
    expenses: null,
    workPeriods: null,
  };
  const { id } = useParams();
  const [projectStore, dispatch] = React.useReducer(
    projectReducer,
    initialState
  );
  let history = useHistory();
  const { loading, project, tasks, expenses, workPeriods, error } =
    projectStore;
  const { hourlyRate } = React.useContext(WageContext);

  // ----- UPDATE THE PROJECT -----
  const update = (project) => {
    updateProject(project)
      .then((data) => {
        if (data.project)
          dispatch({
            type: "success",
            project: data.project,
          });
        if (data.error) dispatch({ type: "failure", data: data.error });
      })
      .catch((e) => {
        console.warn(e);
        dispatch({ type: "failure", data: e });
      });
  };

  // ---- DISPATCH TASK STATE UPDATES -----
  const updateTasks = (tasks) => {
    dispatch({ type: "updateTasks", data: tasks });
  };

  // ---- DISPATCH EXPENSE STATE UPDATES -----
  const updateExpenses = (expenses) => {
    dispatch({ type: "updateExpenses", data: expenses });
  };

  // ---- DISPATCH WORK PERIOD STATE UPDATES -----
  const updateWorkPeriods = (workPeriods) => {
    dispatch({ type: "updateWorkPeriods", data: workPeriods });
  };

  // ----- FETCH PROJECT -----
  React.useEffect(() => {
    dispatch({ type: "request" });
    getProject(id)
      .then((data) => {
        if (data.project)
          dispatch({
            type: "success",
            project: data.project,
            tasks: data.tasks,
            expenses: data.expenses,
            workPeriods: data.project.work_periods,
          });
        if (data.error) dispatch({ type: "failure", data: data.error });
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          history.push("/401");
        }
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
          <Flex mt="20px" minHeight="80vh">
            <Flex direction="column" flex="1">
              {/* Overview */}
              <Box flex="1">
                <Flex height="100%" direction="column" p="10px">
                  <Heading color="gray.700">Overview</Heading>
                  <Flex height="80%" direction="column" justify="space-around">
                    <Flex direction="column">
                      <Heading
                        as="h3"
                        size="lg"
                        color={applicationColors.LIGHT_BLUE}
                      >
                        Total Time
                      </Heading>
                      <Text fontSize="4xl" color="gray.600">
                        {formattedWorkPeriodDuration(workPeriods)}
                      </Text>
                    </Flex>
                    <Flex direction="column">
                      <Heading
                        as="h3"
                        size="lg"
                        color={applicationColors.LIGHT_BLUE}
                      >
                        Total Earnings
                      </Heading>
                      <Text fontSize="4xl" color="gray.600">
                        {!workPeriods ||
                        sum(convertWorkToHours(workPeriods)) === 0
                          ? "No current earnings"
                          : `$${(
                              sum(convertWorkToHours(workPeriods)) * hourlyRate
                            ).toFixed(2)}`}
                      </Text>
                    </Flex>
                    <Flex direction="column">
                      <Heading
                        as="h3"
                        size="lg"
                        color={applicationColors.LIGHT_BLUE}
                      >
                        Total Expenses
                      </Heading>
                      <Text fontSize="4xl" color="gray.600">
                        {!expenses || sum(expenses.map((exp) => exp.cost)) === 0
                          ? "No expenses"
                          : `$${sum(expenses.map((exp) => exp.cost)).toFixed(
                              2
                            )}`}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
              {/* Work Periods */}
              <Box flex="1">
                {workPeriods && (
                  <WorkPeriods
                    workPeriods={workPeriods}
                    updateWorkPeriods={updateWorkPeriods}
                  />
                )}
              </Box>
            </Flex>
            {/* Tasks */}
            <Flex flex="1" direction="column">
              <Tasks
                flex="1"
                tasks={tasks}
                action={updateTasks}
                projectId={project?.id}
              />
              {/* Expenses */}
              <Flex flex="1" direction="column">
                <Expenses
                  expenses={expenses}
                  action={updateExpenses}
                  projectId={project?.id}
                />
              </Flex>
            </Flex>
          </Flex>
        </section>
      </Box>
      {loading && <Spinner />}
    </Flex>
  );
};

export default Project;
