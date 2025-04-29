
export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: "completed" | "in-progress" | "not-started" | "overdue";
  subject: string;
  priority: string;
  type: string;
}
