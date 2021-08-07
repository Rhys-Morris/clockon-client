import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Flex,
  Box,
  Select,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { inputFormattedToday } from "../../helpers/date";
import { getClients, addClient } from "../../data/api";
import WageContext from "../../contexts/hourlyRate";
import applicationColors from "../../style/colors";
import PropTypes from "prop-types";

const ProjectForm = ({ action, onClose, type, project }) => {
  const { hourlyRate } = React.useContext(WageContext);
  const [name, setName] = React.useState(project?.name || "");
  const [projectColor, setProjectColor] = React.useState(
    project?.color || "#22ff55"
  );
  const [clients, setClients] = React.useState([]);
  const [client, setClient] = React.useState(project?.client_id || "");
  const [billable, setBillable] = React.useState(
    project?.billable !== undefined ? project.billable : true
  );
  const [dueDate, setDueDate] = React.useState(
    project?.due_date || inputFormattedToday()
  );
  const [addNewClient, setAddNewClient] = React.useState(false);
  const [newClient, setNewClient] = React.useState("");
  const [billableRate, setBillableRate] = React.useState(
    project?.billableRate || ""
  );
  const [error, setError] = React.useState(null);

  const validateInput = () => {
    if (name.length > 40) return [false, "Name must not exceed 40 characters"];
    if (billableRate > 9999)
      return [false, "Billable rate must be less than 10000"];
    return [true];
  };

  const submitForm = (e) => {
    e.preventDefault();
    const [valid, errorMessage] = validateInput();
    if (valid) {
      action({
        id: project?.id,
        name,
        color: projectColor,
        billable,
        billableRate: billableRate ? billableRate : hourlyRate,
        dueDate,
        clientId: client,
        active: project?.active ? project.active : true,
      });
      onClose();
    } else {
      setError(errorMessage);
    }
  };

  // ----- RENDER -----
  React.useEffect(() => {
    getClients().then((data) => {
      setClients(data.clients);
      if (!client) {
        setClient(data.clients[0].id);
      }
    });
  }, []);

  // Add client via form
  return (
    <form onSubmit={submitForm}>
      <FormControl isRequired>
        <Flex align="flex-end" mb="15px">
          <Box flex="4">
            <FormLabel fontSize="sm" casing="uppercase">
              Project Name
            </FormLabel>
            <Input
              data-cy="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New Project"
            ></Input>
          </Box>
          <Center flex="1">
            <label htmlFor="color-picker"></label>
            <input
              style={{
                height: "40px",
                width: "40px",
                outline: "none",
                cursor: "pointer",
              }}
              data-cy="color"
              id="color-picker"
              type="color"
              value={projectColor}
              onChange={(e) => setProjectColor(e.target.value)}
            />
          </Center>
        </Flex>
      </FormControl>
      <FormControl isRequired mb="15px">
        {/* TO DO - ADD ABILITY TO CREATE NEW CLIENT HERE */}
        <Flex align="center" justify="space-between" mb="5px">
          <FormLabel htmlFor="clientSelect" fontSize="sm" flex="1">
            Client
          </FormLabel>
          {!addNewClient && (
            <Button
              size="xs"
              fontSize="xs"
              color="white"
              bg="#8eaedd"
              p="2px 4px"
              borderRadius="2px"
              onClick={() => setAddNewClient(true)}
            >
              New Client
            </Button>
          )}
          {addNewClient && (
            <Flex align="center">
              <Input
                value={newClient}
                onChange={(e) => setNewClient(e.target.value)}
                w="150px"
                ml="5px"
                fontSize="xs"
                size="sm"
                placeholder={"New client name"}
              />
              <Button
                size="xs"
                color="white"
                bg="green.300"
                m="0 5px"
                onClick={() => {
                  addClient({ name: newClient })
                    .then((res) => {
                      setClients([...res.clients]);
                      setClient(res.clients[res.clients.length - 1].id);
                    })
                    .catch((e) => console.warn(e));
                  setAddNewClient(false);
                }}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
              <Button
                size="xs"
                color="white"
                bg="red.300"
                onClick={() => setAddNewClient(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </Flex>
          )}
        </Flex>
        <Select
          id="clientSelect"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          data-cy="client"
        >
          {clients.map((c, index) => (
            <option key={index} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mb="15px">
        <Flex direction="column">
          <FormLabel fontSize="sm" m="0">
            Billable Rate:
          </FormLabel>
          <Input
            data-cy="rate"
            type="number"
            mt="5px"
            value={billableRate}
            onChange={(e) => setBillableRate(e.target.value)}
            placeholder="Leave blank to use base hourly rate"
          />
        </Flex>
      </FormControl>
      <Flex align="start">
        <FormControl mb="15px">
          <FormLabel fontSize="sm" m="0">
            Due Date:
          </FormLabel>
          <Input
            data-cy="dueDate"
            type="date"
            mt="5px"
            min={inputFormattedToday()}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>
        <FormControl mb="15px">
          <Flex align="center" justify="center">
            <FontAwesomeIcon
              icon={faDollarSign}
              color="#666"
              style={{ marginRight: "5px" }}
            />
            <FormLabel fontSize="sm" m="0">
              Billable:
            </FormLabel>
            <Checkbox
              isChecked={billable}
              pl="20px"
              onChange={(e) => setBillable(e.target.checked)}
            />
          </Flex>
        </FormControl>
      </Flex>
      {error && (
        <Text color={applicationColors.ERROR_COLOR} mt="15px" data-cy="error">
          {error}
        </Text>
      )}
      <Center mt="15px">
        <Button type="submit" data-cy="submit">
          {type} Project
        </Button>
      </Center>
    </form>
  );
};

ProjectForm.propTypes = {
  action: PropTypes.func,
  onClose: PropTypes.func,
  type: PropTypes.string,
  project: PropTypes.object,
};

export default ProjectForm;
