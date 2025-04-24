
export const getRandomErrorMessage = (category: string, test: string) => {
  const errors = {
    "Authentication": [
      "Session token expired unexpectedly",
      "Role validation failed for admin access",
      "User profile data incomplete after login"
    ],
    "Navigation": [
      "Link destination not found (404)",
      "Breadcrumb path inconsistent with current location",
      "Navigation state lost on refresh"
    ],
    "User Interface": [
      "Modal fails to close on mobile devices",
      "Form validation errors not displayed properly",
      "Responsive layout breaks at 768px width"
    ],
    "Data Operations": [
      "Timeout while fetching data from Supabase",
      "Optimistic update failed to reconcile with server state",
      "Filter operation returned incomplete results"
    ],
    "Features": [
      "SEL pathway progress tracking inconsistent",
      "Dashboard chart fails to render with certain data sets",
      "Intervention tools unavailable for certain user roles"
    ]
  };
  
  const categoryErrors = errors[category as keyof typeof errors] || 
    ["Unexpected error occurred during test execution"];
  
  return `${test}: ${categoryErrors[Math.floor(Math.random() * categoryErrors.length)]}`;
};

