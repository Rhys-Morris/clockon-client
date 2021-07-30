import React from "react";
import { Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PillButton from "./styled/PillButton";
import LoginModal from "./modals/LoginModal";
import applicationColors from "../style/colors";

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
          {sessionStorage.getItem("token") ? (
            <Link
              as={RouterLink}
              to="/dashboard"
              fontSize="lg"
              _hover={{ textDecoration: "none", color: applicationColors.NAVY }}
            >
              Dashboard
            </Link>
          ) : (
            <LoginModal />
          )}
          <Link as={RouterLink} to="/register" ml="50px" fontSize="lg">
            <PillButton
              bg={applicationColors.NAVY}
              bgHover={applicationColors.LIGHT_NAVY}
            >
              Register
            </PillButton>
          </Link>
        </Flex>
      </Flex>
    </nav>
  );
};

export default LandingNav;
