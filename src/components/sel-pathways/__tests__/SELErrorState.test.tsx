
import { render, screen, fireEvent } from "@testing-library/react";
import { SELErrorState } from "../SELErrorState";
import { vi } from "vitest";

describe("SELErrorState", () => {
  const originalLocation = window.location;
  
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: vi.fn() }
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', { value: originalLocation });
  });

  it("renders error message and retry button", () => {
    render(<SELErrorState />);
    
    expect(screen.getByText("Unable to Load Recommendations")).toBeInTheDocument();
    expect(screen.getByText(/There was a problem loading your SEL recommendations/i)).toBeInTheDocument();
    
    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
    
    fireEvent.click(retryButton);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
