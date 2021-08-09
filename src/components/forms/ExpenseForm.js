import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import { createExpense, updateExpense } from "../../data/api";
import { inputFormattedToday } from "../../helpers/date";
import applicationColors from "../../style/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ExpenseForm = ({
  action,
  onClose,
  type,
  expense,
  projectId,
  closePopover,
}) => {
  const [name, setName] = React.useState(expense?.name || "");
  const [date, setDate] = React.useState(
    expense?.date || inputFormattedToday()
  );
  const [cost, setCost] = React.useState(expense?.cost || "");
  const [error, setError] = React.useState(null);

  const create = (expense) => {
    createExpense(expense)
      .then((data) => {
        if (data.expenses) {
          action(data.expenses);
          onClose();
        }
        if (data.error) {
          setError(data.error[0]);
          setTimeout(() => setError(null), 5000);
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const update = (expense) => {
    updateExpense(expense)
      .then((data) => {
        if (data.expenses) {
          action(data.expenses);
          onClose();
          closePopover();
        }
        if (data.error) {
          setError(data.error[0]);
          setTimeout(() => setError(null), 5000);
        }
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const validate = () => {
    if (name.length > 40) {
      setError("Expense name must be < 40 characters");
      return false;
    }
    if (cost <= 0) {
      setError("Cost must be greater than 0");
      return false;
    }
    if (cost > 10000) {
      setError("Cost must be less than 10000.0");
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const expenseDetails = {
      name,
      date,
      cost: Number.parseFloat(cost).toFixed(2), // Ensure to 2 decimal places
    };
    if (type === "Create") {
      create({ ...expenseDetails, project_id: projectId });
    } else if (type === "Edit") {
      update({
        ...expenseDetails,
        project_id: expense.project_id,
        id: expense.id,
      });
    }
  };

  return (
    <form onSubmit={submitForm}>
      <FormControl isRequired>
        <FormLabel fontSize="sm" casing="uppercase">
          Name of expense
        </FormLabel>
        <Input
          data-cy="expense-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="A new expense"
        ></Input>
      </FormControl>
      <FormControl m="15px 0 " isRequired>
        <FormLabel fontSize="sm" m="0">
          Date
        </FormLabel>
        <Input
          data-cy="expense-date"
          type="date"
          mt="5px"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <FormControl mt="10px" isRequired>
        <FormLabel fontSize="sm" casing="uppercase">
          Cost of expense (in{" "}
          <FontAwesomeIcon icon={faDollarSign} color="gray" />)
        </FormLabel>
        <Input
          data-cy="cost"
          placeholder="20"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          style={{ width: "50%" }}
          type="number"
        ></Input>
      </FormControl>
      {error && (
        <Text
          data-cy="expense-error"
          fontSize="sm"
          color={applicationColors.ERROR_COLOR}
          m="10px 0"
        >
          {error}
        </Text>
      )}
      <Center mt="15px">
        <Button type="submit" data-cy="submit">
          {type} Expense
        </Button>
      </Center>
    </form>
  );
};

ExpenseForm.propTypes = {
  action: PropTypes.func,
  onClose: PropTypes.func,
  type: PropTypes.string,
  expense: PropTypes.object,
  projectId: PropTypes.number,
  closePopover: PropTypes.func,
};

export default ExpenseForm;
