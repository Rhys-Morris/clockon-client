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
import applicationColors from "../../style/colors";

const ConfirmDestroyModal = ({ trigger, action, message, closePopover }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box children={trigger} onClick={onOpen} id="destroy" />
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
              primary={applicationColors.ERROR_COLOR}
              hoverColor={applicationColors.SOFT_ERROR_COLOR}
              style={{ marginRight: "10px" }}
              onClick={() => {
                action();
                onClose();
              }}
            >
              Confirm
            </NewButton>
            <NewButton
              onClick={() => {
                onClose();
                if (closePopover) closePopover();
              }}
            >
              Return
            </NewButton>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmDestroyModal;
