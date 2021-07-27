import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faCheck } from "@fortawesome/free-solid-svg-icons";
import ExpenseCard from "./cards/ExpenseCard";
import BaseNewModal from "./modals/BaseNewModal";

const Expenses = ({ projectId, expenses, action }) => {
  return (
    <Flex
      flex="1"
      direction="column"
      style={{ borderLeft: "1px solid rgba(0,0,0,.12)" }}
    >
      {/* Heading */}
      <Flex justify="space-between" align="center" p="10px 20px">
        <Heading as="h3" fontWeight="300" fontSize="xl" color="gray.500">
          Expenses
        </Heading>
        <BaseNewModal
          type="Expense"
          action={action}
          buttonProps={{ primary: "#556885", hoverColor: "#728bb1" }}
          buttonStyle={{ padding: "6px 10px", fontSize: "14px" }}
          projectId={projectId}
        />
      </Flex>
      <Flex
        align="center"
        color="gray.600"
        fontWeight="bold"
        boxShadow="0 1px 1px 0 rgba(0, 0,0, .12)"
        mt="5px"
        p="5px 20px"
      >
        <Text fontSize="14px" casing="uppercase" flex="2">
          Expense
        </Text>
        <Text fontSize="sm" casing="uppercase" flex="1" textAlign="center">
          Date
        </Text>
        <Text fontSize="sm" casing="uppercase" flex="1" textAlign="center">
          Cost
        </Text>
        {/* Keep spacing the same */}
        <FontAwesomeIcon icon={faEllipsisV} color="transparent" />
      </Flex>
      {(!expenses || expenses?.length === 0) && (
        <Text p="20px">No current expenses for this project</Text>
      )}
      {expenses?.length > 0 &&
        expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            updateExpensesForProject={action}
          />
        ))}
    </Flex>
  );
};

export default Expenses;
