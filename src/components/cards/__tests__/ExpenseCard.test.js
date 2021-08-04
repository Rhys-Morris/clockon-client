import ExpenseCard from "../ExpenseCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe(ExpenseCard, () => {
  const expense = {
    id: 1,
    name: "An expense",
    cost: 100.0,
    date: "2021-08-04",
  };

  const decimalCost = {
    id: 1,
    name: "An expense",
    cost: 100.55,
    date: "2021-08-04",
  };

  it("should render correctly when passed an expense prop", () => {
    render(<ExpenseCard expense={expense} />);
    expect(screen.getByText(/An expense/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getByText(/2021-08-04/)).toBeInTheDocument();
  });

  it("should render correctly when passed cost as a decimal", () => {
    render(<ExpenseCard expense={decimalCost} />);
    expect(screen.getByText(/100.55/)).toBeInTheDocument();
  });

  it("should render the popover when trigger is clicked", () => {
    render(<ExpenseCard expense={expense} />);
    const triggerPopover = screen.getByTestId("popover-trigger");
    expect(screen.queryByText(/Edit/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delete/)).not.toBeInTheDocument();
    userEvent.click(triggerPopover);
    expect(screen.getByText(/Edit/)).toBeInTheDocument();
    expect(screen.getByText(/Delete/)).toBeInTheDocument();
  });
});
