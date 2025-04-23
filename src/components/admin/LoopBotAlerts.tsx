
import React from "react";
import { useLoopBot } from "@/contexts/LoopBotContext";
import { AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LoopBotAlerts: React.FC = () => {
  const { criticalIssuesCount, siteHealth } = useLoopBot();
  const navigate = useNavigate();
  
  if (siteHealth !== "red" || criticalIssuesCount === 0) {
    return null;
  }
  
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4 rounded">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="text-red-500 mr-2" />
          <div>
            <h3 className="font-medium text-red-800">Critical System Alerts</h3>
            <p className="text-sm text-red-700">
              {criticalIssuesCount} critical {criticalIssuesCount === 1 ? 'issue' : 'issues'} detected by LoopBot
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-100"
          onClick={() => navigate("/loopbot-logs")}
        >
          View Details
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LoopBotAlerts;
