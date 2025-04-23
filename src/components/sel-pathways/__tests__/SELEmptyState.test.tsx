
import { render, screen } from "@testing-library/react";
import { SELEmptyState } from "../SELEmptyState";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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
    
    // Test navigation on button click
    exploreButton.click();
    expect(mockNavigate).toHaveBeenCalledWith("/sel-pathways");
  });
});
