import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Button,
} from "@chakra-ui/react";
import applicationColors from "../../style/colors";
import { updateExpense } from "../../data/api";
import PropTypes from "prop-types";

const ReceiptUpload = ({ expense, updateExpensesForProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const [error, setError] = React.useState(null);

  const uploadReceipt = () => {
    const receipt = document.getElementById("file").files[0];
    updateExpense(expense, receipt)
      .then((data) => {
        if (data.expenses) updateExpensesForProject(data.expenses);
        onClose();
      })
      .catch((e) => console.warn(e));
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
      >
        Upload receipt
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Receipt Upload</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="file">
                Upload a receipt for this expense:
              </FormLabel>
              <input id="file" type="file" accept="image/*"></input>
            </FormControl>
            {/* {error && (
              <Text m="10px 0" color={applicationColors.ERROR_COLOR}>
                {error}
              </Text>
            )} */}
            <Button mt="20px" onClick={uploadReceipt}>
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

ReceiptUpload.propTypes = {
  expense: PropTypes.object,
  updateExpensesForProject: PropTypes.func,
};

export default ReceiptUpload;
