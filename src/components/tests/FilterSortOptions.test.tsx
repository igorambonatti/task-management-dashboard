import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTaskContext } from "../../context/TaskContext";
import FilterSortOptions from "../FilterSortOptions";

jest.mock("../../context/TaskContext", () => ({
  useTaskContext: jest.fn(),
}));

describe("FilterSortOptions Component", () => {
  const mockSortTasks = jest.fn();
  const mockFilterTasks = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTaskContext as jest.Mock).mockReturnValue({
      sortTasks: mockSortTasks,
      filterTasks: mockFilterTasks,
    });
  });

  test("renders the buttons and select input", () => {
    render(<FilterSortOptions />);

    expect(screen.getByText(/sort by date \(asc\)/i)).toBeInTheDocument();
    expect(screen.getByText(/sort by date \(desc\)/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("calls sortTasks with 'asc' when Sort by Date (Asc) is clicked", async () => {
    render(<FilterSortOptions />);

    const ascButton = screen.getByText(/sort by date \(asc\)/i);
    await userEvent.click(ascButton);

    expect(mockSortTasks).toHaveBeenCalledWith("asc");
    expect(mockSortTasks).toHaveBeenCalledTimes(1);
  });

  test("calls sortTasks with 'desc' when Sort by Date (Desc) is clicked", async () => {
    render(<FilterSortOptions />);

    const descButton = screen.getByText(/sort by date \(desc\)/i);
    await userEvent.click(descButton);

    expect(mockSortTasks).toHaveBeenCalledWith("desc");
    expect(mockSortTasks).toHaveBeenCalledTimes(1);
  });

  test("calls filterTasks with the selected priority", async () => {
    render(<FilterSortOptions />);

    const selectElement = screen.getByRole("combobox");

    await userEvent.selectOptions(selectElement, "High");
    expect(mockFilterTasks).toHaveBeenCalledWith("High");

    await userEvent.selectOptions(selectElement, "Medium");
    expect(mockFilterTasks).toHaveBeenCalledWith("Medium");

    await userEvent.selectOptions(selectElement, "Low");
    expect(mockFilterTasks).toHaveBeenCalledWith("Low");

    await userEvent.selectOptions(selectElement, "All");
    expect(mockFilterTasks).toHaveBeenCalledWith("All");
  });
});
