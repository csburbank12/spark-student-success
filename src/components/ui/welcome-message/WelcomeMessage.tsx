
import React, { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface WelcomeMessageProps {
  className?: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ className = "" }) => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';
  
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);
  
  const motivationalPhrases = useMemo(() => [
    "Ready to make today awesome?",
    "You've got this!",
    "Today is a great day to learn something new!",
    "Small steps lead to big progress!",
    "What will you accomplish today?",
    "Your wellbeing matters!",
    "Every check-in brings you closer to your goals!",
    "Time to shine bright!",
  ], []);
  
  const randomPhrase = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[randomIndex];
  }, [motivationalPhrases]);
  
  return (
    <div className={`space-y-1 ${className}`}>
      <h1 className="text-3xl font-heading font-bold animate-fade-in">
        {greeting}, {firstName}!
      </h1>
      <p className="text-muted-foreground animate-fade-in opacity-0" style={{ animationDelay: '0.3s' }}>
        {randomPhrase}
      </p>
    </div>
  );
};
