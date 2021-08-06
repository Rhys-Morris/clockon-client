import ProjectCard from "../ProjectCard";
import { screen, render } from "@testing-library/react";

describe(ProjectCard, () => {
  const project = {
    name: "Test Project",
    billable: true,
    client: "Test Client",
    due_date: "2022-10-10",
  };
  it("should render correctly", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText(/Test Project/)).toBeInTheDocument();
    expect(screen.getByText(/Test Client/)).toBeInTheDocument();
    expect(screen.getByText(/2022-10-10/)).toBeInTheDocument();
    expect(screen.getByTestId("billable-icon")).toBeInTheDocument();
  });
});
