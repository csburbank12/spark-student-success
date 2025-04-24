
import React, { useState, useEffect } from 'react';
import { useErrorLogs } from '@/hooks/useErrorLogs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ErrorLogFilters from '@/components/admin-dashboard/ErrorLogFilters';
import ErrorLogsChart from '@/components/admin-dashboard/ErrorLogsChart';
import GlobalErrorBoundary from '@/components/error-handling/GlobalErrorBoundary';

export default function ErrorLogsDashboard() {
  const [showResolved, setShowResolved] = useState(false);
  const [errorType, setErrorType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLimit, setCurrentLimit] = useState(25);
  const [currentPage, setCurrentPage] = useState(0);
  const { logs, isLoading, toggleResolution, refreshLogs, hasRecurringIssues } = useErrorLogs(showResolved, currentLimit, currentPage * currentLimit);
  const [filteredLogs, setFilteredLogs] = useState(logs);

  // Filter logs based on criteria
  useEffect(() => {
    let filtered = [...logs];
    
    if (errorType !== 'all') {
      filtered = filtered.filter(log => {
        if (errorType === 'javascript') return log.action.includes('javascript_error');
        if (errorType === 'api') return log.action.includes('api_error');
        if (errorType === 'database') return log.action.includes('database');
        if (errorType === 'validation') return log.action.includes('validation');
        if (errorType === '404') return log.action.includes('not_found');
        return true;
      });
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log => 
        log.error_message.toLowerCase().includes(query) || 
        log.action.toLowerCase().includes(query)
      );
    }
    
    setFilteredLogs(filtered);
  }, [logs, errorType, searchQuery]);

  const resetFilters = () => {
    setErrorType('all');
    setSearchQuery('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSeverityBadge = (message: string) => {
    if (message.includes('critical') || message.includes('exception')) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (message.includes('warning')) {
      return <Badge variant="warning">Warning</Badge>;
    } else {
      return <Badge>Info</Badge>;
    }
  };

  return (
    <GlobalErrorBoundary component="ErrorLogsDashboard">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Error Monitoring Dashboard</h1>
          <Button variant="outline" size="sm" onClick={refreshLogs}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {hasRecurringIssues && (
          <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-destructive">Attention needed</h3>
                <div className="mt-2 text-sm text-destructive/80">
                  <p>
                    Multiple recurring errors have been detected in the past hour. These issues may be affecting users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{logs.length}</div>
              <p className="text-xs text-muted-foreground">
                {logs.filter(log => !log.resolved).length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {logs.filter(log => log.resolved).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((logs.filter(log => log.resolved).length / (logs.length || 1)) * 100)}% resolution rate
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {logs.filter(log => 
                  log.error_message.includes('critical') || 
                  log.error_message.includes('exception')).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {logs.filter(log => 
                  (log.error_message.includes('critical') || 
                  log.error_message.includes('exception')) && 
                  !log.resolved).length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Last 24h</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {logs.filter(log => 
                  new Date(log.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {logs.filter(log => 
                  new Date(log.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000) && 
                  !log.resolved).length} active
              </p>
            </CardContent>
          </Card>
        </div>

        <ErrorLogsChart logs={logs} />

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Errors</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <ErrorLogFilters
              showResolved={showResolved}
              setShowResolved={setShowResolved}
              errorType={errorType}
              setErrorType={setErrorType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onReset={resetFilters}
            />
          </div>
          <TabsContent value="all" className="mt-4">
            <div className="rounded-md border">
              {isLoading ? (
                <div className="flex justify-center p-8">Loading error logs...</div>
              ) : filteredLogs.length > 0 ? (
                <div className="divide-y">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {formatDate(log.timestamp)}
                          </span>
                          {getSeverityBadge(log.error_message)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleResolution(log.id, !log.resolved)}
                        >
                          {log.resolved ? (
                            <XCircle className="h-4 w-4 mr-2" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                          )}
                          {log.resolved ? 'Reopen' : 'Resolve'}
                        </Button>
                      </div>
                      
                      <h3 className="font-medium mb-1">{log.action}</h3>
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Profile Type:</span>{' '}
                          {log.profile_type || 'Unknown'}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Error Message:</span>{' '}
                          <div className="p-2 bg-muted/50 rounded-md text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                            {log.error_message}
                          </div>
                        </div>
                        {log.status_code && (
                          <div className="text-sm">
                            <span className="font-medium">Status Code:</span>{' '}
                            {log.status_code}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No error logs found matching the current filters.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            <div className="rounded-md border">
              {isLoading ? (
                <div className="flex justify-center p-8">Loading error logs...</div>
              ) : filteredLogs.filter(log => !log.resolved).length > 0 ? (
                <div className="divide-y">
                  {filteredLogs
                    .filter(log => !log.resolved)
                    .map((log) => (
                      // Same log item structure as "all" tab
                      <div key={log.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {formatDate(log.timestamp)}
                            </span>
                            {getSeverityBadge(log.error_message)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleResolution(log.id, true)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Resolve
                          </Button>
                        </div>
                        
                        <h3 className="font-medium mb-1">{log.action}</h3>
                        
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Profile Type:</span>{' '}
                            {log.profile_type || 'Unknown'}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Error Message:</span>{' '}
                            <div className="p-2 bg-muted/50 rounded-md text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {log.error_message}
                            </div>
                          </div>
                          {log.status_code && (
                            <div className="text-sm">
                              <span className="font-medium">Status Code:</span>{' '}
                              {log.status_code}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No active error logs found.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-4">
            <div className="rounded-md border">
              {isLoading ? (
                <div className="flex justify-center p-8">Loading error logs...</div>
              ) : filteredLogs.filter(log => log.resolved).length > 0 ? (
                <div className="divide-y">
                  {filteredLogs
                    .filter(log => log.resolved)
                    .map((log) => (
                      // Same log item structure as "all" tab
                      <div key={log.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {formatDate(log.timestamp)}
                            </span>
                            {getSeverityBadge(log.error_message)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleResolution(log.id, false)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reopen
                          </Button>
                        </div>
                        
                        <h3 className="font-medium mb-1">{log.action}</h3>
                        
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium">Profile Type:</span>{' '}
                            {log.profile_type || 'Unknown'}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Error Message:</span>{' '}
                            <div className="p-2 bg-muted/50 rounded-md text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                              {log.error_message}
                            </div>
                          </div>
                          {log.status_code && (
                            <div className="text-sm">
                              <span className="font-medium">Status Code:</span>{' '}
                              {log.status_code}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No resolved error logs found.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {filteredLogs.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {currentPage * currentLimit + 1} to {Math.min((currentPage + 1) * currentLimit, filteredLogs.length)} of {filteredLogs.length} errors
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={(currentPage + 1) * currentLimit >= logs.length}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </GlobalErrorBoundary>
  );
}
