import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import Login from "../Login";

const BaseModal = ({ type, action }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Link
        fontSize="lg"
        transition=".2s all"
        borderBottom="2px solid transparent"
        borderRadius="none"
        _hover={{ borderBottom: "2px solid #eee" }}
        onClick={onOpen}
      >
        Log in
      </Link>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Login />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
