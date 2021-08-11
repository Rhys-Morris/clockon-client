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
  Heading,
} from "@chakra-ui/react";
import SidebarLink from "../styled/SidebarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";
import WageContext from "../../contexts/hourlyRate";
import applicationColors from "../../style/colors";
import CurrencyContext from "../../contexts/currencyContext";
import { updateBillableRates } from "../../data/api";
import { useHistory } from "react-router-dom";

const SettingsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hourlyRate, updateHourlyRate } = React.useContext(WageContext);
  const { currency, updateCurrency } = React.useContext(CurrencyContext);
  const [newWage, setNewWage] = React.useState(Number(hourlyRate).toFixed(2));
  const [newCurrency, setNewCurrency] = React.useState(currency);
  const [companyName, setCompanyName] = React.useState(
    localStorage.getItem("clockon-company") &&
      JSON.parse(localStorage.getItem("clockon-company"))["companyName"]
      ? JSON.parse(localStorage.getItem("clockon-company"))["companyName"]
      : ""
  );
  const [companyAddress, setCompanyAddress] = React.useState(
    localStorage.getItem("clockon-company") &&
      JSON.parse(localStorage.getItem("clockon-company"))["companyAddress"]
      ? JSON.parse(localStorage.getItem("clockon-company"))["companyAddress"]
      : ""
  );
  const [error, setError] = React.useState(null);
  const history = useHistory();

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
      if (companyName || companyAddress) {
        const companyDetails = JSON.stringify({ companyName, companyAddress });
        localStorage.setItem("clockon-company", companyDetails);
      }
      localStorage.setItem("clockon-wage", updatedWage);
      localStorage.setItem("clockon-currency", newCurrency);
      updateCurrency(newCurrency);
      updateHourlyRate(newWage);
      // Force refresh after api call when wage updated
      // Ignore on currency only changes
      if (Number(Number(hourlyRate).toFixed(2)) !== updatedWage) {
        updateBillableRates(hourlyRate, newWage).then((data) => {
          if (data.message === "success") history.go(0);
        });
      }
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
              <Text m="10px 0" fontSize="sm" color="gray.400">
                {`This action will update all projects currently using ${currency}${hourlyRate} to the new rate.`}
              </Text>
              <Input
                type="number"
                min="0"
                max="9999"
                value={newWage}
                onChange={(e) => setNewWage(e.target.value)}
              />
            </FormControl>
            <FormControl mt="20px">
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
            <Heading mt="20px" size="md">
              Invoice Details
            </Heading>
            <Text m="10px 0" fontSize="sm" color="gray.400">
              Change personal details applied to generated invoices.
            </Text>
            <FormControl mt="20px">
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Template Company"
              />
            </FormControl>
            <FormControl mt="20px">
              <FormLabel>Company Address</FormLabel>
              <Input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Template Company Address"
              />
            </FormControl>
            {error && (
              <Text m="10px 0" color={applicationColors.ERROR_COLOR}>
                {error}
              </Text>
            )}
            <Button mt="30px" onClick={submitSettings}>
              Submit
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
