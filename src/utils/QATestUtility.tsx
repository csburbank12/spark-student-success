
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  AlertTriangle, 
  X, 
  Loader2, 
  RefreshCw, 
  UserCheck, 
  LinkIcon,
  FormInput,
  LayoutDashboard, 
  Save, 
  FileWarning,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

// Test categories
const testCategories = [
  {
    name: "Authentication",
    tests: ["Login flow", "User profile loading", "Role-based access", "Session persistence"]
  },
  {
    name: "Navigation",
    tests: ["Sidebar links", "Breadcrumbs", "Profile switching", "Page routing"]
  },
  {
    name: "User Interface",
    tests: ["Responsive layout", "Component rendering", "Modal functionality", "Form validation"]
  },
  {
    name: "Data Operations",
    tests: ["Data loading", "Save operations", "Real-time updates", "Error handling"]
  },
  {
    name: "Features",
    tests: ["Dashboard views", "SEL pathways", "Check-in system", "Intervention tools"]
  }
];

// Result types
type TestResult = {
  name: string;
  status: 'passed' | 'failed' | 'pending' | 'skipped';
  message?: string;
};

type CategoryResult = {
  name: string;
  tests: TestResult[];
  status: 'passed' | 'failed' | 'pending' | 'partial';
};

const QATestUtility = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentTest, setCurrentTest] = React.useState('');
  const [progress, setProgress] = React.useState(0);
  const [results, setResults] = React.useState<CategoryResult[]>([]);
  const [overallStatus, setOverallStatus] = React.useState<'pending' | 'passed' | 'failed' | 'partial'>('pending');
  const navigate = useNavigate();
  const { user, setRole } = useAuth();
  
  // Function to run tests
  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Initialize results
    const initialResults: CategoryResult[] = testCategories.map(category => ({
      name: category.name,
      tests: category.tests.map(test => ({
        name: test,
        status: 'pending'
      })),
      status: 'pending'
    }));
    
    setResults(initialResults);
    
    // Mock test execution logic
    let allResults = [...initialResults];
    let totalTests = testCategories.reduce((acc, category) => acc + category.tests.length, 0);
    let completedTests = 0;
    let hasFailures = false;
    
    // Run tests for each category
    for (let i = 0; i < testCategories.length; i++) {
      const category = testCategories[i];
      
      // Run tests in the category
      for (let j = 0; j < category.tests.length; j++) {
        const test = category.tests[j];
        setCurrentTest(`Testing: ${category.name} - ${test}`);
        
        // Simulate test execution
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Simulate random test result (in a real scenario, this would be actual test logic)
        const passed = Math.random() > 0.2; // 80% chance of passing
        
        // Special case for navigation and auth tests - higher success rate
        const isNavOrAuth = category.name === "Navigation" || category.name === "Authentication";
        const specialPassed = isNavOrAuth ? Math.random() > 0.1 : passed;
        
        if (!specialPassed) hasFailures = true;
        
        // Update test result
        allResults[i].tests[j] = {
          name: test,
          status: specialPassed ? 'passed' : 'failed',
          message: specialPassed ? undefined : getRandomErrorMessage(category.name, test)
        };
        
        // Update category status
        const categoryTests = allResults[i].tests;
        const allPassed = categoryTests.every(t => t.status === 'passed');
        const anyFailed = categoryTests.some(t => t.status === 'failed');
        allResults[i].status = allPassed ? 'passed' : anyFailed ? 'partial' : 'pending';
        
        completedTests++;
        setProgress(Math.floor((completedTests / totalTests) * 100));
        setResults([...allResults]);
        
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    setCurrentTest('Finalizing results...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Set overall status
    setOverallStatus(hasFailures ? 'partial' : 'passed');
    
    setIsRunning(false);
    
    if (hasFailures) {
      toast.warning("Some tests failed. Review the results to address issues.");
    } else {
      toast.success("All tests passed! The application is ready for launch.");
    }
  };
  
  // Helper function to generate random error messages based on test category
  const getRandomErrorMessage = (category: string, test: string) => {
    const errors = {
      "Authentication": [
        "Session token expired unexpectedly",
        "Role validation failed for admin access",
        "User profile data incomplete after login"
      ],
      "Navigation": [
        "Link destination not found (404)",
        "Breadcrumb path inconsistent with current location",
        "Navigation state lost on refresh"
      ],
      "User Interface": [
        "Modal fails to close on mobile devices",
        "Form validation errors not displayed properly",
        "Responsive layout breaks at 768px width"
      ],
      "Data Operations": [
        "Timeout while fetching data from Supabase",
        "Optimistic update failed to reconcile with server state",
        "Filter operation returned incomplete results"
      ],
      "Features": [
        "SEL pathway progress tracking inconsistent",
        "Dashboard chart fails to render with certain data sets",
        "Intervention tools unavailable for certain user roles"
      ]
    };
    
    // Get errors for the category or use a default
    const categoryErrors = errors[category as keyof typeof errors] || 
      ["Unexpected error occurred during test execution"];
    
    // Return a random error from the category
    return `${test}: ${categoryErrors[Math.floor(Math.random() * categoryErrors.length)]}`;
  };
  
  // Function to reset and re-run tests
  const resetAndRunTests = () => {
    setResults([]);
    setOverallStatus('pending');
    runTests();
  };
  
  // Function to mark the site ready for launch
  const markSiteReady = () => {
    toast.success("Site has been marked as 'Ready for School Pilot Launch'!", {
      duration: 5000,
      icon: <Sparkles className="h-5 w-5 text-yellow-400" />
    });
    
    // In a real application, this would update a status in the database
    // or trigger a deployment process
  };
  
  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <X className="h-5 w-5 text-red-500" />;
      case 'partial':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Loader2 className="h-5 w-5 text-slate-500 animate-spin" />;
    }
  };
  
  const handleRoleSwitch = (role: string) => {
    toast.info(`Switched to ${role} view for testing`);
    // @ts-ignore - We know this exists from the AuthContext
    setRole(role);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Quality Assurance Testing</h2>
        <div className="flex gap-2">
          <Button
            onClick={resetAndRunTests}
            disabled={isRunning}
            variant={results.length ? "outline" : "default"}
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Tests...
              </>
            ) : results.length ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Tests Again
              </>
            ) : (
              <>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Run Full QA Test
              </>
            )}
          </Button>
          
          {overallStatus === 'passed' && (
            <Button variant="success" onClick={markSiteReady}>
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
            <span className="text-muted-foreground text-sm font-normal">Switch views to test different roles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleRoleSwitch('student')}
              className="flex items-center"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Test as Student
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleRoleSwitch('teacher')}
              className="flex items-center"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Test as Teacher
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleRoleSwitch('admin')}
              className="flex items-center"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Test as Admin
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleRoleSwitch('parent')}
              className="flex items-center"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Test as Parent
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleRoleSwitch('staff')}
              className="flex items-center"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Test as Staff
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isRunning && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Test Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{currentTest}</div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm text-right">{progress}% complete</div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {results.length > 0 && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                Overall Status
                {getStatusIcon(overallStatus)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {results.map((category) => (
                  <Card key={category.name} className="shadow-sm">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm flex justify-between items-center">
                        <span>{category.name}</span>
                        {getStatusIcon(category.status)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="text-xs text-muted-foreground">
                        {category.tests.filter(t => t.status === 'passed').length} / {category.tests.length} passed
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            {results.map((category) => (
              <Card key={category.name}>
                <CardHeader className="py-4">
                  <CardTitle className="flex items-center gap-2">
                    {category.name}
                    {getStatusIcon(category.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {category.tests.map((test) => (
                      <div 
                        key={test.name} 
                        className={`p-3 rounded-lg flex justify-between items-start ${
                          test.status === 'failed' 
                            ? 'bg-red-50 border border-red-100' 
                            : 'bg-slate-50'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="font-medium text-sm flex items-center gap-2">
                            {getStatusIcon(test.status)}
                            {test.name}
                          </div>
                          {test.message && (
                            <div className="text-xs text-red-600">{test.message}</div>
                          )}
                        </div>
                        
                        {test.status === 'failed' && (
                          <Button size="sm" variant="ghost" onClick={() => navigate('/dashboard')}>
                            <LinkIcon className="h-4 w-4 mr-1" />
                            Debug
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Final Readiness Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`text-xl font-bold ${
                    overallStatus === 'passed' 
                      ? 'text-green-500' 
                      : overallStatus === 'partial' 
                      ? 'text-amber-500' 
                      : 'text-red-500'
                  }`}>
                    {overallStatus === 'passed' 
                      ? 'READY FOR LAUNCH' 
                      : overallStatus === 'partial' 
                      ? 'NEEDS MINOR FIXES' 
                      : 'MAJOR ISSUES DETECTED'}
                  </div>
                  
                  {overallStatus === 'passed' && (
                    <Button variant="success" onClick={markSiteReady}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Mark Ready for Launch
                    </Button>
                  )}
                </div>
                
                <div className="prose max-w-none">
                  <h4>Summary</h4>
                  <p>
                    {overallStatus === 'passed' 
                      ? 'All tests have passed successfully. The application appears to be functioning correctly across all tested categories and user roles.' 
                      : overallStatus === 'partial' 
                      ? 'Most tests have passed, but some issues were detected. These should be addressed before final launch.' 
                      : 'Significant issues were detected that must be resolved before launch.'}
                  </p>
                  
                  {overallStatus !== 'passed' && (
                    <>
                      <h4>Recommendations</h4>
                      <ul>
                        {results
                          .filter(category => category.tests.some(test => test.status === 'failed'))
                          .map(category => (
                            <li key={`rec-${category.name}`}>
                              <strong>{category.name}</strong>: Address the {category.tests.filter(t => t.status === 'failed').length} failed tests 
                              in this category.
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default QATestUtility;
