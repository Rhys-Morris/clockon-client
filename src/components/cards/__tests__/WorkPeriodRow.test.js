import WorkPeriodRow from "../WorkPeriodRow";
import { screen, render } from "@testing-library/react";

describe(WorkPeriodRow, () => {
  const workPeriod = {
    title: "Title",
    end_time: 1628237243571,
    start_time: 1628233643571,
  };
  it("should render correctly", () => {
    render(<WorkPeriodRow workPeriod={workPeriod} />);
    expect(screen.getByText(/Title/)).toBeInTheDocument();
    expect(screen.getByText(/2021-08-06:/)).toBeInTheDocument();
    expect(screen.getByText(/01:00:00/)).toBeInTheDocument();
  });
});
