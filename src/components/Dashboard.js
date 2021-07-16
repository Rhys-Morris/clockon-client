import React from "react";
import { Flex, Grid, GridItem, Center, Heading } from "@chakra-ui/react";
import Overview from "./Overview";

const Dashboard = () => {
  return (
    <Flex h="100%" direction="column" p="10px">
      <Center h="100px">
        <Heading
          as="h2"
          size="2xl"
          p="20px"
          mt="15px"
          style={{ fontWeight: 300 }}
          color="gray.500"
        >
          Good Morning, <strong>User!</strong>
        </Heading>
      </Center>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1 fr)"
        color="grey"
        flex="1"
      >
        <GridItem rowSpan={1} colSpan={1}>
          Active Projects
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Overview />
        </GridItem>
        <GridItem rowSpan={1} colSpan={2}>
          Tasks
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Dashboard;
