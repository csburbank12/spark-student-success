import { render, screen, fireEvent } from "@testing-library/react";
import { SELRecommendationsGrid } from "../SELRecommendationsGrid";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import "@testing-library/jest-dom";

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const mockLessons = [
  {
    id: "1",
    title: "Test Lesson 1",
    description: "Test Description 1",
    competency_area: "Self-Awareness",
    estimated_duration: 10,
    activity_type: "video"
  },
  {
    id: "2",
    title: "Test Lesson 2",
    description: "Test Description 2",
    competency_area: "Self-Management",
    estimated_duration: 15,
    activity_type: "reflection"
  }
];

const mockOnSelectLesson = vi.fn();

describe("SELRecommendationsGrid", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders recommendations grid with lessons", () => {
    render(
      <MemoryRouter>
        <SELRecommendationsGrid 
          lessons={mockLessons} 
          onSelectLesson={mockOnSelectLesson} 
        />
      </MemoryRouter>
    );
    
    expect(screen.getByText("Recommended For You")).toBeInTheDocument();
    
    mockLessons.forEach(lesson => {
      expect(screen.getByText(lesson.title)).toBeInTheDocument();
      expect(screen.getByText(`${lesson.estimated_duration} min activity`)).toBeInTheDocument();
      expect(screen.getByText(lesson.competency_area)).toBeInTheDocument();
    });
    
    const startButtons = screen.getAllByText("Start Now");
    fireEvent.click(startButtons[0]);
    expect(mockOnSelectLesson).toHaveBeenCalledWith(mockLessons[0]);
    
    const viewAllButton = screen.getByText("View All");
    fireEvent.click(viewAllButton);
    expect(mockNavigate).toHaveBeenCalledWith("/sel-pathways");
  });

  it("limits displayed lessons to 3", () => {
    const manyLessons = [
      ...mockLessons,
      {
        id: "3",
        title: "Test Lesson 3",
        description: "Test Description 3",
        competency_area: "Social Awareness",
        estimated_duration: 20,
        activity_type: "worksheet"
      },
      {
        id: "4",
        title: "Test Lesson 4",
        description: "Test Description 4",
        competency_area: "Relationship Skills",
        estimated_duration: 25,
        activity_type: "video"
      }
    ];

    render(
      <MemoryRouter>
        <SELRecommendationsGrid 
          lessons={manyLessons} 
          onSelectLesson={mockOnSelectLesson} 
        />
      </MemoryRouter>
    );

    const lessonCards = screen.getAllByRole("article");
    expect(lessonCards).toHaveLength(3);
  });
});
