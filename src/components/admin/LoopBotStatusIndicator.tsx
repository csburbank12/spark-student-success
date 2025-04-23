
import React, { useState } from "react";
import { useLoopBot } from "@/contexts/LoopBotContext";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";

const LoopBotStatusIndicator: React.FC = () => {
  const { siteHealth, criticalIssuesCount, pendingIssuesCount, isScanning, startManualScan } = useLoopBot();
  const [isRunningManualScan, setIsRunningManualScan] = useState(false);
  const navigate = useNavigate();
  
  const handleManualScan = async () => {
    setIsRunningManualScan(true);
    try {
      await startManualScan();
    } finally {
      setIsRunningManualScan(false);
    }
  };
  
  const getStatusIcon = () => {
    if (isScanning || isRunningManualScan) {
      return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    }
    
    switch (siteHealth) {
      case "green":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "yellow":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "red":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Shield className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getStatusText = () => {
    if (isScanning || isRunningManualScan) {
      return "Scanning...";
    }
    
    switch (siteHealth) {
      case "green":
        return "System Healthy";
      case "yellow":
        return "Warning: Issues Detected";
      case "red":
        return "Alert: Critical Issues";
      default:
        return "LoopBot Status";
    }
  };
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="flex items-center gap-2"
          onClick={() => navigate("/loopbot-logs")}
        >
          {getStatusIcon()}
          <span className="hidden md:inline">{getStatusText()}</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h4 className="font-medium">LoopBot Maintenance System</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Site Health:</span>
              <span className={`font-medium ${
                siteHealth === "green" ? "text-green-600" : 
                siteHealth === "yellow" ? "text-amber-600" : 
                "text-red-600"
              }`}>
                {siteHealth === "green" ? "Healthy" : 
                 siteHealth === "yellow" ? "Warning" : "Critical"}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span>Critical Issues:</span>
              <span className={`font-medium ${criticalIssuesCount > 0 ? "text-red-600" : ""}`}>
                {criticalIssuesCount}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span>Pending Issues:</span>
              <span className={`font-medium ${pendingIssuesCount > 0 ? "text-amber-600" : ""}`}>
                {pendingIssuesCount}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={handleManualScan}
              disabled={isScanning || isRunningManualScan}
            >
              {(isScanning || isRunningManualScan) ? (
                <>
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  Scanning...
                </>
              ) : "Run Scan"}
            </Button>
            
            <Button 
              size="sm" 
              variant="default" 
              className="flex-1"
              onClick={() => navigate("/loopbot-logs")}
            >
              View Logs
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default LoopBotStatusIndicator;
