import React from "react";
import {
  Flex,
  Text,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faCheck } from "@fortawesome/free-solid-svg-icons";
import ConfirmDestroyModal from "../modals/ConfirmDestroyModal";
import PopoverContentButton from "../styled/PopoverContentButton";
import applicationColors from "../../style/colors";
import { destroyTask, updateTask } from "../../data/api";
import BaseEditModal from "../modals/BaseEditModal";
import PropTypes from "prop-types";

const completedStyle = {
  textDecoration: "line-through",
  color: "lightgray",
};

const popoverButtonStyle = {
  background: applicationColors.LIGHT_BLUE,
  padding: "2px 4px",
  borderadius: "7px",
  opacity: "0.7",
  margin: "1px 0",
  fontSize: "14px",
  "&:hover": {
    background: applicationColors.SOFT_LIGHT_BLUE,
  },
};

const TaskCard = ({ task, updateTasksForProject }) => {
  const [completed, setCompleted] = React.useState(task.completed);

  // ----- POPOVER STATE -----
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  // ----- UPDATE COMPLETED STATUS -----
  const toggleChecked = () => {
    updateTask({ ...task, completed: !completed }).then((data) => {
      if (data.tasks) updateTasksForProject(data.tasks);
    });
    setCompleted(!completed);
  };

  // ----- DESTROY TASK -----
  const destroy = () => {
    destroyTask(task.project_id, task.id)
      .then((data) => {
        if (data.tasks) updateTasksForProject(data.tasks);
        if (data.error) console.warn(data.error);
      })
      .catch((e) => console.warn(e));
  };

  return (
    <Flex
      data-cy="task-card"
      align="center"
      color="gray.600"
      fontWeight="bold"
      borderBottom="1px solid rgba(0, 0,0, .2)"
      p="10px 20px"
    >
      <Text
        data-cy="task-title"
        fontSize="sm"
        flex="2"
        style={
          completed
            ? { ...completedStyle, overflow: "hidden", textOverflow: "wrap" }
            : { overflow: "hidden", textOverflow: "wrap" }
        }
      >
        {task.title}
      </Text>
      <Text
        data-cy="task-date"
        fontSize="sm"
        flex="1.25"
        textAlign="center"
        style={completed ? completedStyle : null}
      >
        {task.due_date ? task.due_date : "Not specified"}
      </Text>
      <Text
        data-cy="task-hours"
        fontSize="sm"
        flex="1.25"
        textAlign="center"
        style={completed ? completedStyle : null}
      >
        {task.estimated_hours}
      </Text>
      <div onClick={toggleChecked} style={{ flex: ".3" }}>
        <FontAwesomeIcon
          data-cy="task-completed"
          icon={faCheck}
          color={applicationColors.GREEN}
          size="1x"
          style={{ cursor: "pointer" }}
        />
      </div>
      {/* POPOVER */}
      <Popover isLazy placement="left" isOpen={isOpen}>
        <PopoverTrigger>
          <div onClick={toggleOpen}>
            <FontAwesomeIcon
              data-cy="open-popover"
              icon={faEllipsisV}
              color="gray"
              size="1x"
              style={{ cursor: "pointer" }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent w="100px">
          <PopoverArrow />
          <PopoverBody p="3px">
            <Flex direction="column">
              <BaseEditModal
                buttonStyle={popoverButtonStyle}
                type={"Task"}
                action={updateTasksForProject}
                entity={task}
                closePopover={close}
              />
              <ConfirmDestroyModal
                trigger={
                  <PopoverContentButton
                    color={applicationColors.ERROR_COLOR}
                    hoverColor={applicationColors.ERROR_COLOR}
                    style={{ width: "100%" }}
                    data-cy="trigger-destroy"
                  >
                    Delete
                  </PopoverContentButton>
                }
                action={() => destroy()}
                message={
                  "Clicking confirm will permanently delete this client, and all projects associated with this client."
                }
                closePopover={close}
              />
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object,
  updateTasksForProject: PropTypes.func,
};

export default TaskCard;
