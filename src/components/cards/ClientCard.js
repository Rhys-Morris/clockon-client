import React from "react";
import {
  Flex,
  Text,
  Popover,
  PopoverArrow,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "../../stylesheets/clientCard.css";
import PopoverContentButton from "../styled/PopoverContentButton";

const cardStyle = {
  border: "2px solid lightgrey",
  borderRadius: "5px",
  color: "black",
  width: "300px",
  height: "150px",
  position: "relative",
};

const ellipsisStyle = {
  position: "absolute",
  right: "10px",
  top: "5px",
  padding: "2px",
  cursor: "pointer",
};

const ClientCard = ({ client }) => {
  const { name, contact, email } = client;
  return (
    <Flex direction="column" p={"10px"} style={cardStyle} m={"10px"}>
      {/* Edit/Delete Button */}
      <Popover isLazy placement="bottom">
        <PopoverTrigger>
          <div style={ellipsisStyle}>
            <FontAwesomeIcon icon={faEllipsisV} color="lightgrey" size="1x" />
          </div>
        </PopoverTrigger>
        <PopoverContent w="100px">
          <PopoverArrow />
          <PopoverBody p="3px">
            <Flex direction="column">
              <PopoverContentButton>Edit</PopoverContentButton>
              <PopoverContentButton color="#FFDBDB" hoverColor="#FFCCCC">
                Delete
              </PopoverContentButton>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Text mb="10px" casing="uppercase">
        {name}
      </Text>
      <Text fontSize="sm">Contact: {contact}</Text>
      <Text fontSize="sm">Email: {email}</Text>
    </Flex>
  );
};

export default ClientCard;
