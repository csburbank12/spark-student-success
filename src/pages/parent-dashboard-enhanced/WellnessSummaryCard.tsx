
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WellnessSummaryCardProps {
  childData: any;
  getWellnessSummary: () => { title: string; description: string; statusColor: string };
  getTrendIcon: (trend: string) => React.ReactNode | null;
}

const WellnessSummaryCard: React.FC<WellnessSummaryCardProps> = ({ 
  childData, 
  getWellnessSummary, 
  getTrendIcon 
}) => {
  const navigate = useNavigate();
  const wellnessSummary = getWellnessSummary();

  return (
    <Card className="border-t-4" style={{ borderTopColor: wellnessSummary.statusColor.replace('text-', '') }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              <span className={wellnessSummary.statusColor}>{wellnessSummary.title}</span>
              {childData.behaviorTrend && (
                <sup className="ml-1">{getTrendIcon(childData.behaviorTrend)}</sup>
              )}
            </CardTitle>
            <CardDescription>{wellnessSummary.description}</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => navigate(`/child-wellness?child=${childData.id}`)}
          >
            <span>Full Report</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="font-semibold">{childData.attendance}%</p>
              <p className="text-xs text-muted-foreground">Attendance</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{childData.checkIns}</p>
              <p className="text-xs text-muted-foreground">Check-ins</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">{childData.alerts}</p>
              <p className="text-xs text-muted-foreground">Alerts</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate(`/messages?child=${childData.id}`)}>
              Message Teacher
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => navigate(`/my-children?child=${childData.id}`)}
            >
              View Detail
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessSummaryCard;
