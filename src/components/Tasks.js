import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faCheck,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import TaskCard from "./cards/TaskCard";
import BaseNewModal from "./modals/BaseNewModal";
import { sortByDate, sortByNumeric } from "../helpers/helper";
import applicationColors from "../style/colors";

const Tasks = ({ projectId, tasks, action }) => {
  const [dueDateSorted, setDueDateSorted] = React.useState(null);
  const [hoursSorted, setHoursSorted] = React.useState(null);
  const [showCompleted, setShowCompleted] = React.useState(false);
  const [filteredTasks, setFilteredTasks] = React.useState([]);

  // Prevent filtered tasks from improperly updating
  React.useEffect(() => {
    setFilteredTasks(
      showCompleted ? tasks : tasks?.filter((task) => task.completed === false)
    );
  }, [tasks]);

  return (
    <Flex
      flex="1"
      direction="column"
      style={{ borderLeft: "1px solid rgba(0,0,0,.12)" }}
    >
      {/* Heading */}
      <Flex justify="space-between" align="center" p="10px 20px">
        <Heading as="h3" fontWeight="300" fontSize="xl" color="gray.500">
          Project Tasks
        </Heading>
        <Flex align="center">
          <Text
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
            onClick={() => {
              const sortedTasks =
                dueDateSorted === "first"
                  ? sortByDate(filteredTasks, "last", "due_date")
                  : sortByDate(filteredTasks, "first", "due_date");
              setFilteredTasks(sortedTasks);
              setDueDateSorted(dueDateSorted !== "first" ? "first" : "last");
              setHoursSorted(null);
            }}
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
            fontSize="sm"
            casing="uppercase"
            textAlign="center"
            cursor="pointer"
            // Sort by hours
            onClick={() => {
              const sortedTasks =
                hoursSorted === "first"
                  ? sortByNumeric(filteredTasks, "last", "estimated_hours")
                  : sortByNumeric(filteredTasks, "first", "estimated_hours");
              setFilteredTasks(sortedTasks);
              setHoursSorted(hoursSorted === "first" ? "last" : "first");
              setDueDateSorted(null);
            }}
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
        filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} updateTasksForProject={action} />
        ))}
    </Flex>
  );
};

export default Tasks;
