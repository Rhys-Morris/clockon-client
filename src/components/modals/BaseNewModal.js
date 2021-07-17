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
import NewClientForm from "../forms/NewClientForm";
import NewProjectForm from "../forms/NewProjectForm";

const BaseModal = ({ type, action }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NewButton onClick={onOpen}>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
        New {type}
      </NewButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {type === "Project" ? "Start a New Project" : "New Client"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {type === "Project" ? (
              <NewProjectForm action={action} onClose={onClose} />
            ) : (
              <NewClientForm action={action} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
