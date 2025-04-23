
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import StaffList from "../StaffList";

describe("StaffList", () => {
  const mockStaff = [
    { id: "1", name: "John Doe", role: "Teacher", department: "Math" },
    { id: "2", name: "Jane Smith", role: "Counselor" },
  ];

  const mockOnSelect = vi.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("renders staff members", () => {
    render(
      <StaffList
        staffMembers={mockStaff}
        searchQuery=""
        onSelect={mockOnSelect}
        selectedStaffIds={[]}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters staff based on search query", () => {
    render(
      <StaffList
        staffMembers={mockStaff}
        searchQuery="counselor"
        onSelect={mockOnSelect}
        selectedStaffIds={[]}
      />
    );

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("excludes selected staff members", () => {
    render(
      <StaffList
        staffMembers={mockStaff}
        searchQuery=""
        onSelect={mockOnSelect}
        selectedStaffIds={["1"]}
      />
    );

    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("calls onSelect when staff member is clicked", () => {
    render(
      <StaffList
        staffMembers={mockStaff}
        searchQuery=""
        onSelect={mockOnSelect}
        selectedStaffIds={[]}
      />
    );

    fireEvent.click(screen.getByText("John Doe").closest("div")!);
    expect(mockOnSelect).toHaveBeenCalledWith(mockStaff[0]);
  });

  it("displays no results message when no staff found", () => {
    render(
      <StaffList
        staffMembers={mockStaff}
        searchQuery="nonexistent"
        onSelect={mockOnSelect}
        selectedStaffIds={[]}
      />
    );

    expect(screen.getByText("No staff members found")).toBeInTheDocument();
  });
});
