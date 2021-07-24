import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import NewButton from "../styled/NewButton";

const ConfirmDestroyModal = ({ trigger, action, message }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box children={trigger} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="30px">
              {message
                ? message
                : "Clicking confirm will remove this entry permanently."}
            </Text>
            <NewButton
              primary="rgba(255, 0, 0, .6)"
              hoverColor="rgba(255, 0, 0, .4)"
              style={{ marginRight: "10px" }}
              onClick={action}
            >
              Confirm
            </NewButton>
            <NewButton onClick={onClose}>Return</NewButton>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmDestroyModal;
