import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "../Input";

describe("InputField Component", () => {
  const mockRegister = jest.fn(() => ({
    name: "password",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  }));

  test("renders the input field with label", () => {
    render(
      <InputField
        label="Username"
        name="username"
        register={mockRegister()}
        placeholder="Enter your username"
      />
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your username/i)
    ).toBeInTheDocument();
  });

  test("renders error message when error is passed", () => {
    render(
      <InputField
        label="Email"
        name="email"
        register={mockRegister()}
        error="Email is required"
      />
    );

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    const inputElement = screen.getByLabelText(/email/i);
    expect(inputElement).toHaveClass("border-red-500");
  });

  test("calls the register function correctly", () => {
    render(
      <InputField label="Password" name="password" register={mockRegister()} />
    );

    const inputElement = screen.getByLabelText(/password/i);
    userEvent.type(inputElement, "mypassword");

    expect(mockRegister).toHaveBeenCalled();
  });

  test("supports different input types", () => {
    render(
      <InputField
        label="Password"
        name="password"
        type="password"
        register={mockRegister()}
      />
    );

    const inputElement = screen.getByLabelText(/password/i);
    expect(inputElement).toHaveAttribute("type", "password");
  });
});
