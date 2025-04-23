
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { ReviewStepProps } from '../types';

export const Step5Review: React.FC<ReviewStepProps> = ({ schoolData, stepStatus }) => {
  const isCompleted = 
    stepStatus.step1Complete &&
    stepStatus.step2Complete &&
    stepStatus.step3Complete &&
    stepStatus.step4Complete;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">Review & Complete Setup</h3>
      <p className="text-muted-foreground">Review your school setup information before completing the onboarding process.</p>
      
      <div className="grid gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className={`rounded-full h-6 w-6 flex items-center justify-center mr-3 ${stepStatus.step1Complete ? 'bg-green-100' : 'bg-amber-100'}`}>
                {stepStatus.step1Complete ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <span className="h-4 w-4 text-amber-600">!</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-medium">School Information</h4>
                {stepStatus.step1Complete ? (
                  <div className="mt-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-muted-foreground">School Name:</div>
                      <div>{schoolData.name}</div>
                      <div className="text-muted-foreground">School Code:</div>
                      <div>{schoolData.code}</div>
                      <div className="text-muted-foreground">Address:</div>
                      <div>{schoolData.address}</div>
                      {schoolData.email && (
                        <>
                          <div className="text-muted-foreground">Email:</div>
                          <div>{schoolData.email}</div>
                        </>
                      )}
                      {schoolData.phone && (
                        <>
                          <div className="text-muted-foreground">Phone:</div>
                          <div>{schoolData.phone}</div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-amber-600 mt-1">
                    Basic information is incomplete. Please go back to Step 1 and provide the required information.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className={`rounded-full h-6 w-6 flex items-center justify-center mr-3 ${stepStatus.step2Complete ? 'bg-green-100' : 'bg-amber-100'}`}>
                {stepStatus.step2Complete ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <span className="h-4 w-4 text-amber-600">!</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-medium">School Configuration</h4>
                {stepStatus.step2Complete ? (
                  <div className="mt-2 text-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-muted-foreground">Logo:</div>
                      {schoolData.logoUrl ? (
                        <div className="h-8 w-8 border rounded overflow-hidden">
                          <img src={schoolData.logoUrl} alt="School logo" className="h-full w-full object-contain" />
                        </div>
                      ) : (
                        <div className="text-muted-foreground">No logo uploaded</div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-muted-foreground">Primary Color:</div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: schoolData.primaryColor }}
                        ></div>
                        <span>{schoolData.primaryColor}</span>
                      </div>
                    </div>
                    {schoolData.secondaryColor && (
                      <div className="flex items-center gap-3 mt-2">
                        <div className="text-muted-foreground">Secondary Color:</div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: schoolData.secondaryColor }}
                          ></div>
                          <span>{schoolData.secondaryColor}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-amber-600 mt-1">
                    Configuration is incomplete. Please go back to Step 2 and select at least a primary color.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className={`rounded-full h-6 w-6 flex items-center justify-center mr-3 ${stepStatus.step3Complete ? 'bg-green-100' : 'bg-amber-100'}`}>
                {stepStatus.step3Complete ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <span className="h-4 w-4 text-amber-600">!</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-medium">Staff Import</h4>
                {stepStatus.step3Complete ? (
                  <p className="text-sm text-green-600 mt-1">
                    35 staff members imported successfully.
                  </p>
                ) : (
                  <p className="text-sm text-amber-600 mt-1">
                    Staff import is incomplete. Please go back to Step 3 and import staff information.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className={`rounded-full h-6 w-6 flex items-center justify-center mr-3 ${stepStatus.step4Complete ? 'bg-green-100' : 'bg-amber-100'}`}>
                {stepStatus.step4Complete ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <span className="h-4 w-4 text-amber-600">!</span>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-base font-medium">Student Import</h4>
                {stepStatus.step4Complete ? (
                  <p className="text-sm text-green-600 mt-1">
                    128 students imported successfully.
                  </p>
                ) : (
                  <p className="text-sm text-amber-600 mt-1">
                    Student import is incomplete. Please go back to Step 4 and import student information.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="pt-4">
        <Button 
          className="w-full"
          disabled={!isCompleted}
        >
          Complete Setup & Launch School
        </Button>
        
        {!isCompleted && (
          <p className="text-sm text-center text-amber-600 mt-2">
            Please complete all required steps before finalizing your school setup.
          </p>
        )}
      </div>
    </div>
  );
};
