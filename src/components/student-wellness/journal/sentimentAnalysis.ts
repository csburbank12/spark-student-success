
// This is a basic sentiment analysis function for demonstration purposes
// In a real implementation, you'd use a more sophisticated algorithm or API

interface SentimentResult {
  score: number;
  label: "positive" | "neutral" | "negative" | "concerning";
  flagged: boolean;
}

const crisisKeywords = [
  "suicide", "kill myself", "want to die", "end my life", "harm myself", 
  "hurt myself", "self harm", "cutting myself", "don't want to live",
  "no reason to live", "better off dead"
];

export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
  // Convert text to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  
  // Check for crisis keywords first
  for (const keyword of crisisKeywords) {
    if (lowerText.includes(keyword)) {
      return {
        score: -0.9,
        label: "concerning",
        flagged: true
      };
    }
  }
  
  // This is a simple rule-based sentiment analysis
  // In a real app, you would use a proper sentiment analysis API or ML model
  
  // Define positive and negative word lists
  const positiveWords = [
    "happy", "glad", "joy", "excited", "great", "wonderful", "amazing", 
    "good", "love", "awesome", "excellent", "fantastic", "positive", "hopeful",
    "grateful", "thankful", "blessed", "peaceful", "relaxed", "proud", "confident"
  ];
  
  const negativeWords = [
    "sad", "upset", "angry", "mad", "frustrated", "annoyed", "depressed",
    "anxious", "worried", "scared", "afraid", "stressed", "overwhelmed",
    "tired", "exhausted", "disappointed", "hurt", "pain", "lonely", "alone"
  ];
  
  // Count word occurrences
  let positiveCount = 0;
  let negativeCount = 0;
  
  // Simple word tokenization and counting
  const words = lowerText.split(/\W+/);
  
  for (const word of words) {
    if (positiveWords.includes(word)) {
      positiveCount++;
    } else if (negativeWords.includes(word)) {
      negativeCount++;
    }
  }
  
  // Calculate score between -1 and 1
  let score: number;
  if (positiveCount === 0 && negativeCount === 0) {
    score = 0;
  } else {
    score = (positiveCount - negativeCount) / (positiveCount + negativeCount);
    // Clamp between -1 and 1
    score = Math.max(-1, Math.min(1, score));
  }
  
  // Determine sentiment label
  let label: "positive" | "neutral" | "negative" | "concerning";
  let flagged = false;
  
  if (score > 0.25) {
    label = "positive";
  } else if (score < -0.25) {
    // Further check for concerning content
    if (score < -0.6 && negativeCount > 3) {
      const concerningPhrases = [
        "feel hopeless", "don't know what to do", "can't take it", 
        "nobody cares", "no one understands", "always alone", "never good enough",
        "hate myself", "worthless", "failure", "giving up"
      ];
      
      for (const phrase of concerningPhrases) {
        if (lowerText.includes(phrase)) {
          label = "concerning";
          flagged = true;
          break;
        }
      }
      
      if (!flagged) {
        label = "negative";
      }
    } else {
      label = "negative";
    }
  } else {
    label = "neutral";
  }
  
  return {
    score,
    label,
    flagged
  };
};
