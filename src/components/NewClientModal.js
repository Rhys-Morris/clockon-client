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
import NewButton from "./styled/NewButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewClientForm from "./forms/NewClientForm";

const NewClientModal = ({ addClient }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NewButton onClick={onOpen}>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
        New Client
      </NewButton>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewClientForm addClient={addClient} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewClientModal;
