import React from "react";
import { Flex, Heading, Text, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faSortDown,
  faSortUp,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import ExpenseCard from "./cards/ExpenseCard";
import BaseNewModal from "./modals/BaseNewModal";
import { sortByDate, sortByNumeric } from "../helpers/helper";
import NewButton from "./styled/NewButton";
import PropTypes from "prop-types";

const Expenses = ({ projectId, expenses, action }) => {
  // ----- STATE -----
  const [dateSorted, setDateSorted] = React.useState(null);
  const [costSorted, setCostSorted] = React.useState(null);
  const [sortedExpenses, setSortedExpenses] = React.useState(expenses);
  const [paginatedExpenses, setPaginatedExpenses] = React.useState(expenses);
  const [page, setPage] = React.useState(1);

  // Repaginate when expenses updated or sorted
  React.useEffect(() => {
    let sorted = expenses;
    // Sort by date
    if (dateSorted) {
      sorted =
        dateSorted === "first"
          ? sortByDate(expenses, "last", "date")
          : sortByDate(expenses, "first", "date");
    }
    // Sort by cost
    if (costSorted) {
      sorted =
        costSorted === "first"
          ? sortByNumeric(expenses, "last", "cost")
          : sortByNumeric(expenses, "first", "cost");
    }
    // Set sorted Expenses
    setSortedExpenses(sorted);
    // Paginate
    setPaginatedExpenses(sorted?.slice(page * 6 - 6, page * 6 || []));
  }, [expenses, dateSorted, costSorted]);

  // ----- Pagination controls
  const nextPage = () => {
    const endSlice = (page + 1) * 6;
    const startSlice = (page + 1) * 6 - 6;
    setPaginatedExpenses(sortedExpenses.slice(startSlice, endSlice));
    setPage(page + 1);
  };

  const previousPage = () => {
    const endSlice = (page - 1) * 6;
    const startSlice = (page - 1) * 6 - 6;
    setPaginatedExpenses(sortedExpenses.slice(startSlice, endSlice));
    setPage(page - 1);
  };

  // ----- Toggle sorted by due date -----
  const sortDate = () => {
    setDateSorted(dateSorted !== "first" ? "first" : "last");
    setCostSorted(null);
  };

  // ----- Toggle sorted by hours -----
  const sortCost = () => {
    setCostSorted(costSorted === "first" ? "last" : "first");
    setDateSorted(null);
  };

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
        <Flex flex="1.25" justify="center">
          <Text
            fontSize="sm"
            casing="uppercase"
            textAlign="center"
            cursor="pointer"
            // Sort by date
            onClick={sortDate}
          >
            Date
          </Text>
          {/* Sorted icons */}
          {dateSorted && dateSorted === "first" && (
            <FontAwesomeIcon
              icon={faSortDown}
              style={{
                marginLeft: "3px",
                position: "relative",
                top: "-4px",
              }}
            />
          )}
          {dateSorted && dateSorted === "last" && (
            <FontAwesomeIcon
              icon={faSortUp}
              style={{
                marginLeft: "3px",
                position: "relative",
                top: "3px",
              }}
            />
          )}
        </Flex>
        <Flex justify="center" flex="1.25">
          <Text
            fontSize="sm"
            casing="uppercase"
            textAlign="center"
            cursor="pointer"
            // Sort by hours
            onClick={sortCost}
          >
            Cost
          </Text>
          {/* Sorted icons */}
          {costSorted && costSorted === "first" && (
            <FontAwesomeIcon
              icon={faSortDown}
              style={{
                marginLeft: "3px",
                position: "relative",
                top: "-4px",
              }}
            />
          )}
          {costSorted && costSorted === "last" && (
            <FontAwesomeIcon
              icon={faSortUp}
              style={{
                marginLeft: "3px",
                position: "relative",
                top: "3px",
              }}
            />
          )}
        </Flex>
        {/* Keep spacing the same */}
        <Box fontSize="sm" p="3px" marginRight="20px" visibility="hidden">
          Upload receipt
        </Box>
        <FontAwesomeIcon icon={faEllipsisV} color="transparent" />
      </Flex>
      {(!expenses || expenses?.length === 0) && (
        <Text p="20px">No current expenses for this project</Text>
      )}
      {expenses?.length > 0 &&
        paginatedExpenses?.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            updateExpensesForProject={action}
          />
        ))}
      {/* Pagination */}
      <Flex
        position="absolute"
        right="10"
        bottom="10"
        justify="space-between"
        align="center"
        width="60px"
      >
        {/* Previous */}
        {page !== 1 && (
          <NewButton
            onClick={previousPage}
            style={{
              marginRight: "10px",
              padding: "5px 10px",
              position: "relative",
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} size="sm" color="white" />
          </NewButton>
        )}
        {/* Next */}
        {(expenses?.length > page * 6 ||
          (page === 1 && expenses?.length > 6)) && (
          <NewButton
            onClick={nextPage}
            style={{ padding: "5px 10px", position: "relative" }}
          >
            <FontAwesomeIcon icon={faChevronRight} size="sm" color="white" />
          </NewButton>
        )}
      </Flex>
    </Flex>
  );
};

Expenses.propTypes = {
  projectId: PropTypes.number,
  expenses: PropTypes.array,
  action: PropTypes.func,
};

export default Expenses;
