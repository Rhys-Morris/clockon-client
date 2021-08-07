import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink, useHistory } from "react-router-dom";
import SidebarLink from "./styled/SidebarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClock,
  faUserFriends,
  faClipboardList,
  faSignOutAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { destroySession } from "../helpers/helper";
import SettingsModal from "./modals/SettingsModal";
import { WageConsumer } from "../contexts/hourlyRate";
import { getUser } from "../data/api";
import { destroyUser } from "../data/api";
import ConfirmDestroyModal from "./modals/ConfirmDestroyModal";

// ----- COMPONENT STYLES -----
const linkActive = { color: "#031424" };
const sideBarLinkStyle = { width: "100%", margin: "5px 0" };
const iconStyle = { margin: "0 5px" };

const Sidebar = () => {
  const [user, setUser] = React.useState(null);
  let history = useHistory();

  // ----- RENDER -----
  React.useEffect(() => {
    getUser().then((data) => {
      if (data.user) setUser(data.user); // Set user name and email
    });
  }, []);

  // ----- REMOVE USER -----
  const removeUser = () => {
    destroyUser().then((res) => {
      console.log(res);
      if (res.status === 200) {
        destroySession();
        history.push("/");
      }
    });
  };

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
            <FontAwesomeIcon icon={faHome} style={iconStyle} />
            Dashboard
          </SidebarLink>
        </NavLink>
        <Text fontSize="xs" casing="uppercase" mb="3px" mt="30px">
          Manage
        </Text>
        <NavLink to="/clients" activeStyle={linkActive}>
          <SidebarLink style={sideBarLinkStyle}>
            <FontAwesomeIcon icon={faUserFriends} style={iconStyle} />
            Clients
          </SidebarLink>
        </NavLink>
        <NavLink to="/projects" activeStyle={linkActive}>
          <SidebarLink style={sideBarLinkStyle}>
            <FontAwesomeIcon icon={faClipboardList} style={iconStyle} />
            Projects
          </SidebarLink>
        </NavLink>
        <NavLink to="/work" activeStyle={linkActive}>
          <SidebarLink style={sideBarLinkStyle}>
            <FontAwesomeIcon icon={faClock} style={iconStyle} />
            Work
          </SidebarLink>
        </NavLink>
        <Text fontSize="xs" casing="uppercase" mt="30px" mb="5px">
          Settings
        </Text>
        <WageConsumer>{() => <SettingsModal />}</WageConsumer>
      </Flex>
      <Box style={{ justifySelf: "flex-end" }}>
        <NavLink to="/" onClick={destroySession}>
          <SidebarLink style={sideBarLinkStyle} primary={"#CF6766"}>
            <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} />
            Log Out
          </SidebarLink>
        </NavLink>
        <ConfirmDestroyModal
          trigger={
            <SidebarLink style={sideBarLinkStyle} primary={"#CF6766"}>
              <FontAwesomeIcon icon={faTrash} style={iconStyle} />
              Remove Account
            </SidebarLink>
          }
          action={removeUser}
          message={"Are you sure you wish to delete your account permanently?"}
        />
        <Text>{user?.name}</Text>
        <Text fontSize="xs">{user?.email}</Text>
      </Box>
    </Flex>
  );
};

export default Sidebar;
