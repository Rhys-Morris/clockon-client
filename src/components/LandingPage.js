import React from "react";
import { Flex } from "@chakra-ui/react";
import Hero from "./Hero";

const LandingPage = () => {
  return (
    <section>
      <Flex direction="column">
        <Hero />
      </Flex>
    </section>
  );
};

export default LandingPage;
