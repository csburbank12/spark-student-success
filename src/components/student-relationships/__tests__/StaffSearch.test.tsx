
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import StaffSearch from "../StaffSearch";

describe("StaffSearch", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders search input", () => {
    render(<StaffSearch value="" onChange={mockOnChange} />);
    expect(screen.getByPlaceholderText("Search staff by name or role...")).toBeInTheDocument();
  });

  it("calls onChange handler when input value changes", () => {
    render(<StaffSearch value="" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText("Search staff by name or role...");
    
    fireEvent.change(input, { target: { value: "teacher" } });
    expect(mockOnChange).toHaveBeenCalledWith("teacher");
  });

  it("displays current value in input", () => {
    render(<StaffSearch value="test value" onChange={mockOnChange} />);
    const input = screen.getByPlaceholderText("Search staff by name or role...") as HTMLInputElement;
    expect(input.value).toBe("test value");
  });
});
