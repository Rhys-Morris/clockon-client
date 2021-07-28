import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { createTask, updateTask } from "../../data/api";
import { inputFormattedToday } from "../../helpers/date";
import applicationColors from "../../style/colors";

const TaskForm = ({ action, onClose, type, task, projectId, closePopover }) => {
  const [title, setTitle] = React.useState(task?.title || "");
  const [dueDate, setDueDate] = React.useState(
    task?.due_date || inputFormattedToday()
  );
  const [estimatedHours, setEstimatedHours] = React.useState(
    task?.estimated_hours || 0
  );
  const [error, setError] = React.useState(null);

  const create = (task) => {
    createTask(task)
      .then((data) => {
        if (data.tasks) {
          action(data.tasks);
          onClose();
        }
        if (data.error) {
          setError(data.error[0]);
          setTimeout(() => setError(null), 5000);
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const update = (task) => {
    updateTask(task)
      .then((data) => {
        if (data.tasks) {
          action(data.tasks);
          onClose();
          closePopover();
        }
        if (data.error) {
          setError(data.error[0]);
          setTimeout(() => setError(null), 5000);
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const submitForm = (e) => {
    const taskDetails = {
      title,
      due_date: dueDate,
      estimated_hours: Number.parseFloat(estimatedHours).toFixed(2),
    };
    e.preventDefault();
    if (type === "Create") {
      create({ ...taskDetails, project_id: projectId });
    } else if (type === "Edit") {
      update({ ...taskDetails, project_id: task.project_id, id: task.id });
    }
  };

  return (
    <form onSubmit={submitForm}>
      <FormControl isRequired>
        <FormLabel fontSize="sm" casing="uppercase">
          Task Title
        </FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My new task"
        ></Input>
      </FormControl>
      <FormControl m="15px 0 " isRequired>
        <FormLabel fontSize="sm" m="0">
          Due Date:
        </FormLabel>
        <Input
          type="date"
          mt="5px"
          min={inputFormattedToday()}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </FormControl>
      <FormControl mt="10px" isRequired>
        <FormLabel fontSize="sm" casing="uppercase">
          Estimated time to complete task (hours):
        </FormLabel>
        <Input
          placeholder="8.5"
          value={estimatedHours}
          onChange={(e) => setEstimatedHours(e.target.value)}
          style={{ width: "50%" }}
          type="number"
        ></Input>
      </FormControl>
      {error && (
        <Text fontSize="sm" color={applicationColors.ERROR_COLOR} m="10px 0">
          {error}
        </Text>
      )}
      <Center mt="15px">
        <Button type="submit">{type} Task</Button>
      </Center>
    </form>
  );
};

export default TaskForm;
