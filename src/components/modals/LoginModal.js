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
  useMediaQuery,
} from "@chakra-ui/react";
import Login from "../Login";

const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [breakpoint500] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Link
        fontSize={breakpoint500 ? "2xl" : "lg"}
        m={breakpoint500 ? "10px 0" : "0"}
        transition=".2s all"
        borderBottom="2px solid transparent"
        borderRadius="none"
        _hover={{
          borderBottom: breakpoint500 ? null : "2px solid #eee",
        }}
        onClick={onOpen}
        data-cy="login"
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

export default LoginModal;
