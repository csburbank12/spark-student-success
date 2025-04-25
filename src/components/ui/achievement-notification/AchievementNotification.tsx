
import React, { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import { Confetti } from '../confetti/Confetti';

interface AchievementNotificationProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  title,
  description,
  isOpen,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShowConfetti(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500); // Allow fade-out animation to complete
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  
  if (!isOpen && !isVisible) return null;
  
  return (
    <>
      {showConfetti && <Confetti duration={3000} />}
      <div 
        className={`fixed bottom-4 right-4 bg-card rounded-lg shadow-lg border border-primary/20 p-4 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } max-w-xs w-full z-50`}
      >
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 rounded-full p-2">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Achievement Unlocked!</h3>
            <p className="text-lg font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 500);
          }}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </>
  );
};
