import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import SidebarLink from "./styled/SidebarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClock,
  faUserFriends,
  faClipboardList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { destroySession } from "../helpers/helper";
import SettingsModal from "./modals/SettingsModal";
import { WageConsumer } from "../contexts/hourlyRate";

const linkActive = {
  color: "#031424",
};

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
        <NavLink to="/dashboard" activeStyle={linkActive}>
          <SidebarLink style={{ width: "100%" }}>
            <FontAwesomeIcon icon={faHome} style={{ margin: "0 5px" }} />
            Dashboard
          </SidebarLink>
        </NavLink>
        <Text fontSize="xs" casing="uppercase" mb="3px" mt="30px">
          Manage
        </Text>
        <NavLink to="/clients" activeStyle={linkActive}>
          <SidebarLink style={{ width: "100%", margin: "5px 0" }}>
            <FontAwesomeIcon icon={faUserFriends} style={{ margin: "0 5px" }} />
            Clients
          </SidebarLink>
        </NavLink>
        <NavLink to="/projects" activeStyle={linkActive}>
          <SidebarLink style={{ width: "100%", margin: "5px 0" }}>
            <FontAwesomeIcon
              icon={faClipboardList}
              style={{ margin: "0 5px" }}
            />
            Projects
          </SidebarLink>
        </NavLink>
        <NavLink to="/time" activeStyle={linkActive}>
          <SidebarLink style={{ width: "100%", margin: "5px 0" }}>
            <FontAwesomeIcon icon={faClock} style={{ margin: "0 5px" }} />
            Time
          </SidebarLink>
        </NavLink>
        <Text fontSize="xs" casing="uppercase" mt="30px" mb="5px">
          Settings
        </Text>
        <WageConsumer>{() => <SettingsModal />}</WageConsumer>
      </Flex>
      <Box style={{ justifySelf: "flex-end" }}>
        <NavLink to="/" onClick={destroySession}>
          <SidebarLink
            style={{ width: "100%", margin: "5px 0" }}
            primary={"#CF6766"}
          >
            <FontAwesomeIcon icon={faSignOutAlt} style={{ margin: "0 5px" }} />
            Log Out
          </SidebarLink>
        </NavLink>
        <Text>Rhys Morris</Text>
        <Text fontSize="xs">rhysmorris08@gmail.com</Text>
      </Box>
    </Flex>
  );
};

export default Sidebar;
