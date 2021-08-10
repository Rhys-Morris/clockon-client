import React from "react";
import { Flex } from "@chakra-ui/react";
import Hero from "./Hero";

const LandingPage = () => {
  // Set title
  React.useEffect(() => {
    window.document.title = "ClockOn | Project Management Made Easy";
  }, []);

  return (
    <section>
      <Flex direction="column">
        <Hero />
      </Flex>
    </section>
  );
};

export default LandingPage;
