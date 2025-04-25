
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  InfoIcon
} from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

const PredictionConfidenceCard: React.FC = () => {
  // Mock data for the AI model performance
  const aiModelData = {
    accuracyScore: 87,
    lastTrained: "April 19, 2025",
    dataPoints: 245789,
    benchmarkScore: 82,
    falsePositives: 7.2,
    falseNegatives: 5.8
  };

  const tooltipContent = (
    <p className="w-64">The overall accuracy of predictions based on cross-validation with known outcomes</p>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <Brain className="h-4 w-4" /> WellLens™ Model Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Accuracy Score</span>
                <Tooltip content={tooltipContent}>
                  <InfoIcon className="h-3 w-3 text-muted-foreground" />
                </Tooltip>
              </div>
              <span className="text-lg font-bold">{aiModelData.accuracyScore}%</span>
            </div>
            <Progress value={aiModelData.accuracyScore} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div>
              <div className="text-muted-foreground">Last Trained</div>
              <div>{aiModelData.lastTrained}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Data Points</div>
              <div>{aiModelData.dataPoints.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-muted-foreground">False Positives</div>
              <div>{aiModelData.falsePositives}%</div>
            </div>
            <div>
              <div className="text-muted-foreground">False Negatives</div>
              <div>{aiModelData.falseNegatives}%</div>
            </div>
          </div>
          
          <div className="pt-2 text-xs text-muted-foreground">
            <p>Predictions updated hourly based on all available data sources. Model retrained weekly with new data.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionConfidenceCard;
