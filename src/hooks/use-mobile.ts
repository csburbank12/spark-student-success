
import { useState, useEffect } from "react";

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Set up listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
};
