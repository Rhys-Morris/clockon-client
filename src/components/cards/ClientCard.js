import React from "react";
import {
  Flex,
  Text,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Box,
  Input,
  FormLabel,
  FormControl,
  Badge,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import PopoverContentButton from "../styled/PopoverContentButton";
import { destroyClient, updateClient } from "../../data/api";
import { cardStyle, ellipsisStyle } from "../../style/clients";
import { clientCardReducer } from "../../data/reducers";
import ConfirmDestroyModal from "../modals/ConfirmDestroyModal";
import applicationColors from "../../style/colors";

const ClientCard = ({ client, updateClients }) => {
  // ----- STATE -----
  const initialState = {
    edit: false,
    name: client.name,
    email: client.email,
    contact: client.contact,
    active: client.active,
    loading: false,
    error: null,
  };

  const [clientCardState, dispatch] = React.useReducer(
    clientCardReducer,
    initialState
  );
  const { id, project_count: projectCount } = client;
  const { edit, name, email, contact, active, error } = clientCardState;

  // ----- POPOVER STATE -----
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  // ----- API CALLS -----

  const destroyCard = () => {
    destroyClient(id)
      .then((data) => {
        if (data.clients && Array.isArray(data.clients)) {
          updateClients(data.clients);
        }
      })
      .catch((e) => {
        console.warn(e);
        dispatch({
          type: "setError",
          data: "Card deletion failed, an unexpected error occurred",
        });
      });
  };

  // Pass active status to prevent delay in internal state update and wrong value being sent to backend
  const editCard = (active) => {
    const client = { id, name, contact, email, active };
    updateClient(client)
      .then((data) => {
        if (data.error) {
          dispatch({
            type: "resetCard",
            data: {
              ...data.client,
              error: `Card failed to update: ${data.error}`,
            },
          });
        } else {
          updateClients(data.clients);
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  return (
    <Flex style={cardStyle} m="10px">
      <Box
        w="4px"
        h="100%"
        bg={
          active ? applicationColors.SOFT_GREEN : applicationColors.ERROR_COLOR
        }
        borderLeftRadius="10px"
      ></Box>
      {/* POPOVER */}
      <Popover
        isLazy
        placement="right-start"
        closeOnBlur={false}
        isOpen={isOpen}
      >
        <PopoverTrigger>
          <div style={ellipsisStyle} onClick={toggleOpen}>
            <FontAwesomeIcon icon={faEllipsisV} color="lightgrey" size="1x" />
          </div>
        </PopoverTrigger>
        <PopoverContent w="100px">
          <PopoverArrow />
          <PopoverBody p="3px">
            <Flex direction="column">
              <PopoverContentButton
                color={
                  edit ? applicationColors.GREEN : applicationColors.LIGHT_BLUE
                }
                hoverColor={
                  edit
                    ? applicationColors.SOFT_GREEN
                    : applicationColors.SOFT_LIGHT_BLUE
                }
                onClick={() => {
                  if (edit) {
                    close();
                    editCard();
                  }
                  dispatch({ type: "setEdit", data: !edit });
                }}
              >
                {edit ? "Confirm" : "Edit"}
              </PopoverContentButton>
              <ConfirmDestroyModal
                trigger={
                  <PopoverContentButton
                    color={applicationColors.ERROR_COLOR}
                    hoverColor={applicationColors.SOFT_ERROR_COLOR}
                    style={{ width: "100%" }}
                  >
                    Delete
                  </PopoverContentButton>
                }
                action={destroyCard}
                message={
                  "Clicking confirm will permanently delete this client, and all projects associated with this client."
                }
              />
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Flex
        direction="column"
        justify="space-between"
        p="5px 16px 5px 12px"
        m="10px"
        w="100%"
      >
        {/* STANDARD APPEARANCE */}
        {!edit && (
          <>
            <Box>
              <Text mb="10px" casing="uppercase">
                {name}
              </Text>
              <Text fontSize="sm">
                Contact:{" "}
                {contact ? (
                  contact
                ) : (
                  <span style={{ color: "lightgray" }}>Not provided</span>
                )}
              </Text>
              <Text fontSize="sm">
                Email:{" "}
                {email ? (
                  email
                ) : (
                  <span style={{ color: "lightgray" }}>Not provided</span>
                )}
              </Text>
            </Box>
            <Box>
              <Flex align="center" justify="space-between" w="100%">
                <Text>
                  {projectCount} current project{projectCount === 1 ? "" : "s"}
                </Text>
                <Badge
                  colorScheme={active ? "green" : "red"}
                  cursor="pointer"
                  onClick={() => {
                    // Send to back end first, then update on front to prevent timing issues
                    editCard(!active);
                    dispatch({ type: "setActive", data: !active });
                  }}
                >
                  {active ? "Active" : "Inactive"}
                </Badge>
              </Flex>
              {error && (
                <Text fontSize="xs" color={applicationColors.ERROR_COLOR}>
                  {error}
                </Text>
              )}
            </Box>
          </>
        )}
        {/* EDITING APPEARANCE */}
        {edit && (
          <>
            <FormControl>
              <Flex align="center">
                <FormLabel htmlFor="name" flex=".8" fontSize="sm">
                  Name:{" "}
                </FormLabel>
                <Input
                  fontSize="sm"
                  mb="3px"
                  p="xs"
                  casing="uppercase"
                  value={name}
                  max="40"
                  onChange={(e) =>
                    dispatch({ type: "setName", data: e.target.value })
                  }
                  flex="2"
                />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex align="center">
                <FormLabel htmlFor="contact" flex=".8" fontSize="sm">
                  Contact:
                </FormLabel>
                <Input
                  fontSize="sm"
                  mb="3px"
                  p="xs"
                  outline="none"
                  flex="2"
                  value={contact}
                  onChange={(e) =>
                    dispatch({ type: "setContact", data: e.target.value })
                  }
                />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex align="center">
                <FormLabel htmlFor="email" flex=".8" fontSize="sm">
                  Email:
                </FormLabel>
                <Input
                  max="40"
                  fontSize="sm"
                  mb="3px"
                  p="xs"
                  outline="none"
                  flex="2"
                  value={email}
                  onChange={(e) =>
                    dispatch({ type: "setEmail", data: e.target.value })
                  }
                />
              </Flex>
            </FormControl>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ClientCard;
