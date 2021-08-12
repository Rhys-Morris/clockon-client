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
  Text,
  Heading,
  Flex,
  Button,
} from "@chakra-ui/react";
import { inputFormattedToday } from "../../helpers/date";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import NewButton from "../styled/NewButton";
import applicationColors from "../../style/colors";

const InvoiceForm = ({ client, projectId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const [clientName, setClientName] = React.useState("");
  const [clientContact, setClientContact] = React.useState("");
  const [clientEmail, setClientEmail] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [error, setError] = React.useState(null);
  const history = useHistory();

  // Set Client details when available
  React.useEffect(() => {
    setClientName(client?.name);
    setClientEmail(client?.email);
    setClientContact(client?.contact);
  }, [client]);

  // Validate
  const validateInput = () => {
    if (!dueDate) {
      setError("Due date is required to render an invoice");
      return false;
    }
    return true;
  };

  // Redirect to PDF render
  const submitPdfDetails = (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    const url = `/invoice${formatQueryString()}`;
    history.push(url);
  };

  // Populate query string with PDF details
  const formatQueryString = () => {
    return `?company=${companyName || "empty"}&address=${
      companyAddress || "empty"
    }&client=${clientName}&clientContact=${
      clientContact || "empty"
    }&clientEmail=${
      clientEmail || "empty"
    }&dueDate=${dueDate}&projectId=${projectId}`;
  };

  console.log(dueDate);

  return (
    <>
      <NewButton
        onClick={onOpen}
        style={{
          textAlign: "center",
          padding: "15px",
          marginLeft: "10px",
        }}
      >
        Generate Invoice
      </NewButton>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl">Invoice Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <form onSubmit={submitPdfDetails}>
                <Text mb="20px" fontSize="sm" color="gray.400">
                  Invoices automatically generate with all previously
                  non-invoiced work periods for a project. Once an invoice has
                  been submitted to a client, use the &quot;Mark as
                  Invoiced&quot; button on the project page to mark work periods
                  as invoiced and prevent appearance on future invoices.
                </Text>
                {/* General Invoice Details */}
                <FormControl>
                  <FormLabel>Invoice Due Date</FormLabel>
                  <Input
                    type="date"
                    min={inputFormattedToday()}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </FormControl>
                {/* Personal Details */}
                <Heading size="md" mt="20px">
                  Personal Company Details
                </Heading>
                <Text m="10px 0" fontSize="sm" color="gray.400">
                  Personal details will be taken from settings if present.
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
                {/* Client Details */}
                <Heading mt="20px" size="md">
                  Client Details
                </Heading>
                <Text m="10px 0" fontSize="sm" color="gray.400">
                  Client details will be taken from client card if present.
                </Text>
                <FormControl mt="20px">
                  <FormLabel>Client</FormLabel>
                  <Input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Template Client Name"
                  />
                </FormControl>
                <FormControl mt="20px">
                  <FormLabel>Contact Name</FormLabel>
                  <Input
                    type="text"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                    placeholder="Template Client Address"
                  />
                </FormControl>
                <FormControl mt="20px">
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="text"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Template Client address"
                  />
                </FormControl>

                {error && (
                  <Text m="10px 0" color={applicationColors.ERROR_COLOR}>
                    {error}
                  </Text>
                )}
                <Button
                  mt="30px"
                  mb="10px"
                  w="100%"
                  type="submit"
                  bg="green.200"
                  _hover={{ bg: "green.100" }}
                >
                  Generate PDF
                </Button>
              </form>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

InvoiceForm.propTypes = {
  client: PropTypes.object,
  projectId: PropTypes.number,
};

export default InvoiceForm;
