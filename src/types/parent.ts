
export interface Assignment {
  id: string | number;
  title: string;
  dueDate?: string;
  due_date?: string; // For compatibility with API responses
  status: string;
  subject: string;
  priority: string;
  type: string;
}

export interface Event {
  id: string | number;
  title: string;
  date: string;
  location?: string;
  type: string;
}
