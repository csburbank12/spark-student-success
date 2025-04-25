
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";

interface ErrorLogsProps {
  isLoading: boolean;
  filteredLogs: any[];
  toggleResolution: (id: string, resolved: boolean) => void;
  currentPage: number;
  currentLimit: number;
  onPageChange: (page: number) => void;
}

export const ErrorLogsSection: React.FC<ErrorLogsProps> = ({
  isLoading,
  filteredLogs,
  toggleResolution,
  currentPage,
  currentLimit,
  onPageChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Logs</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="lg" />
          </div>
        ) : filteredLogs && filteredLogs.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Profile Type</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.profile_type || 'unknown'}</Badge>
                    </TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="max-w-md truncate">{log.error_message}</TableCell>
                    <TableCell>
                      {log.resolved ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="mr-1 h-3 w-3" /> Resolved
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <AlertCircle className="mr-1 h-3 w-3" /> Open
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleResolution(log.id, !log.resolved)}
                      >
                        {log.resolved ? 'Reopen' : 'Resolve'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex items-center justify-between space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {Math.ceil(filteredLogs.length / currentLimit)}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={(currentPage + 1) * currentLimit >= filteredLogs.length}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
            <HelpCircle className="h-8 w-8 mb-2" />
            <h3 className="text-lg font-medium">No errors found</h3>
            <p className="text-sm">The system looks healthy with no recorded errors.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
