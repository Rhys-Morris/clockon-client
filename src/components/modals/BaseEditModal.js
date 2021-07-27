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
import ProjectForm from "../forms/ProjectForm";
import TaskForm from "../forms/TaskForm";
import ExpenseForm from "../forms/ExpenseForm";

const BaseEditModal = ({ type, action, entity, buttonStyle, closePopover }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formSwitch = (type) => {
    switch (type) {
      case "Project":
        return <ProjectForm type={"Edit"} action={action} project={entity} />;
      case "Task":
        return (
          <TaskForm
            type={"Edit"}
            action={action}
            onClose={onClose}
            task={entity}
            closePopover={closePopover}
          />
        );
      case "Expense":
        return (
          <ExpenseForm
            type={"Edit"}
            action={action}
            onClose={onClose}
            expense={entity}
            closePopover={closePopover}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NewButton style={buttonStyle} onClick={onOpen}>
        Edit
      </NewButton>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          closePopover();
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{formSwitch(type)}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseEditModal;
