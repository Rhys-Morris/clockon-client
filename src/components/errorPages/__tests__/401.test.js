import Unauthorised from "../401";
import { render } from "@testing-library/react";

describe(Unauthorised, () => {
  const { getByText } = render(<Unauthorised />);
  it("should have a 401 Unauthorised heading", () => {
    expect(getByText("401 Unauthorised")).toBeInTheDocument();
  });
});
