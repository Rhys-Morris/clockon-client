import WorkPeriodCard from "../WorkPeriodCard";
import { screen, render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe(WorkPeriodCard, () => {
  const workPeriod = {
    title: "Test Title",
    project: "Test Project",
    end_time: 1628237243571,
    start_time: 1628233643571,
  };

  it("should render correctly", () => {
    render(
      <Router history={createMemoryHistory()}>
        <WorkPeriodCard workPeriod={workPeriod} />
      </Router>
    );
    expect(screen.getByText(/Test Title/)).toBeInTheDocument();
    expect(screen.getByText(/Test Project/)).toBeInTheDocument();
    expect(screen.getByText(/1 hr/)).toBeInTheDocument();
  });
});
