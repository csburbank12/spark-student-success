
import React, { createContext, useContext, useEffect, useState } from "react";
import { loopBotService, SiteHealth, LoopBotLog } from "@/services/loopbot/LoopBotService";

interface LoopBotContextType {
  siteHealth: SiteHealth;
  criticalIssuesCount: number;
  pendingIssuesCount: number;
  recentIssues: LoopBotLog[];
  isScanning: boolean;
  startManualScan: () => Promise<void>;
}

const LoopBotContext = createContext<LoopBotContextType | undefined>(undefined);

export const useLoopBot = () => {
  const context = useContext(LoopBotContext);
  if (context ===   undefined) {
    throw new Error("useLoopBot must be used within a LoopBotProvider");
  }
  return context;
};

export const LoopBotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteHealth, setSiteHealth] = useState<SiteHealth>("green");
  const [criticalIssuesCount, setCriticalIssuesCount] = useState(0);
  const [pendingIssuesCount, setPendingIssuesCount] = useState(0);
  const [recentIssues, setRecentIssues] = useState<LoopBotLog[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  
  // Initial load and regular refresh
  useEffect(() => {
    updateLoopBotData();
    
    // Refresh every minute
    const interval = setInterval(updateLoopBotData, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const updateLoopBotData = async () => {
    try {
      const logs = await loopBotService.getLogs(1); // Get last 24 hours
      const scanResult = loopBotService.getLastScanResult();
      
      if (scanResult) {
        setSiteHealth(scanResult.siteHealth);
      }
      
      setCriticalIssuesCount(logs.filter(log => log.severity === "critical" && log.status === "pending").length);
      setPendingIssuesCount(logs.filter(log => log.status === "pending").length);
      setRecentIssues(logs.slice(0, 5)); // Get 5 most recent logs
    } catch (error) {
      console.error("Error updating LoopBot data:", error);
    }
  };
  
  const startManualScan = async () => {
    try {
      setIsScanning(true);
      await loopBotService.startScan();
      await updateLoopBotData();
    } finally {
      setIsScanning(false);
    }
  };
  
  const value = {
    siteHealth,
    criticalIssuesCount,
    pendingIssuesCount,
    recentIssues,
    isScanning,
    startManualScan
  };
  
  return (
    <LoopBotContext.Provider value={value}>
      {children}
    </LoopBotContext.Provider>
  );
};
