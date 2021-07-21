import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Hero from "./Hero";
import Features from "./Features";

const LandingPage = () => {
  return (
    <section>
      <Flex direction="column">
        <Hero />
        <Features />
      </Flex>
    </section>
  );
};

export default LandingPage;
