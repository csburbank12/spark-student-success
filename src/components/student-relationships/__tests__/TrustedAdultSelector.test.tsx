
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from 'vitest';
import TrustedAdultSelector from "../TrustedAdultSelector";
import { useTrustedAdults } from "@/hooks/trusted-adults/useTrustedAdults";

// Mock the useTrustedAdults hook
vi.mock("@/hooks/trusted-adults/useTrustedAdults", () => ({
  useTrustedAdults: vi.fn()
}));

describe("TrustedAdultSelector", () => {
  const mockTrustedAdults = [
    { 
      id: "ta1", 
      staff_id: "s1", 
      student_id: "st1", 
      staff_name: "John Doe",
      staff_role: "Teacher"
    }
  ];

  const mockUseTrustedAdults = {
    trustedAdults: mockTrustedAdults,
    isLoading: false,
    addTrustedAdult: vi.fn(),
    removeTrustedAdult: vi.fn(),
    refreshTrustedAdults: vi.fn()
  };

  beforeEach(() => {
    (useTrustedAdults as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockUseTrustedAdults);
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    (useTrustedAdults as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...mockUseTrustedAdults,
      isLoading: true
    });

    render(<TrustedAdultSelector studentId="st1" />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders staff search and list", () => {
    render(<TrustedAdultSelector studentId="st1" />);
    
    expect(screen.getByPlaceholderText("Search staff by name or role...")).toBeInTheDocument();
    expect(screen.getByText("Your trusted adults:")).toBeInTheDocument();
  });

  it("enforces maximum selections limit", () => {
    const manyTrustedAdults = Array(3).fill(null).map((_, i) => ({
      id: `ta${i}`,
      staff_id: `s${i}`,
      student_id: "st1",
      staff_name: `Staff ${i}`,
      staff_role: "Teacher"
    }));

    (useTrustedAdults as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      ...mockUseTrustedAdults,
      trustedAdults: manyTrustedAdults
    });

    render(<TrustedAdultSelector studentId="st1" maxSelections={3} />);
    
    expect(screen.queryByText("Select")).not.toBeInTheDocument();
  });
});
