
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText, 
  ArrowRight, 
  UserCheck,
  Database,
  LayoutGrid,
  ArrowRightCircle
} from 'lucide-react';
import { useAuditPlatform } from '@/hooks/useAuditPlatform';
import { useNavigate } from 'react-router-dom';

export const PlatformAudit = () => {
  const { isAuditing, auditResults, runAudit } = useAuditPlatform();
  const navigate = useNavigate();
  
  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    routes: false,
    components: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Status indicator component
  const StatusIndicator = ({ status }: { status: 'success' | 'error' | 'warning' }) => {
    if (status === 'success') {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    } else if (status === 'error') {
      return <XCircle className="h-5 w-5 text-red-500" />;
    } else {
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Platform Audit Report
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => runAudit()}
          disabled={isAuditing}
        >
          {isAuditing ? 'Running Audit...' : 'Run Audit'}
        </Button>
      </CardHeader>
      <CardContent>
        {isAuditing ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : auditResults ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-2">
                <StatusIndicator status={auditResults.success ? 'success' : 'error'} />
                <span className="font-medium">Audit Status</span>
              </div>
              <span>
                {auditResults.success 
                  ? 'All checks passed' 
                  : `${auditResults.errorCount} issues detected`}
              </span>
            </div>
            
            {/* Routes Section */}
            {auditResults.routeResults && (
              <div className="space-y-2">
                <div 
                  className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 rounded-md"
                  onClick={() => toggleSection('routes')}
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5 text-primary" />
                    <span className="font-medium">Routes and Pages</span>
                  </div>
                  <ArrowRightCircle className={`h-5 w-5 transition-transform ${expandedSections.routes ? 'rotate-90' : ''}`} />
                </div>
                
                {expandedSections.routes && (
                  <div className="pl-4 border-l-2 border-muted-foreground/20 space-y-2 mt-2">
                    {auditResults.routeResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <StatusIndicator status={result.exists ? 'success' : 'error'} />
                          <span>{result.route}</span>
                        </div>
                        <span className="text-muted-foreground">{result.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Components Section */}
            {auditResults.componentResults && (
              <div className="space-y-2">
                <div 
                  className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 rounded-md"
                  onClick={() => toggleSection('components')}
                >
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span className="font-medium">Components</span>
                  </div>
                  <ArrowRightCircle className={`h-5 w-5 transition-transform ${expandedSections.components ? 'rotate-90' : ''}`} />
                </div>
                
                {expandedSections.components && (
                  <div className="pl-4 border-l-2 border-muted-foreground/20 space-y-2 mt-2">
                    {auditResults.componentResults.map((result, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <StatusIndicator status={result.exists ? 'success' : 'error'} />
                          <span>{result.componentName}</span>
                        </div>
                        <span className="text-muted-foreground">{result.exists ? 'Verified' : 'Missing'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div className="pt-4 mt-4 border-t flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Last run: {new Date(auditResults.date).toLocaleString()}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/admin/system-monitoring')}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Full Report
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>No audit has been run yet</p>
            <p className="text-sm">Run an audit to check system health and compliance</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
