
export type ToolkitItem = {
  id: string;
  student_id: string;
  item_type: string;
  item_label: string;
  item_url?: string;
  item_content?: string;
  added_on: string;
};

export type ToolkitError = {
  message: string;
  code?: string;
};

export type ToolkitResponse = {
  data: ToolkitItem[] | null;
  error: ToolkitError | null;
};
