import NoContent from "../404";
import { render } from "@testing-library/react";

describe(NoContent, () => {
  const { getByText } = render(<NoContent />);
  it("should have a 404 No Content heading", () => {
    expect(getByText("404 No Content")).toBeInTheDocument();
  });
});
