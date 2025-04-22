
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Heart, Download, ThumbsUp } from "lucide-react";

const AffirmationGenerator: React.FC = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(
    "I am capable of handling whatever challenges come my way today."
  );
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const affirmations = [
    "I am capable of handling whatever challenges come my way today.",
    "I believe in myself and my abilities.",
    "I am worthy of respect and acceptance.",
    "My feelings matter and I honor them.",
    "I am enough just as I am.",
    "I can take things one step at a time.",
    "I am learning and growing every day.",
    "I choose to focus on what I can control.",
    "My thoughts and ideas have value.",
    "I deserve to take care of myself.",
    "I can ask for help when I need it.",
    "I am resilient and can overcome difficulties.",
    "I trust myself to make good decisions.",
    "I celebrate my achievements, big and small.",
    "I am surrounded by people who care about me.",
    "I have the power to create positive change.",
  ];

  const generateNewAffirmation = () => {
    let newAffirmation;
    do {
      newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    } while (newAffirmation === currentAffirmation);
    
    setCurrentAffirmation(newAffirmation);
  };

  const toggleFavorite = (affirmation: string) => {
    if (favorites.includes(affirmation)) {
      setFavorites(favorites.filter(item => item !== affirmation));
    } else {
      setFavorites([...favorites, affirmation]);
    }
  };

  const downloadFavorites = () => {
    const text = favorites.join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-affirmations.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">Positive Affirmations</h3>
        <p className="text-muted-foreground">Strengthen your mindset with positive statements</p>
      </div>
      
      <Card className="p-8 flex flex-col items-center text-center">
        <p className="text-2xl font-medium">{currentAffirmation}</p>
        
        <div className="flex gap-4 mt-6">
          <Button variant="outline" onClick={generateNewAffirmation}>
            <RefreshCw className="h-4 w-4 mr-2" />
            New Affirmation
          </Button>
          <Button 
            variant={favorites.includes(currentAffirmation) ? "default" : "secondary"}
            onClick={() => toggleFavorite(currentAffirmation)}
          >
            <Heart className={`h-4 w-4 mr-2 ${favorites.includes(currentAffirmation) ? "fill-current" : ""}`} />
            {favorites.includes(currentAffirmation) ? "Favorited" : "Favorite"}
          </Button>
        </div>
      </Card>
      
      {favorites.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Your Favorite Affirmations</h4>
            <Button variant="ghost" size="sm" onClick={downloadFavorites}>
              <Download className="h-4 w-4 mr-2" />
              Save Collection
            </Button>
          </div>
          
          <div className="grid gap-2">
            {favorites.map((affirmation, index) => (
              <Card key={index} className="p-3 flex justify-between items-center">
                <p>{affirmation}</p>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleFavorite(affirmation)}
                  className="h-8 w-8"
                >
                  <Heart className="h-4 w-4 fill-current text-rose-500" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="pt-4 text-center text-sm text-muted-foreground">
        <p>Try practicing your favorite affirmations in front of a mirror each morning.</p>
      </div>
    </div>
  );
};

export default AffirmationGenerator;
