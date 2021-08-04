import ClientCard from "../ClientCard";
import { render, screen } from "@testing-library/react";

describe(ClientCard, () => {
  const client = {
    id: 1,
    name: "Test Client 1",
    email: "test1@email.com",
    contact: "John Doe",
    active: true,
    user_id: 1,
  };
  render(<ClientCard client={client} updateClients />);
  it("should render a card with the client details present", () => {
    expect(screen.getByText("Test Client 1")).toBeInTheDocument();
    expect(screen.getByText(/test1@email.com/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });
});
