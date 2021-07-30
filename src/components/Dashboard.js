import React from "react";
import { Box, Flex, Center, Heading } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { getUser } from "../data/api";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  // ----- STATE -----
  let history = useHistory();

  // ----- RENDER -----
  React.useEffect(() => {
    // Handle no token
    if (!sessionStorage.getItem("token")) history.push("/401");
    getUser()
      .then((data) => {
        if (data.user) console.log("received");
        if (data.error) console.warn(data.error);
      })
      .catch((e) => {
        if (e?.response?.status === 401) history.push("/401");
      });
  }, [history]);

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
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Dashboard;
