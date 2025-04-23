
import React from "react";

interface EmojiMoodSelectorProps {
  selectedEmoji: string | null;
  onSelect: (emoji: string, emotionTag: string) => void;
}
const emojis = [
  { symbol: "😃", label: "Happy", tag: "joy" },
  { symbol: "😔", label: "Sad", tag: "sad" },
  { symbol: "😐", label: "Neutral", tag: "neutral" },
  { symbol: "😣", label: "Stressed", tag: "stress" },
  { symbol: "😠", label: "Angry", tag: "anger" },
  { symbol: "🥰", label: "Loved", tag: "loved" },
  { symbol: "😎", label: "Confident", tag: "confident" },
  { symbol: "😱", label: "Surprised", tag: "surprised" },
];

const EmojiMoodSelector: React.FC<EmojiMoodSelectorProps> = ({
  selectedEmoji,
  onSelect,
}) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {emojis.map((e) => (
      <button
        key={e.symbol}
        className={`bg-white rounded-full shadow w-12 h-12 flex items-center justify-center text-2xl border
          ${selectedEmoji === e.symbol ? "border-primary" : "border-transparent"}
        `}
        aria-label={`Select mood: ${e.label}`}
        onClick={() => onSelect(e.symbol, e.tag)}
      >
        {e.symbol}
      </button>
    ))}
  </div>
);

export default EmojiMoodSelector;
