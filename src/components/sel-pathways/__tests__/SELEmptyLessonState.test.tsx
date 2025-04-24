
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SELEmptyLessonState } from "../SELEmptyLessonState";
import "@testing-library/jest-dom";

describe("SELEmptyLessonState", () => {
  it("renders empty state message with 'Add First Lesson' button when no lessons exist", () => {
    render(
      <MemoryRouter>
        <SELEmptyLessonState hasLessons={false} searchActive={false} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/No lessons found/i)).toBeInTheDocument();
    expect(screen.getByText(/Add your first SEL lesson/i)).toBeInTheDocument();
    expect(screen.getByText(/Add First Lesson/i)).toBeInTheDocument();
  });

  it("renders search message when lessons exist but no results", () => {
    render(
      <MemoryRouter>
        <SELEmptyLessonState hasLessons={true} searchActive={true} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/No lessons found/i)).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your search criteria/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add First Lesson/i)).not.toBeInTheDocument();
  });
});
