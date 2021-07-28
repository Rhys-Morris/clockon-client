import React from "react";
import { Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PillButton from "./styled/PillButton";
import LoginModal from "./modals/LoginModal";

const LandingNav = () => {
  return (
    <nav
      style={{
        padding: "15px 20px",
        position: "fixed",
        top: "0",
        width: "100%",
        color: "#fff",
      }}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Link mr="50px" fontSize="30" _hover={{ textDecoration: "none" }}>
            ClockOn
          </Link>
          {/* Feature, About Links here if time */}
        </Flex>
        <Flex align="center">
          <LoginModal />
          <Link as={RouterLink} to="/register" ml="50px">
            <PillButton primary="#031424">Register</PillButton>
          </Link>
        </Flex>
      </Flex>
    </nav>
  );
};

export default LandingNav;
