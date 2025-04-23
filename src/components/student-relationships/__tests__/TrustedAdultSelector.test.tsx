
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TrustedAdultSelector from "../TrustedAdultSelector";
import { useTrustedAdults } from "@/hooks/useTrustedAdults";

// Mock the useTrustedAdults hook
vi.mock("@/hooks/useTrustedAdults", () => ({
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

  const mockStaffMembers = [
    { id: "s1", name: "John Doe", role: "Teacher" },
    { id: "s2", name: "Jane Smith", role: "Counselor" }
  ];

  const mockUseTrustedAdults = {
    trustedAdults: mockTrustedAdults,
    isLoading: false,
    addTrustedAdult: vi.fn(),
    removeTrustedAdult: vi.fn(),
    refreshTrustedAdults: vi.fn()
  };

  beforeEach(() => {
    (useTrustedAdults as jest.Mock).mockReturnValue(mockUseTrustedAdults);
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    (useTrustedAdults as jest.Mock).mockReturnValue({
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

  it("filters staff list based on search", async () => {
    render(<TrustedAdultSelector studentId="st1" />);
    
    const searchInput = screen.getByPlaceholderText("Search staff by name or role...");
    fireEvent.change(searchInput, { target: { value: "counselor" } });

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("adds trusted adult when selecting staff", async () => {
    render(<TrustedAdultSelector studentId="st1" />);
    
    const staffMember = screen.getByText("Jane Smith").closest("div");
    fireEvent.click(staffMember!);

    expect(mockUseTrustedAdults.addTrustedAdult).toHaveBeenCalledWith("s2");
  });

  it("removes trusted adult when clicking remove button", () => {
    render(<TrustedAdultSelector studentId="st1" />);
    
    const removeButton = screen.getAllByRole("button")[0];
    fireEvent.click(removeButton);

    expect(mockUseTrustedAdults.removeTrustedAdult).toHaveBeenCalledWith("ta1");
  });

  it("enforces maximum selections limit", () => {
    const manyTrustedAdults = Array(3).fill(null).map((_, i) => ({
      id: `ta${i}`,
      staff_id: `s${i}`,
      student_id: "st1",
      staff_name: `Staff ${i}`,
      staff_role: "Teacher"
    }));

    (useTrustedAdults as jest.Mock).mockReturnValue({
      ...mockUseTrustedAdults,
      trustedAdults: manyTrustedAdults
    });

    render(<TrustedAdultSelector studentId="st1" maxSelections={3} />);
    
    expect(screen.queryByText("Select")).not.toBeInTheDocument();
  });
});
