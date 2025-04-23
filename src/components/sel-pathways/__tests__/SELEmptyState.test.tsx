
import { render, screen } from "@testing-library/react";
import { SELEmptyState } from "../SELEmptyState";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe("SELEmptyState", () => {
  it("renders empty state message and explore button", () => {
    render(
      <MemoryRouter>
        <SELEmptyState />
      </MemoryRouter>
    );
    
    expect(screen.getByText("No SEL Recommendations")).toBeInTheDocument();
    expect(screen.getByText(/Check back after completing more check-ins/i)).toBeInTheDocument();
    
    const exploreButton = screen.getByRole("button", { name: /explore sel pathways/i });
    expect(exploreButton).toBeInTheDocument();
    
    exploreButton.click();
    expect(mockNavigate).toHaveBeenCalledWith("/sel-pathways");
  });
});
