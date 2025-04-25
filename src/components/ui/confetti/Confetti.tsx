
import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiProps {
  duration?: number;
  pieces?: number;
}

export const Confetti: React.FC<ConfettiProps> = ({ 
  duration = 3000, 
  pieces = 200 
}) => {
  const [isActive, setIsActive] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', updateWindowSize);
    
    // Auto-disable after duration
    const timer = setTimeout(() => {
      setIsActive(false);
    }, duration);
    
    return () => {
      window.removeEventListener('resize', updateWindowSize);
      clearTimeout(timer);
    };
  }, [duration]);
  
  if (!isActive) return null;
  
  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={pieces}
      gravity={0.15}
    />
  );
};
