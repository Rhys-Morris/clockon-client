import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faCheck,
  faSortDown,
  faSortUp,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./cards/TaskCard";
import BaseNewModal from "./modals/BaseNewModal";
import { sortByDate, sortByNumeric } from "../helpers/helper";
import applicationColors from "../style/colors";
import NewButton from "./styled/NewButton";
import PropTypes from "prop-types";

const Tasks = ({ projectId, tasks, action }) => {
  const [dueDateSorted, setDueDateSorted] = React.useState(null);
  const [hoursSorted, setHoursSorted] = React.useState(null);
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [filteredTasks, setFilteredTasks] = React.useState(tasks);
  const [paginatedTasks, setPaginatedTasks] = React.useState(tasks);
  const [page, setPage] = React.useState(1);

  // Prevent filtered tasks from improperly updating
  React.useEffect(() => {
    // Filter by completed state
    const filteredByCompleted = showCompleted
      ? tasks
      : tasks?.filter((task) => task.completed === false);
    // Sort by due date state
    if (dueDateSorted) {
      dueDateSorted === "first"
        ? sortByDate(filteredByCompleted, "last", "due_date")
        : sortByDate(filteredByCompleted, "first", "due_date");
    }
    // Sort by hours start
    if (hoursSorted) {
      hoursSorted === "first"
        ? sortByNumeric(filteredByCompleted, "last", "estimated_hours")
        : sortByNumeric(filteredByCompleted, "first", "estimated_hours");
    }
    // Set filtered Tasks
    setFilteredTasks(filteredByCompleted || []);
    // Paginate based on current page
    setPaginatedTasks(filteredByCompleted?.slice(page * 6 - 6, page * 6 || []));
  }, [tasks, showCompleted, dueDateSorted, hoursSorted]);

  // ----- Pagination controls
  const nextPage = () => {
    const endSlice = (page + 1) * 6;
    const startSlice = (page + 1) * 6 - 6;
    setPaginatedTasks(filteredTasks.slice(startSlice, endSlice));
    setPage(page + 1);
  };

  const previousPage = () => {
    const endSlice = (page - 1) * 6;
    const startSlice = (page - 1) * 6 - 6;
    setPaginatedTasks(filteredTasks.slice(startSlice, endSlice));
    setPage(page - 1);
  };

  // ----- Toggle sorted by due date -----
  const sortDueDate = () => {
    setDueDateSorted(dueDateSorted !== "first" ? "first" : "last");
    setHoursSorted(null);
  };

  // ----- Toggle sorted by hours -----
  const sortHours = () => {
    setHoursSorted(hoursSorted === "first" ? "last" : "first");
    setDueDateSorted(null);
  };

  return (
    <Flex
      flex="1"
      direction="column"
      style={{ borderLeft: "1px solid rgba(0,0,0,.12)" }}
      position="relative"
    >
      {/* Heading */}
      <Flex justify="space-between" align="center" p="10px 20px">
        <Heading as="h3" fontWeight="300" fontSize="xl" color="gray.500">
          Task Tracker
        </Heading>
        <Flex align="center">
          <Text
            data-cy="toggle-completed"
            color="gray.700"
            mr="20px"
            _hover={{ color: "gray.500", cursor: "pointer" }}
            onClick={() => {
              // Toggle to show all
              if (showCompleted === false) setFilteredTasks(tasks);
              // Toggle to show non-completed only
              if (showCompleted === true) {
                setFilteredTasks(
                  tasks.filter((task) => task.completed === false)
                );
              }
              setShowCompleted(!showCompleted);
            }}
          >
            Toggle show{" "}
            <FontAwesomeIcon icon={faCheck} color={applicationColors.GREEN} />
          </Text>
          <BaseNewModal
            type="Task"
            action={action}
            buttonProps={{ primary: "#556885", hoverColor: "#728bb1" }}
            buttonStyle={{ padding: "6px 10px", fontSize: "14px" }}
            projectId={projectId}
          />
        </Flex>
      </Flex>
      <Flex
        align="center"
        color="gray.600"
        fontWeight="bold"
        boxShadow="0 1px 1px 0 rgba(0, 0,0, .12)"
        mt="5px"
        p="5px 20px"
      >
        <Text fontSize="14px" casing="uppercase" flex="2">
          Task
        </Text>
        <Flex flex="1.25" justify="center">
          <Text
            fontSize="sm"
            casing="uppercase"
            textAlign="center"
            cursor="pointer"
            // Sort by due date
            onClick={sortDueDate}
            data-cy="sort-date"
          >
            Due date
          </Text>
          {/* Sorted icons */}
          {dueDateSorted && dueDateSorted === "first" && (
            <FontAwesomeIcon
              icon={faSortDown}
              style={{
                marginLeft: "3px",
                position: "relative",
                top: "-4px",
              }}
            />
          )}
          {dueDateSorted && dueDateSorted === "last" && (
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
        <Flex justify="center" flex="1.25">
          <Text
            data-cy="sort-hours"
            fontSize="sm"
            casing="uppercase"
            textAlign="center"
            cursor="pointer"
            // Sort by hours
            onClick={sortHours}
          >
            Hour Estimate
          </Text>
          {/* Sorted icons */}
          {hoursSorted && hoursSorted === "first" && (
            <FontAwesomeIcon
              icon={faSortDown}
              style={{
                marginLeft: "3px",
                position: "relative",
                top: "-4px",
              }}
            />
          )}
          {hoursSorted && hoursSorted === "last" && (
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
        <div style={{ flex: ".3" }}>
          <FontAwesomeIcon icon={faCheck} color="transparent" size="1x" />
        </div>
        <FontAwesomeIcon icon={faEllipsisV} color="transparent" />
      </Flex>
      {tasks?.length === 0 && (
        <Text p="20px">No current tasks for this project</Text>
      )}
      {tasks?.length > 0 && filteredTasks?.length === 0 && (
        <Text p="20px">No tasks to display</Text>
      )}
      {tasks?.length > 0 &&
        filteredTasks?.length > 0 &&
        paginatedTasks.map((task) => (
          <TaskCard key={task.id} task={task} updateTasksForProject={action} />
        ))}
      {/* Pagination */}
      <Flex
        position="absolute"
        right="10"
        bottom="10"
        justify="space-between"
        align="center"
        width="60px"
      >
        {/* Previous */}
        {page !== 1 && (
          <NewButton
            onClick={previousPage}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              position: "relative",
            }}
            data-cy="tasks-previous"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" color="white" />
          </NewButton>
        )}
        {/* Next */}
        {(filteredTasks?.length > page * 6 ||
          (page === 1 && tasks?.length > 6)) && (
          <NewButton
            onClick={nextPage}
            style={{ padding: "5px 10px", position: "relative" }}
            data-cy="tasks-next"
          >
            <FontAwesomeIcon icon={faChevronRight} size="sm" color="white" />
          </NewButton>
        )}
      </Flex>
    </Flex>
  );
};

Tasks.propTypes = {
  projectId: PropTypes.number,
  tasks: PropTypes.array,
  action: PropTypes.func,
};

export default Tasks;
