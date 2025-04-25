
import { useState, useCallback, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  progress: number;
  icon: string;
}

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState<Achievement | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Fetch achievements from API or local storage
  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const savedAchievements = localStorage.getItem('user-achievements');
    
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);
  
  // Update an achievement's progress
  const updateProgress = useCallback((id: string, newProgress: number) => {
    setAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.id === id) {
          const wasCompleted = achievement.completed;
          const isNowCompleted = newProgress >= 100;
          
          // Check if achievement was just completed
          if (!wasCompleted && isNowCompleted) {
            setRecentlyUnlocked({
              ...achievement,
              progress: newProgress,
              completed: true
            });
            setShowCelebration(true);
          }
          
          return {
            ...achievement,
            progress: newProgress,
            completed: isNowCompleted
          };
        }
        return achievement;
      });
      
      // Save to local storage
      localStorage.setItem('user-achievements', JSON.stringify(updated));
      return updated;
    });
  }, []);
  
  // Clear celebration state
  const clearCelebration = useCallback(() => {
    setShowCelebration(false);
    setRecentlyUnlocked(null);
  }, []);
  
  return {
    achievements,
    updateProgress,
    recentlyUnlocked,
    showCelebration,
    clearCelebration
  };
};
