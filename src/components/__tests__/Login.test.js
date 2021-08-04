import Login from "../Login";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

describe(Login, () => {
  beforeEach(() => {
    render(
      <Router history={createMemoryHistory()}>
        <Login />
      </Router>
    );
  });
  it("should render correctly", () => {
    expect(screen.getByLabelText(/Email:/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("should have controlled input", () => {
    const text = "Change";
    userEvent.type(screen.getByLabelText(/Email:/), text);
    expect(screen.getByLabelText(/Email:/).value).toBe(text);
    userEvent.type(screen.getByLabelText(/Password:/), text);
    expect(screen.getByLabelText(/Password:/).value).toBe(text);
  });
});
