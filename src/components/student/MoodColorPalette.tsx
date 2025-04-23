
import React from "react";

interface MoodColorPaletteProps {
  selectedColor: string | null;
  onSelect: (color: string, emotionTag: string) => void;
}

const palette = [
  { color: "#8B5CF6", label: "Calm", tag: "calm" },
  { color: "#10B981", label: "Energized", tag: "positive" },
  { color: "#F59E42", label: "Excited", tag: "excited" },
  { color: "#F472B6", label: "Loved", tag: "loved" },
  { color: "#F97316", label: "Angry", tag: "anger" },
  { color: "#0891B2", label: "Sad", tag: "sad" },
  { color: "#D1D5DB", label: "Meh", tag: "neutral" },
  { color: "#EF4444", label: "Stressed", tag: "stress" },
];

const MoodColorPalette: React.FC<MoodColorPaletteProps> = ({
  selectedColor,
  onSelect,
}) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {palette.map((c) => (
      <button
        key={c.color}
        className={`rounded-full w-12 h-12 border-2 flex flex-col items-center justify-center ring-2 transition 
          ${selectedColor === c.color ? "ring-primary" : "ring-transparent"}
        `}
        style={{ backgroundColor: c.color }}
        aria-label={`Select mood color: ${c.label}`}
        onClick={() => onSelect(c.color, c.tag)}
      >
        <span className="sr-only">{c.label}</span>
      </button>
    ))}
  </div>
);

export default MoodColorPalette;
