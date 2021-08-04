import { render, screen } from "@testing-library/react";
import ClientForm from "../ClientForm";
import userEvent from "@testing-library/user-event";

describe(ClientForm, () => {
  it("should render correctly", () => {
    render(<ClientForm type="New" />);
    expect(screen.getByLabelText(/Client Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact/)).toBeInTheDocument();
    expect(screen.getByText(/New Client/)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("changing the type prop alters New Client to Edit Client", () => {
    render(<ClientForm type="Edit" />);
    expect(screen.getByText(/Edit Client/)).toBeInTheDocument();
  });

  describe("Controlled form updates", () => {
    beforeEach(() => render(<ClientForm type="New" />));

    it("should update value of client name when user types", () => {
      const clientNameInput = screen.getByLabelText(/Client Name/);
      const text = "Change Client";
      userEvent.type(clientNameInput, text);
      expect(clientNameInput.value).toEqual(text);
    });

    it("should update value of email when user types", () => {
      const emailInput = screen.getByLabelText(/Email/);
      const text = "Change Email";
      userEvent.type(emailInput, text);
      expect(emailInput.value).toEqual(text);
    });

    it("should update value of contact when user types", () => {
      const contactInput = screen.getByLabelText(/Contact/);
      const text = "Change Contact";
      userEvent.type(contactInput, text);
      expect(contactInput.value).toEqual(text);
    });
  });

  it("should fire the onSubmit event when the button is clicked", () => {
    render(<ClientForm type="New" />);
  });
});
