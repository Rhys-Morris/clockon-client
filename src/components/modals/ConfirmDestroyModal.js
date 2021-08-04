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
import PropTypes from "prop-types";

const ConfirmDestroyModal = ({ trigger, action, message, closePopover }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen} id="destroy">
        {trigger}
      </Box>
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

ConfirmDestroyModal.propTypes = {
  trigger: PropTypes.func,
  action: PropTypes.func,
  message: PropTypes.string,
  closePopover: PropTypes.func,
};

export default ConfirmDestroyModal;
