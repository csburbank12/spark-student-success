
import React, { useState, useEffect } from 'react';
import { useSupabaseAdminTools } from '@/hooks/useSupabaseAdminTools';
import { useDbFunctionMonitor } from '@/hooks/useDbFunctionMonitor';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertTriangle, 
  CheckCircle, 
  Database, 
  Lock, 
  RefreshCw, 
  Shield, 
  XCircle 
} from 'lucide-react';
import { 
  addRlsCheckFunction, 
  addGetTableColumnsFunction, 
  addGetTableConstraintsFunction, 
  addListTablesFunction,
  addExecuteSqlTransactionFunction, 
  addDatabaseHealthCheckFunction,
  addCommonIndexes,
  addMissingUpdatedAtTriggers,
  ensureStudentDataRlsPolicies
} from '@/utils/dbMigrations';
import { DatabaseValidationConfig } from '@/hooks/useAdminDatabaseTools';

/**
 * Component for database health checking and administration
 */
export default function DatabaseHealthCheck() {
  const [activeTab, setActiveTab] = useState('structure');
  const [tableResults, setTableResults] = useState<any>(null);
  const [healthData, setHealthData] = useState<any>(null);
  
  // Required database functions for the application to work properly
  const requiredFunctions = [
    'insert_teacher_mood_check_in',
    'get_teacher_mood_check_ins',
    'get_teacher_mood_trends',
    'insert_micro_coach_log',
    'get_micro_coach_logs',
    'insert_intervention_impact',
    'get_student_intervention_impacts',
    'create_tiered_support_recommendation',
    'get_tiered_support_recommendations'
  ];
  
  const { 
    isLoading, 
    tables, 
    tableDetails, 
    rlsIssues,
    fetchTablesList, 
    fetchTableDetails, 
    getDatabaseHealth,
    runMigration
  } = useSupabaseAdminTools();
  
  const { 
    functionStatus, 
    missingFunctions, 
    isLoading: isFunctionChecking, 
    refresh: refreshFunctions 
  } = useDbFunctionMonitor(requiredFunctions);

  useEffect(() => {
    // Run initial validation for common tables
    validateDatabaseStructure();
    fetchDatabaseHealth();
  }, []);

  const validateDatabaseStructure = async () => {
    // Validate essential tables via direct table checks
    await fetchTablesList();
    
    // For tables that exist, fetch their details
    if (tables && tables.length > 0) {
      const commonTables = [
        'teacher_mood_check_ins',
        'micro_coach_logs',
        'intervention_impacts',
        'tiered_support_recommendations',
        'error_logs'
      ];
      
      for (const tableName of commonTables) {
        if (tables.includes(tableName)) {
          await fetchTableDetails(tableName);
        }
      }
    }
  };

  const fetchDatabaseHealth = async () => {
    const health = await getDatabaseHealth();
    setHealthData(health);
  };

  const fixDatabaseAdmin = async () => {
    // Add admin functions first
    await runMigration('add_admin_functions', `
      ${addRlsCheckFunction}
      ${addGetTableColumnsFunction}
      ${addGetTableConstraintsFunction}
      ${addListTablesFunction}
      ${addExecuteSqlTransactionFunction}
      ${addDatabaseHealthCheckFunction}
    `);
    
    // Refresh health data
    await fetchDatabaseHealth();
  };

  const fixDatabaseStructure = async () => {
    // Fix missing columns and constraints
    await runMigration('fix_database_structure', `
      ${addCommonIndexes}
      ${addMissingUpdatedAtTriggers}
    `);
    
    // Validate structure again
    await validateDatabaseStructure();
  };

  const fixDatabaseSecurity = async () => {
    // Fix RLS policies
    await runMigration('fix_database_security', ensureStudentDataRlsPolicies);
    
    // Validate structure again
    await validateDatabaseStructure();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Health Check
        </CardTitle>
        <CardDescription>
          Analyze and fix database structure, security, and performance issues
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="functions">Functions</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Structure Tab */}
        <TabsContent value="structure" className="p-6 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Database Structure</h3>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={validateDatabaseStructure}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          {healthData && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="p-4 flex flex-col">
                <p className="text-sm text-muted-foreground mb-2">Tables without timestamps</p>
                <div className="flex items-center gap-2">
                  <Badge variant={(healthData.tables_without_timestamps?.length > 0) ? "destructive" : "default"}>
                    {healthData.tables_without_timestamps?.length || 0}
                  </Badge>
                  <span className="font-medium">tables missing timestamps</span>
                </div>
              </Card>
              
              <Card className="p-4 flex flex-col">
                <p className="text-sm text-muted-foreground mb-2">Tables without primary keys</p>
                <div className="flex items-center gap-2">
                  <Badge variant={(healthData.tables_without_primary_keys?.length > 0) ? "destructive" : "default"}>
                    {healthData.tables_without_primary_keys?.length || 0}
                  </Badge>
                  <span className="font-medium">tables missing primary key</span>
                </div>
              </Card>
            </div>
          )}
          
          {tableDetails && Object.keys(tableDetails).length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table</TableHead>
                  <TableHead>Has Primary Key</TableHead>
                  <TableHead>Has Timestamps</TableHead>
                  <TableHead>Issues</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(tableDetails).map(([tableName, details]: [string, any]) => {
                  // Extract primary key and timestamp info
                  const hasPrimaryKey = details.columns?.some((col: any) => col.is_primary_key);
                  const hasCreatedAt = details.columns?.some((col: any) => col.column_name === 'created_at');
                  const hasUpdatedAt = details.columns?.some((col: any) => col.column_name === 'updated_at');
                  const hasTimestamps = hasCreatedAt && hasUpdatedAt;
                  
                  return (
                    <TableRow key={tableName}>
                      <TableCell className="font-medium">{tableName}</TableCell>
                      <TableCell>
                        {hasPrimaryKey ? 
                          <CheckCircle className="h-5 w-5 text-green-500" /> : 
                          <XCircle className="h-5 w-5 text-red-500" />
                        }
                      </TableCell>
                      <TableCell>
                        {hasTimestamps ? 
                          <CheckCircle className="h-5 w-5 text-green-500" /> : 
                          <XCircle className="h-5 w-5 text-red-500" />
                        }
                      </TableCell>
                      <TableCell>
                        {!hasPrimaryKey && (
                          <span className="text-red-500 text-sm block">
                            Missing primary key
                          </span>
                        )}
                        {!hasTimestamps && (
                          <span className="text-red-500 text-sm block">
                            Missing timestamps
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          
          <div className="flex justify-end gap-2 mt-4">
            <Button 
              variant="outline" 
              onClick={fixDatabaseAdmin}
              disabled={isLoading}
            >
              Fix Admin Functions
            </Button>
            <Button 
              variant="default" 
              onClick={fixDatabaseStructure}
              disabled={isLoading}
            >
              Fix Structure Issues
            </Button>
          </div>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="p-6 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Database Security</h3>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={validateDatabaseStructure}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          {healthData && healthData.rls_status && (
            <div className="mb-6">
              <h4 className="text-md font-medium mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Row Level Security Status
              </h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table</TableHead>
                    <TableHead>RLS Enabled</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(healthData.rls_status).map(([tableName, isEnabled]: [string, any]) => (
                    <TableRow key={tableName}>
                      <TableCell className="font-medium">{tableName}</TableCell>
                      <TableCell>
                        {isEnabled ? 
                          <div className="flex items-center gap-1 text-green-500">
                            <Lock className="h-4 w-4" /> Enabled
                          </div> : 
                          <div className="flex items-center gap-1 text-red-500">
                            <AlertTriangle className="h-4 w-4" /> Disabled
                          </div>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <Alert variant="destructive" className="mb-4">
            <AlertTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Security Warning
            </AlertTitle>
            <AlertDescription>
              All tables containing student data should have Row Level Security (RLS) enabled with appropriate policies.
              Students should only be able to access their own data, while teachers and administrators may have broader permissions.
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-end mt-4">
            <Button 
              variant="default" 
              onClick={fixDatabaseSecurity}
              disabled={isLoading}
            >
              Fix Security Issues
            </Button>
          </div>
        </TabsContent>
        
        {/* Functions Tab */}
        <TabsContent value="functions" className="p-6 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Database Functions</h3>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={refreshFunctions}
              disabled={isFunctionChecking}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isFunctionChecking ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Function Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requiredFunctions.map(funcName => (
                <TableRow key={funcName}>
                  <TableCell className="font-medium">{funcName}</TableCell>
                  <TableCell>
                    {functionStatus[funcName] ? 
                      <span className="flex items-center gap-1 text-green-500">
                        <CheckCircle className="h-4 w-4" /> Available
                      </span> : 
                      <span className="flex items-center gap-1 text-red-500">
                        <XCircle className="h-4 w-4" /> Missing
                      </span>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {missingFunctions.length > 0 && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Missing Functions
              </AlertTitle>
              <AlertDescription>
                {missingFunctions.length} required database functions are missing. 
                Please run the database function setup script to fix this issue.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <CardFooter className="flex justify-between p-6">
        <p className="text-sm text-muted-foreground">
          Last checked: {new Date().toLocaleString()}
        </p>
        <Button variant="outline" onClick={() => {
          validateDatabaseStructure();
          fetchDatabaseHealth();
          refreshFunctions();
        }}>
          Run Full Audit
        </Button>
      </CardFooter>
    </Card>
  );
}
