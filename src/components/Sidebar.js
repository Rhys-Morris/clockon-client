import React from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { destroySession } from "../helpers/helper";
import SettingsModal from "./modals/SettingsModal";
import { WageConsumer } from "../contexts/hourlyRate";
import { CurrencyConsumer } from "../contexts/currencyContext";
import { getUser } from "../data/api";
import { destroyUser } from "../data/api";
import ConfirmDestroyModal from "./modals/ConfirmDestroyModal";
import applicationColors from "../style/colors";
import PropTypes from "prop-types";

// ----- STYLES -----
const linkActive = { color: "#031424" };
const sideBarLinkStyle = { width: "100%", margin: "5px 0" };
const iconStyle = { margin: "0 5px" };

const Sidebar = ({ setSidebarOpen }) => {
  const [user, setUser] = React.useState(
    JSON.parse(sessionStorage.getItem("clockon-user") || null)
  );
  let history = useHistory();
  // MEDIA QUERIES
  const [breakpoint1000] = useMediaQuery("(max-width: 1000px)");

  // ----- RENDER -----
  React.useEffect(() => {
    getUser().then((data) => {
      if (data.user) {
        sessionStorage.setItem("clockon-user", JSON.stringify(data.user));
        setUser(data.user);
      } // Set user name and email
    });
  }, []);

  // ----- REMOVE USER -----
  const removeUser = () => {
    destroyUser().then((res) => {
      if (res.status === 200) {
        destroySession();
        history.push("/");
      }
    });
  };

  return (
    <Flex
      direction="column"
      h="100%"
      justify="space-between"
      postion="relative"
    >
      {/* Close Sidebar for small devices */}
      <Box
        display={breakpoint1000 ? "block" : "none"}
        position="fixed"
        left="175px"
        top="10px"
        cursor="pointer"
        onClick={() => setSidebarOpen(false)}
      >
        <FontAwesomeIcon icon={faTimes} color={applicationColors.ERROR_COLOR} />
      </Box>
      <Flex direction="column">
        <NavLink to="/" style={{ marginBottom: "20px" }}>
          <Text color="#8eaedd" fontSize="2xl">
            ClockOn
          </Text>
        </NavLink>
        <Text fontSize="xs" casing="uppercase" mb="5px">
          Overview
        </Text>
        <NavLink to="/dashboard" activeStyle={linkActive} data-cy="dash">
          <SidebarLink style={{ width: "100%" }}>
            <FontAwesomeIcon icon={faHome} style={iconStyle} />
            Dashboard
          </SidebarLink>
        </NavLink>
        <Text fontSize="xs" casing="uppercase" mb="3px" mt="30px">
          Manage
        </Text>
        <NavLink to="/clients" activeStyle={linkActive} data-cy="clients">
          <SidebarLink style={sideBarLinkStyle}>
            <FontAwesomeIcon icon={faUserFriends} style={iconStyle} />
            Clients
          </SidebarLink>
        </NavLink>
        <NavLink to="/projects" activeStyle={linkActive} data-cy="projects">
          <SidebarLink style={sideBarLinkStyle}>
            <FontAwesomeIcon icon={faClipboardList} style={iconStyle} />
            Projects
          </SidebarLink>
        </NavLink>
        <NavLink to="/work" activeStyle={linkActive} data-cy="work-link">
          <SidebarLink style={sideBarLinkStyle}>
            <FontAwesomeIcon icon={faClock} style={iconStyle} />
            Work
          </SidebarLink>
        </NavLink>
        <Text fontSize="xs" casing="uppercase" mt="30px" mb="5px">
          Settings
        </Text>
        <WageConsumer>
          {() => <CurrencyConsumer>{() => <SettingsModal />}</CurrencyConsumer>}
        </WageConsumer>
      </Flex>
      <Box style={{ justifySelf: "flex-end" }}>
        <NavLink to="/" onClick={destroySession} data-cy="sign-out">
          <SidebarLink style={sideBarLinkStyle} primary={"#CF6766"}>
            <FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} />
            Log Out
          </SidebarLink>
        </NavLink>
        <ConfirmDestroyModal
          trigger={
            <SidebarLink
              style={sideBarLinkStyle}
              primary={"#CF6766"}
              data-cy="account-destroy"
            >
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

Sidebar.propTypes = {
  setSidebarOpen: PropTypes.func,
};

export default Sidebar;
