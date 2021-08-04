import ClientCard from "../ClientCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { destroyClient, updateClient } from "../../../data/api";

jest.mock("../../../data/api");

describe(ClientCard, () => {
  const client = {
    id: 1,
    name: "Test Client 1",
    email: "test1@email.com",
    contact: "John Doe",
    active: true,
    user_id: 1,
  };

  it("should render a card with the client details present", () => {
    render(<ClientCard client={client} />);
    expect(screen.getByText("Test Client 1")).toBeInTheDocument();
    expect(screen.getByText(/test1@email.com/)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  describe("popover UI", () => {
    beforeEach(() => render(<ClientCard client={client} />));

    it("should render the popover when the trigger is clicked", () => {
      const popoverTrigger = screen.getByTestId("popover-trigger");
      userEvent.click(popoverTrigger);
      expect(screen.getByTestId("edit-button")).toBeInTheDocument();
      expect(screen.getByText(/Edit/)).toBeInTheDocument();
      expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });

    it("should close the popover when the trigger is clicked again", () => {
      const popoverTrigger = screen.getByTestId("popover-trigger");
      userEvent.click(popoverTrigger);
      expect(screen.getByTestId("edit-button")).toBeInTheDocument();
      userEvent.click(popoverTrigger);
      expect(screen.queryByTestId("edit-button")).not.toBeInTheDocument();
    });

    it("should open a confirmation modal when delete is clicked", () => {
      const popoverTrigger = screen.getByTestId("popover-trigger");
      userEvent.click(popoverTrigger);
      const deleteButton = screen.getByTestId("delete-button");
      userEvent.click(deleteButton);
      expect(screen.getByTestId("destroy-modal")).toBeInTheDocument();
    });

    describe("edit mode", () => {
      beforeEach(() => {
        const popoverTrigger = screen.getByTestId("popover-trigger");
        userEvent.click(popoverTrigger);
        const editButton = screen.getByTestId("edit-button");
        userEvent.click(editButton);
      });

      it("should switch the edit button to confirm when clicked", () => {
        expect(screen.getByText(/Confirm/)).toBeInTheDocument();
      });

      it("should render input elements when in edit mode", () => {
        expect(screen.getByLabelText(/Name:/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contact:/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/)).toBeInTheDocument();
      });

      // TO FIX
      it("should call updateClient when confirm is clicked", () => {
        const editButton = screen.getByTestId("edit-button");
        // userEvent.click(editButton);
      });

      describe("controlled form updates", () => {
        it("should update name", () => {
          const text = " Extra";
          const nameInput = screen.getByLabelText(/Name:/);
          const emailInput = screen.getByLabelText(/Email:/);
          const contactInput = screen.getByLabelText(/Contact:/);
          userEvent.type(emailInput, text);
          expect(emailInput.value).toBe("test1@email.com Extra");
          userEvent.type(nameInput, text);
          expect(nameInput.value).toBe("Test Client 1 Extra");
          userEvent.type(contactInput, text);
          expect(contactInput.value).toBe("John Doe Extra");
        });
      });
    });
  });
});
