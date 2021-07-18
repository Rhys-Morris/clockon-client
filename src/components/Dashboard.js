import React from "react";
import { Box, Flex, Grid, GridItem, Center, Heading } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <>
      <Flex h="100%">
        <Box
          w="200px"
          bgGradient="linear(to-b, #30415D, #031424)"
          h="100%"
          p="15px"
        >
          <Sidebar />
        </Box>
        <Box flex="1" color="gray.400">
          <Flex h="100%" direction="column">
            <Center h="100px">
              <Heading
                as="h2"
                size="2xl"
                p="20px"
                style={{ fontWeight: 300 }}
                color="#031424"
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
                <Center> Active Projects</Center>
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Center>Graphical Information</Center>
              </GridItem>
              <GridItem rowSpan={1} colSpan={2}>
                <Center>Tasks</Center>
              </GridItem>
            </Grid>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
