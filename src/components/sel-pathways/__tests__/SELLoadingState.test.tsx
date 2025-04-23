
import { render, screen } from "@testing-library/react";
import { SELLoadingState } from "../SELLoadingState";

describe("SELLoadingState", () => {
  it("renders loading skeletons", () => {
    render(<SELLoadingState />);
    
    // Check for skeleton elements
    const skeletons = screen.getAllByRole("progressbar");
    expect(skeletons).toHaveLength(4); // 1 for title, 1 for button, and 3 for cards
    
    // Check layout structure
    const container = screen.getByTestId("sel-loading");
    expect(container).toHaveClass("space-y-4");
  });
});
