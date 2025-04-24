
export type TestResult = {
  name: string;
  status: 'passed' | 'failed' | 'pending' | 'skipped';
  message?: string;
};

export type CategoryResult = {
  name: string;
  tests: TestResult[];
  status: 'passed' | 'failed' | 'pending' | 'partial';
};

export type TestCategory = {
  name: string;
  tests: string[];
};

