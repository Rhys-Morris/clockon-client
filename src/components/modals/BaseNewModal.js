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
              <ProjectForm type="Create" action={action} onClose={onClose} />
            ) : (
              <ClientForm type="Create" action={action} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
