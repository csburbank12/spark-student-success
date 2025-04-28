
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Play, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "sonner";

type TestType = "ui" | "api" | "integration" | "e2e";
type TestStatus = "pending" | "running" | "passed" | "failed";

interface Test {
  id: string;
  name: string;
  type: TestType;
  status: TestStatus;
  duration?: number;
  errorMessage?: string;
}

interface TestGroup {
  id: string;
  name: string;
  tests: Test[];
}

// Mock test data
const initialTestGroups: TestGroup[] = [
  {
    id: "grp1",
    name: "Authentication Tests",
    tests: [
      { id: "test1", name: "Login Flow", type: "ui", status: "pending" },
      { id: "test2", name: "Registration Flow", type: "ui", status: "pending" },
      { id: "test3", name: "Password Reset", type: "ui", status: "pending" },
    ]
  },
  {
    id: "grp2",
    name: "Student Dashboard Tests",
    tests: [
      { id: "test4", name: "Dashboard Rendering", type: "ui", status: "pending" },
      { id: "test5", name: "Mood Tracking Widget", type: "integration", status: "pending" },
      { id: "test6", name: "Profile Information", type: "ui", status: "pending" },
    ]
  },
  {
    id: "grp3",
    name: "API Endpoint Tests",
    tests: [
      { id: "test7", name: "Get Student Data", type: "api", status: "pending" },
      { id: "test8", name: "Mood Check-in API", type: "api", status: "pending" },
      { id: "test9", name: "User Preferences API", type: "api", status: "pending" },
    ]
  }
];

const QATestUtility: React.FC = () => {
  const [testGroups, setTestGroups] = useState<TestGroup[]>(initialTestGroups);
  const [isRunning, setIsRunning] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>("grp1");
  const [newTestName, setNewTestName] = useState("");
  const [newTestType, setNewTestType] = useState<TestType>("ui");
  
  // Counts for summary stats
  const allTests = testGroups.flatMap(group => group.tests);
  const passedCount = allTests.filter(test => test.status === "passed").length;
  const failedCount = allTests.filter(test => test.status === "failed").length;
  const pendingCount = allTests.filter(test => test.status === "pending" || test.status === "running").length;
  
  // Get the active group
  const activeGroup = testGroups.find(group => group.id === activeGroupId);

  // Run a single test
  const runTest = (groupId: string, testId: string) => {
    setTestGroups(prevGroups => {
      return prevGroups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            tests: group.tests.map(test => {
              if (test.id === testId) {
                return {
                  ...test,
                  status: "running"
                };
              }
              return test;
            })
          };
        }
        return group;
      });
    });
    
    // Simulate test running
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% pass rate
      const duration = Math.floor(Math.random() * 500) + 100;
      
      setTestGroups(prevGroups => {
        return prevGroups.map(group => {
          if (group.id === groupId) {
            return {
              ...group,
              tests: group.tests.map(test => {
                if (test.id === testId) {
                  return {
                    ...test,
                    status: success ? "passed" : "failed",
                    duration,
                    errorMessage: success ? undefined : "Assertion failed: expected element to be visible"
                  };
                }
                return test;
              })
            };
          }
          return group;
        });
      });
      
      toast(success ? "Test passed successfully" : "Test failed", {
        description: `${activeGroup?.tests.find(t => t.id === testId)?.name} ${success ? "completed successfully" : "failed with errors"}`,
        position: "bottom-right"
      });
    }, 1500);
  };
  
  // Run all tests in a group
  const runGroupTests = (groupId: string) => {
    const group = testGroups.find(g => g.id === groupId);
    if (!group) return;
    
    setIsRunning(true);
    
    // Mark all as running
    setTestGroups(prevGroups => {
      return prevGroups.map(g => {
        if (g.id === groupId) {
          return {
            ...g,
            tests: g.tests.map(test => ({
              ...test,
              status: "running"
            }))
          };
        }
        return g;
      });
    });
    
    // Run tests sequentially with delays
    group.tests.forEach((test, index) => {
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% pass rate
        const duration = Math.floor(Math.random() * 500) + 100;
        
        setTestGroups(prevGroups => {
          return prevGroups.map(g => {
            if (g.id === groupId) {
              return {
                ...g,
                tests: g.tests.map((t, i) => {
                  if (i === index) {
                    return {
                      ...t,
                      status: success ? "passed" : "failed",
                      duration,
                      errorMessage: success ? undefined : "Assertion failed: expected element to be visible"
                    };
                  }
                  return t;
                })
              };
            }
            return g;
          });
        });
        
        // If last test, set running to false
        if (index === group.tests.length - 1) {
          setIsRunning(false);
        }
        
      }, 1500 * (index + 1));
    });
  };
  
  // Run all tests across all groups
  const runAllTests = () => {
    setIsRunning(true);
    
    // Mark all as running
    setTestGroups(prevGroups => {
      return prevGroups.map(group => ({
        ...group,
        tests: group.tests.map(test => ({
          ...test,
          status: "running"
        }))
      }));
    });
    
    // Flatten all tests and run them sequentially
    const allTests = testGroups.flatMap(group => 
      group.tests.map(test => ({ groupId: group.id, ...test }))
    );
    
    allTests.forEach((test, index) => {
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% pass rate
        const duration = Math.floor(Math.random() * 500) + 100;
        
        setTestGroups(prevGroups => {
          return prevGroups.map(group => {
            if (group.id === test.groupId) {
              return {
                ...group,
                tests: group.tests.map(t => {
                  if (t.id === test.id) {
                    return {
                      ...t,
                      status: success ? "passed" : "failed",
                      duration,
                      errorMessage: success ? undefined : "Assertion failed: expected element to be visible"
                    };
                  }
                  return t;
                })
              };
            }
            return group;
          });
        });
        
        // If last test, set running to false
        if (index === allTests.length - 1) {
          setIsRunning(false);
          
          // Show summary toast
          const finalTests = testGroups.flatMap(group => group.tests);
          const finalPassed = finalTests.filter(test => test.status === "passed").length;
          const finalFailed = finalTests.filter(test => test.status === "failed").length;
          
          toast(finalFailed === 0 ? "All tests passed!" : "Some tests failed", {
            description: `${finalPassed} passed, ${finalFailed} failed`,
            position: "bottom-right",
          });
        }
        
      }, 800 * (index + 1));
    });
  };
  
  // Add a new test
  const addNewTest = () => {
    if (!activeGroupId || !newTestName.trim()) return;
    
    const newTest: Test = {
      id: `test-${Date.now()}`,
      name: newTestName,
      type: newTestType,
      status: "pending"
    };
    
    setTestGroups(prevGroups => {
      return prevGroups.map(group => {
        if (group.id === activeGroupId) {
          return {
            ...group,
            tests: [...group.tests, newTest]
          };
        }
        return group;
      });
    });
    
    setNewTestName("");
    toast("Test added successfully", {
      description: `Added "${newTestName}" to ${activeGroup?.name}`,
    });
  };
  
  // Get badge variant based on test status
  const getStatusBadge = (status: TestStatus) => {
    switch (status) {
      case "running":
        return <Badge variant="secondary" className="animate-pulse">Running...</Badge>;
      case "passed":
        return <Badge variant="success" className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Passed</Badge>; // Changed from "success" to match available variants
      case "failed":
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>; // Changed from "warning" to "secondary"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">QA Test Suite</h2>
        <Button 
          onClick={runAllTests} 
          disabled={isRunning}
          className={isRunning ? "animate-pulse" : ""}
        >
          <PlayCircle className="mr-1 h-4 w-4" />
          Run All Tests
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Test Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {testGroups.map(group => (
                  <Button 
                    key={group.id} 
                    variant={activeGroupId === group.id ? "default" : "outline"}
                    onClick={() => setActiveGroupId(group.id)}
                    className="w-full justify-start"
                  >
                    {group.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Test Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Tests</span>
                  <span className="font-bold">{allTests.length}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-2 bg-green-50 rounded-md">
                    <span className="font-bold text-green-700">{passedCount}</span>
                    <span className="text-xs text-green-600">Passed</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-red-50 rounded-md">
                    <span className="font-bold text-red-700">{failedCount}</span>
                    <span className="text-xs text-red-600">Failed</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
                    <span className="font-bold text-gray-700">{pendingCount}</span>
                    <span className="text-xs text-gray-600">Pending</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-9">
          <Card>
            <CardHeader className="flex flex-col space-y-1.5 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{activeGroup?.name || "Select a Test Group"}</CardTitle>
                <Button 
                  size="sm" 
                  disabled={!activeGroup || isRunning}
                  onClick={() => activeGroup && runGroupTests(activeGroup.id)}
                >
                  <Play className="mr-1 h-4 w-4" />
                  Run Group
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeGroup ? (
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeGroup.tests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8">
                              No tests found in this group
                            </TableCell>
                          </TableRow>
                        ) : (
                          activeGroup.tests.map(test => (
                            <TableRow key={test.id}>
                              <TableCell className="font-medium">{test.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {test.type === "ui" ? "UI" : 
                                   test.type === "api" ? "API" : 
                                   test.type === "e2e" ? "E2E" : "Integration"}
                                </Badge>
                              </TableCell>
                              <TableCell>{getStatusBadge(test.status)}</TableCell>
                              <TableCell>
                                {test.duration ? `${test.duration}ms` : "-"}
                              </TableCell>
                              <TableCell>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  disabled={test.status === "running" || isRunning}
                                  onClick={() => runTest(activeGroup.id, test.id)}
                                >
                                  <Play className="h-3 w-3 mr-1" />
                                  Run
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {activeGroup.tests.some(test => test.status === "failed") && (
                    <div className="border border-red-200 rounded-md p-4 bg-red-50">
                      <h3 className="font-medium text-red-700 mb-2">Error Details</h3>
                      <div className="space-y-2">
                        {activeGroup.tests
                          .filter(test => test.status === "failed")
                          .map(test => (
                            <div key={test.id} className="pl-3 border-l-2 border-red-500">
                              <p className="font-medium">{test.name}</p>
                              <p className="text-sm text-red-800 font-mono">{test.errorMessage}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Add New Test</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="test-name">Test Name</Label>
                        <Input 
                          id="test-name"
                          placeholder="Enter test name"
                          value={newTestName}
                          onChange={(e) => setNewTestName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="test-type">Test Type</Label>
                        <select
                          id="test-type"
                          className="w-full p-2 border rounded-md bg-transparent"
                          value={newTestType}
                          onChange={(e) => setNewTestType(e.target.value as TestType)}
                        >
                          <option value="ui">UI Test</option>
                          <option value="api">API Test</option>
                          <option value="integration">Integration Test</option>
                          <option value="e2e">End-to-End Test</option>
                        </select>
                      </div>
                    </div>
                    <Button onClick={addNewTest} disabled={!newTestName}>Add Test</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48">
                  <p className="text-muted-foreground">Select a test group from the sidebar</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QATestUtility;
