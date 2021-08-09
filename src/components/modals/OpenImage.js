import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import applicationColors from "../../style/colors";
import ConfirmDestroyModal from "./ConfirmDestroyModal";
import { purgeReceipt } from "../../data/api";

const OpenImage = ({ image, expense, updateExpensesForProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const destroyReceipt = () => {
    purgeReceipt(expense).then((data) => {
      if (data.expenses) {
        updateExpensesForProject(data.expenses);
        onClose();
      }
    });
  };

  return (
    <>
      <Button
        fontSize="sm"
        p="3px"
        textDecoration="underline"
        marginRight="20px"
        bg="none"
        _hover={{ color: applicationColors.LIGHT_BLUE }}
        onClick={onOpen}
        width="100px"
      >
        View receipt
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Receipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img
              src={image}
              alt="receipt-img"
              style={{ height: "auto", marginBottom: "30px" }}
            />
            <Center>
              <ConfirmDestroyModal
                message="Are you sure you wish to destroy this receipt?"
                trigger={
                  <Button
                    width="100%"
                    color="white"
                    bg={applicationColors.ERROR_COLOR}
                    _hover={{ bg: applicationColors.SOFT_ERROR_COLOR }}
                  >
                    Destroy Receipt
                  </Button>
                }
                action={destroyReceipt}
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

OpenImage.propTypes = {
  expense: PropTypes.object,
  image: PropTypes.string,
  updateExpensesForProject: PropTypes.func,
};

export default OpenImage;
