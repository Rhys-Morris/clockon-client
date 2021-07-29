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
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import SidebarLink from "../styled/SidebarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import WageContext from "../../contexts/hourlyRate";
import applicationColors from "../../style/colors";

const SettingsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hourlyRate, updateHourlyRate } = React.useContext(WageContext);
  const [newWage, setNewWage] = React.useState(hourlyRate);
  const [error, setError] = React.useState(null);

  const validateInput = () => {
    if (newWage <= 0 || newWage > 9999) {
      setError("Wage provided must be > 0 and < 9999");
      return false;
    }
    return true;
  };
  return (
    <>
      <SidebarLink onClick={onOpen}>
        <FontAwesomeIcon icon={faCogs} style={{ margin: "0 5px" }} />
        Settings
      </SidebarLink>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Application Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Adjust base hourly wage ($)</FormLabel>
              <Input
                type="number"
                min="0"
                max="9999"
                value={newWage}
                onChange={(e) => setNewWage(e.target.value)}
              />
            </FormControl>
            {error && (
              <Text m="10px 0" color={applicationColors.ERROR_COLOR}>
                {error}
              </Text>
            )}
            <Button
              mt="10px"
              onClick={() => {
                if (validateInput()) {
                  const updatedWage = Number(
                    Number.parseFloat(newWage).toFixed(2)
                  );
                  updateHourlyRate(updatedWage);
                  onClose();
                }
              }}
            >
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
