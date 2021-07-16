import React from "react";
import { Select, Center, Flex, Box, Heading, Text } from "@chakra-ui/react";

const Overview = () => {
  return (
    <div h="100%" w="100%">
      <Flex direction="column" justify="center">
        <Select
          variant="flushed"
          placeholder="Select time period"
          size="md"
          alignSelf="end"
        >
          <option value="Today">Today</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
        </Select>
        <Box>
          <Flex justify="space-around" align="center">
            <Flex direction="column" p="10px">
              <Text fontSize="3xl" fontWeight="300" casing="uppercase">
                Total Hours
              </Text>
              <Text fontSize="60px">23.8</Text>
            </Flex>
            <Flex direction="column" p="10px">
              <Text fontSize="3xl" fontWeight="300" casing="uppercase">
                Earnings
              </Text>
              <Text fontSize="60px">23.8</Text>
            </Flex>
          </Flex>
          <Flex justify="space-around" align="center">
            <Flex direction="column" p="10px">
              <Text fontSize="3xl" fontWeight="300" casing="uppercase">
                Earnings
              </Text>
              <Text fontSize="60px">23.8</Text>
            </Flex>
            <Flex direction="column" p="10px">
              <Text fontSize="3xl" fontWeight="300" casing="uppercase">
                Total Hours
              </Text>
              <Text fontSize="60px">23.8</Text>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default Overview;
