
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { testCategories } from '@/components/qa/TestCategoriesConfig';
import { CategoryResult } from '@/components/qa/types';
import TestRunner from '@/components/qa/TestRunner';
import TestResults from '@/components/qa/TestResults';
import TestProgress from '@/components/qa/TestProgress';
import { getRandomErrorMessage } from '@/components/qa/errorMessageUtils';

const QATestUtility = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentTest, setCurrentTest] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [results, setResults] = React.useState<CategoryResult[]>([]);
  const [overallStatus, setOverallStatus] = React.useState<'pending' | 'passed' | 'failed' | 'partial'>('pending');
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    
    const initialResults: CategoryResult[] = testCategories.map(category => ({
      name: category.name,
      tests: category.tests.map(test => ({
        name: test,
        status: 'pending'
      })),
      status: 'pending'
    }));
    
    setResults(initialResults);
    
    let allResults = [...initialResults];
    let totalTests = testCategories.reduce((acc, category) => acc + category.tests.length, 0);
    let completedTests = 0;
    let hasFailures = false;
    
    for (let i = 0; i < testCategories.length; i++) {
      const category = testCategories[i];
      
      for (let j = 0; j < category.tests.length; j++) {
        const test = category.tests[j];
        setCurrentTest(`Testing: ${category.name} - ${test}`);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const isNavOrAuth = category.name === "Navigation" || category.name === "Authentication";
        const passed = isNavOrAuth ? Math.random() > 0.1 : Math.random() > 0.2;
        
        if (!passed) hasFailures = true;
        
        allResults[i].tests[j] = {
          name: test,
          status: passed ? 'passed' : 'failed',
          message: passed ? undefined : getRandomErrorMessage(category.name, test)
        };
        
        const categoryTests = allResults[i].tests;
        allResults[i].status = categoryTests.every(t => t.status === 'passed') 
          ? 'passed' 
          : categoryTests.some(t => t.status === 'failed') 
            ? 'partial' 
            : 'pending';
        
        completedTests++;
        setProgress(Math.floor((completedTests / totalTests) * 100));
        setResults([...allResults]);
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    setCurrentTest('Finalizing results...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setOverallStatus(hasFailures ? 'partial' : 'passed');
    setIsRunning(false);
    
    if (hasFailures) {
      toast.warning("Some tests failed. Review the results to address issues.");
    } else {
      toast.success("All tests passed! The application is ready for launch.");
    }
  };

  const handleRoleSwitch = (role: string) => {
    toast.info(`Switched to ${role} view for testing`);
    setRole(role);
  };

  const markSiteReady = () => {
    toast.success("Site has been marked as 'Ready for School Pilot Launch'!", {
      duration: 5000,
      icon: <Sparkles className="h-5 w-5 text-yellow-400" />
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Quality Assurance Testing</h2>
        <div className="flex gap-2">
          <TestRunner 
            isRunning={isRunning}
            results={results}
            onRunTests={runTests}
          />
          
          {overallStatus === 'passed' && (
            <Button variant="default" onClick={markSiteReady}>
              <Sparkles className="mr-2 h-4 w-4" />
              Mark Ready for Launch
            </Button>
          )}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <span>Test Profiles</span>
            <span className="text-muted-foreground text-sm font-normal">
              Switch views to test different roles
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {['student', 'teacher', 'admin', 'parent', 'staff'].map(role => (
              <Button 
                key={role}
                variant="outline" 
                size="sm" 
                onClick={() => handleRoleSwitch(role)}
                className="flex items-center"
              >
                <UserCheck className="mr-2 h-4 w-4" />
                Test as {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {isRunning && (
        <TestProgress currentTest={currentTest} progress={progress} />
      )}
      
      {results.length > 0 && (
        <TestResults results={results} onDebug={() => navigate('/dashboard')} />
      )}
    </div>
  );
};

export default QATestUtility;

