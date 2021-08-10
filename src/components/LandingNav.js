import React from "react";
import { Flex, Link, useMediaQuery } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import PillButton from "./styled/PillButton";
import LoginModal from "./modals/LoginModal";
import applicationColors from "../style/colors";
import { getToken } from "../helpers/helper";
import { HamburgerBox, HamburgerLine } from "./styled/HamburgerElements";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const LandingNav = () => {
  const [breakpoint500] = useMediaQuery("(max-width: 500px)");

  const showMenu = () => {
    document.getElementById("menu").style.visibility = "visible";
    document.getElementById("menu").style.opacity = ".9";
    document.getElementById("hamburger").style.visibility = "hidden";
  };

  const closeMenu = () => {
    document.getElementById("menu").style.visibility = "hidden";
    document.getElementById("menu").style.opacity = "0";
    document.getElementById("hamburger").style.visibility = "visible";
  };

  return (
    <nav
      style={{
        padding: breakpoint500 ? "0" : "15px 20px",
        position: "fixed",
        top: "0",
        width: "100%",
        color: "#fff",
      }}
    >
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Link
            p={breakpoint500 ? "0 20px" : "0"}
            mt={breakpoint500 ? "10px" : "0"}
            fontSize="30"
            _hover={{ textDecoration: "none" }}
          >
            ClockOn
          </Link>
          {/* Feature, About Links here if time */}
        </Flex>
        {breakpoint500 ? (
          <Flex flex="1" justify="flex-end">
            <HamburgerBox
              style={{
                marginRight: "10px",
                marginTop: "10px",
                transition: "0.2s",
              }}
              onClick={showMenu}
              id="hamburger"
            >
              <HamburgerLine />
              <HamburgerLine />
              <HamburgerLine />
            </HamburgerBox>
            {/* Options to appear */}
            <Flex
              direction="column"
              bg={applicationColors.NAVY}
              height="100vh"
              width="180px"
              position="absolute"
              visibility="hidden"
              opacity="0"
              id="menu"
              transition=".3s"
              p="10px"
            >
              <FontAwesomeIcon
                style={{
                  marginTop: "10px",
                }}
                icon={faTimes}
                color={applicationColors.SOFT_LIGHT_BLUE}
                size="2x"
                onClick={closeMenu}
              />
              {getToken() ? (
                <Link
                  as={RouterLink}
                  to="/dashboard"
                  fontSize="2xl"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Link>
              ) : (
                <LoginModal style={{ marginTop: "30px" }} />
              )}
              <Link
                as={RouterLink}
                to="/register"
                fontSize="2xl"
                _hover={{
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </Flex>
          </Flex>
        ) : (
          <Flex align="center">
            {getToken() ? (
              <Link
                as={RouterLink}
                to="/dashboard"
                fontSize="lg"
                _hover={{
                  textDecoration: "none",
                  color: applicationColors.NAVY,
                }}
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
        )}
      </Flex>
    </nav>
  );
};

export default LandingNav;
