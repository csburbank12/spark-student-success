
export interface RouteCheckResult {
  route: string;
  exists: boolean;
  status?: number;
  error?: string;
}

export interface ComponentCheckResult {
  componentName: string;
  exists: boolean;
  error?: string;
}
