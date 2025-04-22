
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Clock, CheckCircle } from "lucide-react";

interface DataSource {
  name: string;
  lastSync: string;
  status: string;
  count: number;
}

interface DataSourcesPanelProps {
  dataSources: DataSource[];
}

const DataSourcesPanel: React.FC<DataSourcesPanelProps> = ({ dataSources }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <Database className="h-4 w-4" /> Connected Data Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dataSources.map((source, index) => (
            <div key={index} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
              <div>
                <div className="font-medium">{source.name}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> Last synced: {source.lastSync}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" /> 
                  {source.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{source.count} records</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourcesPanel;
