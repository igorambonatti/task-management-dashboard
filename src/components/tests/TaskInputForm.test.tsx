import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useTaskContext } from "../../context/TaskContext";
import TaskInputForm from "../TaskInputForm";

jest.mock("../../context/TaskContext", () => ({
  useTaskContext: jest.fn(),
}));

describe("TaskInputForm Component", () => {
  const mockAddTask = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTaskContext as jest.Mock).mockReturnValue({
      addTask: mockAddTask,
    });
  });

  test("renders the form when isOpen is true", () => {
    render(<TaskInputForm isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
  });

  test("does not render the form when isOpen is false", () => {
    render(<TaskInputForm isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByLabelText(/title/i)).not.toBeInTheDocument();
  });
});
