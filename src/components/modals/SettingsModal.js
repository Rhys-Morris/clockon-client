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
  Select,
} from "@chakra-ui/react";
import SidebarLink from "../styled/SidebarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import WageContext from "../../contexts/hourlyRate";
import applicationColors from "../../style/colors";
import CurrencyContext from "../../contexts/currencyContext";

const SettingsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hourlyRate, updateHourlyRate } = React.useContext(WageContext);
  const { currency, updateCurrency } = React.useContext(CurrencyContext);
  const [newWage, setNewWage] = React.useState(hourlyRate);
  const [newCurrency, setNewCurrency] = React.useState(currency);
  const [error, setError] = React.useState(null);

  const validateInput = () => {
    if (newWage <= 0 || newWage > 9999) {
      setError("Wage provided must be > 0 and < 9999");
      return false;
    }
    return true;
  };

  const submitSettings = () => {
    if (validateInput()) {
      const updatedWage = Number(Number.parseFloat(newWage).toFixed(2));
      updateHourlyRate(updatedWage);
      localStorage.setItem("clockon-wage", updatedWage);
      updateCurrency(newCurrency);
      localStorage.setItem("clockon-currency", newCurrency);
      onClose();
    }
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
              <FormLabel>Adjust base hourly wage ({newCurrency})</FormLabel>
              <Input
                type="number"
                min="0"
                max="9999"
                value={newWage}
                onChange={(e) => setNewWage(e.target.value)}
              />
            </FormControl>
            <FormControl mt="10px">
              <FormLabel>Set currency:</FormLabel>
              <Select
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value)}
              >
                <option value="AUD$">Australian Dollar</option>
                <option value="USD$">U.S. Dollar</option>
                <option value="EUR€">Euro</option>
                <option value="GBP£">Great British Pound</option>
                <option value="CAD$">Canadian Dollar</option>
              </Select>
            </FormControl>
            {error && (
              <Text m="10px 0" color={applicationColors.ERROR_COLOR}>
                {error}
              </Text>
            )}
            <Button mt="10px" onClick={submitSettings}>
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
