import Register from "../Register";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/dom";
import { register } from "../../data/api";

jest.mock("../../data/api");

describe(Register, () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <Router history={createMemoryHistory()}>
        <Register />
      </Router>
    );
  });

  it("should render correctly", () => {
    expect(screen.getByText(/Get Started/)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should have controlled input", () => {
    const text = "Change";
    userEvent.type(screen.getByLabelText(/First Name:/), text);
    expect(screen.getByLabelText(/First Name:/).value).toBe(text);
    userEvent.type(screen.getByLabelText(/Email:/), text);
    expect(screen.getByLabelText(/Email:/).value).toBe(text);
    userEvent.type(screen.getByLabelText(/Password:/), text);
    expect(screen.getByLabelText(/Password:/).value).toBe(text);
  });

  it("should call register on form submission", () => {
    register.mockReturnValue(Promise.resolve({ token: "secret" }));
    fireEvent.submit(screen.getByTestId("form"));
    expect(register).toHaveBeenCalledTimes(1);
  });
});
