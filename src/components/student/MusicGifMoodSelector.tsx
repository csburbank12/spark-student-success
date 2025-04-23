
import React from "react";

/**
 * Stub selector for future music/gif mood picks.
 */
interface MusicGifMoodSelectorProps {
  onSelect: (src: string, emotionTag: string) => void;
}

// Placeholders representing music/gif choices
const gifOptions = [
  { src: "/gifs/dance.gif", label: "Excited", tag: "excited" },
  { src: "/gifs/rain.gif", label: "Calm", tag: "calm" },
  { src: "/gifs/party.gif", label: "Joy", tag: "joy" },
  // Add more as needed
];

const MusicGifMoodSelector: React.FC<MusicGifMoodSelectorProps> = ({
  onSelect,
}) => (
  <div className="flex flex-row gap-4 justify-center">
    {gifOptions.map((g) => (
      <button
        key={g.src}
        className="rounded-lg overflow-hidden border border-muted shadow hover:ring-2 focus:ring-2 transition"
        onClick={() => onSelect(g.src, g.tag)}
        aria-label={`Select mood GIF: ${g.label}`}
        type="button"
      >
        <img src={g.src} alt={g.label} className="w-16 h-16 object-cover" />
      </button>
    ))}
  </div>
);

export default MusicGifMoodSelector;
