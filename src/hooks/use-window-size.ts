
import { useState, useEffect } from 'react';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Only execute this on client, not on server
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      
      // Set initial size
      handleResize();
      
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
      
      // Clean up event listener
      return () => window.removeEventListener('resize', handleResize);
    }

    return undefined;
  }, []);

  return windowSize;
}

export default useWindowSize;
