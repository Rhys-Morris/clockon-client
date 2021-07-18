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
} from "@chakra-ui/react";
import { mockClients } from "../../data/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { inputFormattedToday } from "../../helpers/date";

const NewProjectForm = ({ action, onClose }) => {
  const [name, setName] = React.useState("");
  const [projectColor, setProjectColor] = React.useState("#22ff55");
  const [client, setClient] = React.useState("");
  const [billable, setBillable] = React.useState(true);
  const [dueDate, setDueDate] = React.useState(inputFormattedToday());

  const submitForm = (e) => {
    e.preventDefault();
    // STATE UPDATE
    action({
      id: Math.ceil(Math.random() * 9999), // TO REMOVE
      hoursLogged: 0,
      name,
      color: projectColor,
      client,
      dueDate,
      billable,
      dueDate,
      active: true,
    });
    // TO DO - SEND TO API
  };

  return (
    <form onSubmit={submitForm}>
      <FormControl isRequired>
        <Flex align="flex-end" mb="10px">
          <Box flex="4">
            <FormLabel fontSize="sm" casing="uppercase">
              Project Name
            </FormLabel>
            <Input
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
              id="color-picker"
              type="color"
              value={projectColor}
              onChange={(e) => setProjectColor(e.target.value)}
            />
          </Center>
        </Flex>
      </FormControl>
      <FormControl isRequired mb="10px">
        {/* TO DO - ADD ABILITY TO CREATE NEW CLIENT HERE */}
        <FormLabel fontSize="sm">Client</FormLabel>
        <Select value={client} onChange={(e) => setClient(e.target.value)}>
          {mockClients.map((c, index) => (
            <option key={index} value={c.name}>
              {c.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Flex align="start">
        <FormControl mb="10px">
          <FormLabel fontSize="sm" m="0">
            Due Date:
          </FormLabel>
          <Input
            type="date"
            mt="5px"
            min={inputFormattedToday()}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>
        <FormControl mb="10px">
          <Flex align="center" justify="center">
            <FontAwesomeIcon
              icon={faDollarSign}
              color="#666"
              style={{ marginRight: "5px" }}
            />
            <FormLabel fontSize="sm" m="0">
              Billable
            </FormLabel>
            <Checkbox
              defaultIsChecked
              pl="20px"
              onChange={(e) => e.target.checked}
            />
          </Flex>
        </FormControl>
      </Flex>
      <Center mt="15px">
        <Button onClick={onClose} type="submit">
          Create Project
        </Button>
      </Center>
    </form>
  );
};

export default NewProjectForm;
