import React from "react";
import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import herovid from "../assets/video.mp4";
import "../style/stylesheets/hero.css";
import PillButton from "./styled/PillButton";
import LandingNav from "./LandingNav";
import { Link } from "react-router-dom";

const letterRotate = {
  transform: "rotate(15deg)",
  color: "#8eaedd",
  display: "inline-block",
  margin: "0 1px",
  fontWeight: "bold",
};

const Hero = () => {
  return (
    <Flex
      direction="column"
      align="start"
      justify="center"
      minHeight="100vh"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(57, 70, 88, .5), rgba(57, 70, 88, .5))",
      }}
      position="relative"
    >
      <LandingNav />
      {/* BG video for hero */}
      <video id="video-bg" autoPlay loop muted>
        <source src={herovid} type="video/mp4" />
      </video>
      <Box pl="20%">
        <Heading as="h1" size="3xl" fontWeight="400" mb="15px">
          Manage your projects,
        </Heading>
        <Heading as="h2" size="3xl" fontWeight="400" mb="15px">
          track your hours,
        </Heading>
        <Heading as="h3" size="3xl" fontWeight="400" mb="30px">
          take <Text style={letterRotate}>c</Text>
          <Text style={letterRotate}>o</Text>
          <Text style={letterRotate}>n</Text>
          <Text style={letterRotate}>t</Text>
          <Text style={letterRotate}>r</Text>
          <Text style={letterRotate}>o</Text>
          <Text style={letterRotate}>l</Text> of your work
        </Heading>
        <Link to="/register">
          <PillButton fontSize="20px">Get Started</PillButton>
        </Link>
      </Box>
    </Flex>
  );
};

export default Hero;
