
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SELLessonsTable } from "../SELLessonsTable";
import { vi } from "vitest";
import "@testing-library/jest-dom";

const mockLessons = [
  {
    id: "1",
    title: "Emotional Intelligence",
    competency_area: "Self-Awareness",
    estimated_duration: 15,
    activity_type: "Reflection",
  },
  {
    id: "2", 
    title: "Stress Management",
    competency_area: "Self-Management",
    estimated_duration: 20,
    activity_type: "Workshop",
  }
];

describe("SELLessonsTable", () => {
  const mockOnDeleteLesson = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders lessons correctly", () => {
    render(
      <MemoryRouter>
        <SELLessonsTable 
          lessons={mockLessons} 
          onDeleteLesson={mockOnDeleteLesson} 
        />
      </MemoryRouter>
    );
    
    mockLessons.forEach(lesson => {
      expect(screen.getByText(lesson.title)).toBeInTheDocument();
      expect(screen.getByText(lesson.competency_area)).toBeInTheDocument();
      expect(screen.getByText(`${lesson.estimated_duration} minutes`)).toBeInTheDocument();
      expect(screen.getByText(lesson.activity_type)).toBeInTheDocument();
    });
  });

  it("calls delete function when delete button is clicked", () => {
    render(
      <MemoryRouter>
        <SELLessonsTable 
          lessons={mockLessons} 
          onDeleteLesson={mockOnDeleteLesson} 
        />
      </MemoryRouter>
    );
    
    const deleteButtons = screen.getAllByRole("button", { name: /trash2/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(mockOnDeleteLesson).toHaveBeenCalledWith(mockLessons[0].id);
  });
});
