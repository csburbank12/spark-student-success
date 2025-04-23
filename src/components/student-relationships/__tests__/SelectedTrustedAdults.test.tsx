
import { render, screen, fireEvent } from "@testing-library/react";
import SelectedTrustedAdults from "../SelectedTrustedAdults";

describe("SelectedTrustedAdults", () => {
  const mockTrustedAdults = [
    { 
      id: "ta1", 
      staff_id: "s1", 
      student_id: "st1", 
      staff_name: "John Doe",
      staff_role: "Teacher",
      avatarUrl: "https://example.com/avatar.jpg"
    },
    { 
      id: "ta2", 
      staff_id: "s2", 
      student_id: "st1", 
      staff_name: "Jane Smith",
      staff_role: "Counselor"
    }
  ];

  const mockOnRemove = vi.fn();

  beforeEach(() => {
    mockOnRemove.mockClear();
  });

  it("renders nothing when no trusted adults", () => {
    const { container } = render(
      <SelectedTrustedAdults trustedAdults={[]} onRemove={mockOnRemove} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders trusted adults list", () => {
    render(
      <SelectedTrustedAdults trustedAdults={mockTrustedAdults} onRemove={mockOnRemove} />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("displays avatar image when available", () => {
    render(
      <SelectedTrustedAdults trustedAdults={mockTrustedAdults} onRemove={mockOnRemove} />
    );

    const avatar = screen.getByRole("img") as HTMLImageElement;
    expect(avatar.src).toBe("https://example.com/avatar.jpg");
  });

  it("displays avatar fallback when no image available", () => {
    render(
      <SelectedTrustedAdults trustedAdults={mockTrustedAdults} onRemove={mockOnRemove} />
    );

    expect(screen.getByText("JA")).toBeInTheDocument(); // Jane Smith initials
  });

  it("calls onRemove when remove button is clicked", () => {
    render(
      <SelectedTrustedAdults trustedAdults={mockTrustedAdults} onRemove={mockOnRemove} />
    );

    const removeButtons = screen.getAllByRole("button");
    fireEvent.click(removeButtons[0]);

    expect(mockOnRemove).toHaveBeenCalledWith("s1");
  });
});
