
/**
 * Generates a unique school code based on the school name
 * @param schoolName The name of the school
 * @returns A unique school code
 */
export const generateSchoolCode = (schoolName: string): string => {
  // Get first letters of each word in school name
  const initials = schoolName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();
  
  // Add a random 3-digit number
  const randomNum = Math.floor(Math.random() * 900 + 100);
  
  return `${initials}${randomNum}`;
};

/**
 * Formats a school address object into a single string
 * @param address The school address object
 * @returns A formatted address string
 */
export const formatAddress = (address: { street?: string; city?: string; state?: string; zip?: string; } | undefined): string => {
  if (!address) return "No address provided";
  
  const { street, city, state, zip } = address;
  
  const parts = [
    street,
    [city, state].filter(Boolean).join(", "),
    zip
  ].filter(Boolean);
  
  return parts.join(", ");
};

/**
 * Calculates the completion rate as a percentage
 * @param completed The number of completed items
 * @param total The total number of items
 * @returns A formatted percentage string
 */
export const calculateCompletionRate = (completed: number, total: number): string => {
  if (total === 0) return "0%";
  const rate = (completed / total) * 100;
  return `${rate.toFixed(1)}%`;
};

/**
 * Maps a numeric mood average to a descriptive text
 * @param moodAverage The average mood score (1-5)
 * @returns A descriptive text of the mood average
 */
export const getMoodDescription = (moodAverage: number): string => {
  if (moodAverage >= 4.5) return "Excellent";
  if (moodAverage >= 3.5) return "Good";
  if (moodAverage >= 2.5) return "Average";
  if (moodAverage >= 1.5) return "Concerning";
  return "Critical";
};

/**
 * Gets the style class for a mood average
 * @param moodAverage The average mood score (1-5)
 * @returns A tailwind class string for styling
 */
export const getMoodClass = (moodAverage: number): string => {
  if (moodAverage >= 4.5) return "text-green-600";
  if (moodAverage >= 3.5) return "text-green-500";
  if (moodAverage >= 2.5) return "text-yellow-500";
  if (moodAverage >= 1.5) return "text-orange-500";
  return "text-red-500";
};

/**
 * Processes CSV data for bulk school import
 * @param csvData The raw CSV data string
 * @returns An array of school objects
 */
export const processCsvImport = (csvData: string): any[] => {
  // This would need proper CSV parsing in a real implementation
  // For now, we'll return an empty array
  return [];
};
