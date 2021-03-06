import React from "react";
import {
  Flex,
  Text,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import ConfirmDestroyModal from "../modals/ConfirmDestroyModal";
import PopoverContentButton from "../styled/PopoverContentButton";
import applicationColors from "../../style/colors";
import { destroyExpense } from "../../data/api";
import BaseEditModal from "../modals/BaseEditModal";
import PropTypes from "prop-types";
import ReceiptUpload from "../modals/ReceiptUpload";
import OpenImage from "../modals/OpenImage";
import CurrencyContext from "../../contexts/currencyContext";

const popoverButtonStyle = {
  background: applicationColors.LIGHT_BLUE,
  padding: "2px 4px",
  borderadius: "7px",
  opacity: "0.7",
  margin: "1px 0",
  fontSize: "14px",
  "&:hover": {
    background: applicationColors.SOFT_LIGHT_BLUE,
  },
};

const ExpenseCard = ({ expense, updateExpensesForProject }) => {
  // ----- POPOVER STATE -----
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const { name, date, cost } = expense;
  const { currency } = React.useContext(CurrencyContext);

  // ----- DESTROY TASK -----
  const destroy = () => {
    destroyExpense(expense.project_id, expense.id)
      .then((data) => {
        if (data.expenses) updateExpensesForProject(data.expenses);
        if (data.error) console.warn(data.error);
      })
      .catch((e) => console.warn(e));
  };

  return (
    <Flex
      align="center"
      color="gray.600"
      fontWeight="bold"
      borderBottom="1px solid rgba(0, 0,0, .2)"
      p="10px 20px"
      data-cy="expense-card"
    >
      <Text fontSize="sm" flex="2" data-cy="expense-name">
        {name}
      </Text>
      <Text fontSize="sm" flex="1.25" textAlign="center" data-cy="expense-date">
        {date}
      </Text>
      <Text fontSize="sm" flex="1.25" textAlign="center" data-cy="expense-cost">
        {currency[currency.length - 1]}
        {cost}
      </Text>
      {expense?.receipt_url ? (
        <OpenImage
          image={expense.receipt_url}
          expense={expense}
          updateExpensesForProject={updateExpensesForProject}
        />
      ) : (
        <ReceiptUpload
          expense={expense}
          updateExpensesForProject={updateExpensesForProject}
        />
      )}

      {/* POPOVER */}
      <Popover isLazy placement="left" isOpen={isOpen}>
        <PopoverTrigger>
          <div onClick={toggleOpen} data-testid="popover-trigger">
            <FontAwesomeIcon
              data-cy="open-popover"
              icon={faEllipsisV}
              color="gray"
              size="1x"
              style={{ cursor: "pointer" }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent w="100px">
          <PopoverArrow />
          <PopoverBody p="3px">
            <Flex direction="column">
              <BaseEditModal
                buttonStyle={popoverButtonStyle}
                type={"Expense"}
                action={updateExpensesForProject}
                entity={expense}
                closePopover={close}
              />
              <ConfirmDestroyModal
                trigger={
                  <PopoverContentButton
                    data-cy="trigger-destroy"
                    color={applicationColors.ERROR_COLOR}
                    hoverColor={applicationColors.ERROR_COLOR}
                    style={{ width: "100%" }}
                  >
                    Delete
                  </PopoverContentButton>
                }
                action={() => {
                  destroy();
                  close();
                }}
                closePopover={close}
              />
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

ExpenseCard.propTypes = {
  expense: PropTypes.object,
  updateExpensesForProject: PropTypes.func,
};

export default ExpenseCard;
