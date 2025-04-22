
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const domains = [
  {
    title: "Self-Awareness",
    percent: 75,
    description: "Understanding emotions, strengths, and limitations",
    color: "bg-green-500",
  },
  {
    title: "Self-Management",
    percent: 62,
    description: "Regulating emotions and behaviors",
    color: "bg-amber-500",
  },
  {
    title: "Social Awareness",
    percent: 81,
    description: "Empathy and respect for others",
    color: "bg-green-500",
  },
  {
    title: "Relationship Skills",
    percent: 70,
    description: "Establishing and maintaining healthy relationships",
    color: "bg-green-500",
  },
  {
    title: "Responsible Decision-Making",
    percent: 58,
    description: "Making ethical, constructive choices",
    color: "bg-yellow-500",
  },
];

const SelDomainScoresCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>SEL Domain Scores</CardTitle>
      <CardDescription>
        Social-Emotional Learning competencies assessment
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {domains.map((domain) => (
          <div className="space-y-2" key={domain.title}>
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-sm font-medium">{domain.title}</span>
                <div className="text-xs text-muted-foreground">{domain.description}</div>
              </div>
              <span className="text-sm font-medium">{domain.percent}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className={`h-full ${domain.color}`} style={{ width: `${domain.percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default SelDomainScoresCard;
