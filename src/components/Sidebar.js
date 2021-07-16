import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SidebarLink from "./styled/SidebarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClock,
  faUserFriends,
  faClipboardList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <Flex direction="column" h="100%" justify="space-between">
      <Flex direction="column">
        <Text color="#8eaedd" mb="20px" fontSize="2xl">
          ClockOn
        </Text>
        <Text fontSize="xs" casing="uppercase" mb="5px">
          Overview
        </Text>
        <SidebarLink>
          <FontAwesomeIcon icon={faHome} style={{ margin: "0 5px" }} />
          Dashboard
        </SidebarLink>
        <Text fontSize="xs" casing="uppercase" mb="3px" mt="30px">
          Manage
        </Text>
        <SidebarLink style={{ margin: "5px 0" }}>
          <FontAwesomeIcon icon={faUserFriends} style={{ margin: "0 5px" }} />
          Clients
        </SidebarLink>
        <SidebarLink style={{ margin: "5px 0" }}>
          <FontAwesomeIcon icon={faClipboardList} style={{ margin: "0 5px" }} />
          Projects
        </SidebarLink>
        <SidebarLink style={{ margin: "5px 0" }}>
          <FontAwesomeIcon icon={faClock} style={{ margin: "0 5px" }} />
          Time
        </SidebarLink>
      </Flex>
      <Box style={{ justifySelf: "flex-end" }}>
        <SidebarLink
          style={{ width: "100%", margin: "5px 0" }}
          primary={"#CF6766"}
        >
          <FontAwesomeIcon icon={faSignOutAlt} style={{ margin: "0 5px" }} />
          Time
        </SidebarLink>
        <Text>Rhys Morris</Text>
        <Text fontSize="xs">rhysmorris08@gmail.com</Text>
      </Box>
    </Flex>
  );
};

export default Sidebar;
