
import { useState, useEffect } from "react";

const ANIMATION_URLS = [
  "/animations/breathing.mp4",
  "/animations/meditation.mp4",
  "/animations/visualization.mp4",
];

export const useResetAnimation = (selectedGoal: string) => {
  const [animationUrl, setAnimationUrl] = useState<string>(ANIMATION_URLS[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * ANIMATION_URLS.length);
    setAnimationUrl(ANIMATION_URLS[randomIndex]);
  }, [selectedGoal]);

  return { animationUrl };
};
