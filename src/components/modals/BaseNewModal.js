import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import NewButton from "../styled/NewButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ClientForm from "../forms/ClientForm";
import ProjectForm from "../forms/ProjectForm";
import TaskForm from "../forms/TaskForm";
import ExpenseForm from "../forms/ExpenseForm";

const BaseModal = ({ type, action, buttonProps, buttonStyle, projectId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const headerSwitch = (type) => {
    switch (type) {
      case "Project":
        return "Start a New Project";
      case "Client":
        return "Track a New Client";
      case "Task":
        return "Create a New Task";
      case "Expense":
        return "Record an Expense";
      default:
        return null;
    }
  };

  const formSwitch = (type, action) => {
    switch (type) {
      case "Project":
        return (
          <ProjectForm action={action} onClose={onClose} type={"Create"} />
        );
      case "Client":
        return <ClientForm action={action} onClose={onClose} type={"Create"} />;
      case "Task":
        return (
          <TaskForm
            action={action}
            onClose={onClose}
            type={"Create"}
            projectId={projectId}
          />
        );
      case "Expense":
        return (
          <ExpenseForm
            action={action}
            onClose={onClose}
            type={"Create"}
            projectId={projectId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NewButton onClick={onOpen} {...buttonProps} style={buttonStyle}>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
        New {type}
      </NewButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerSwitch(type)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{formSwitch(type, action)}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
