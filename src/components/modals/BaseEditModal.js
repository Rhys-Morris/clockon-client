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

const BaseEditModal = ({ type, action, entity }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NewButton onClick={onOpen}>Edit {type}</NewButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {type === "Project" ? (
              <ProjectForm
                type={"Edit"}
                action={action}
                onClose={onClose}
                project={entity}
              />
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseEditModal;
