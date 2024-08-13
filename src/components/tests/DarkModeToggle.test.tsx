import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "../../context/ThemeContext";
import DarkModeToggle from "../DarkModeToggle";

jest.mock("../../context/ThemeContext", () => ({
  useTheme: jest.fn(),
}));

describe("DarkModeToggle Component", () => {
  const mockToggleDarkMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      darkMode: false,
      toggleDarkMode: mockToggleDarkMode,
    });
  });

  test("renders the moon icon when dark mode is off", () => {
    render(<DarkModeToggle />);

    const button = screen.getByLabelText("Toggle Dark Mode");
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("fa-moon")).toBeInTheDocument();
  });

  test("renders the sun icon when dark mode is on", () => {
    (useTheme as jest.Mock).mockReturnValue({
      darkMode: true,
      toggleDarkMode: mockToggleDarkMode,
    });

    render(<DarkModeToggle />);

    const button = screen.getByLabelText("Toggle Dark Mode");
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId("fa-sun")).toBeInTheDocument();
  });

  test("calls toggleDarkMode when button is clicked", async () => {
    render(<DarkModeToggle />);

    const button = screen.getByLabelText("Toggle Dark Mode");
    await userEvent.click(button);

    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
  });
});
