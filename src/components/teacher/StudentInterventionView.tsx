
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, ClipboardList, BarChart2 } from 'lucide-react';
import { Loader } from '@/components/ui/loader';

import { MicroCoachPrompt } from '../MicroCoachPrompt';
import { useMicroCoach } from '@/contexts/MicroCoachContext';
import { 
  getTieredSupportRecommendations, 
  createTieredSupportRecommendation 
} from '@/utils/tieredSupportUtils';
import { 
  getStudentInterventionImpacts, 
  recordInterventionImpact 
} from '@/utils/interventionImpactUtils';

interface StudentInterventionViewProps {
  studentId: string;
  studentName: string;
  onBack: () => void;
}

const StudentInterventionView: React.FC<StudentInterventionViewProps> = ({
  studentId,
  studentName,
  onBack
}) => {
  const [tieredSupports, setTieredSupports] = useState<any[]>([]);
  const [interventionImpacts, setInterventionImpacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getMicroCoachHistory } = useMicroCoach();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const supports = await getTieredSupportRecommendations(studentId);
        const impacts = await getStudentInterventionImpacts(studentId);
        setTieredSupports(supports);
        setInterventionImpacts(impacts);
      } catch (err) {
        console.error("Error fetching student intervention data:", err);
        setError("Failed to load student data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (studentId) {
      fetchData();
    }
  }, [studentId]);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h2 className="text-2xl font-bold">{studentName}</h2>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center text-destructive">
              <p>{error}</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">{studentName}</h2>
      </div>
      
      <MicroCoachPrompt studentId={studentId} />
      
      <Tabs defaultValue="interventions">
        <TabsList>
          <TabsTrigger value="interventions">
            <ClipboardList className="mr-2 h-4 w-4" />
            Tiered Supports
          </TabsTrigger>
          <TabsTrigger value="impacts">
            <BarChart2 className="mr-2 h-4 w-4" />
            Intervention Impacts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="interventions">
          <Card>
            <CardHeader>
              <CardTitle>Tiered Support Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <Loader />
                </div>
              ) : tieredSupports.length === 0 ? (
                <p className="text-muted-foreground">No support recommendations yet.</p>
              ) : (
                tieredSupports.map((support) => (
                  <div key={support.id} className="border-b py-2">
                    <div className="font-medium">Tier {support.tier} Support</div>
                    <p className="text-sm text-muted-foreground">{support.recommendation_notes}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impacts">
          <Card>
            <CardHeader>
              <CardTitle>Intervention Impact Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <Loader />
                </div>
              ) : interventionImpacts.length === 0 ? (
                <p className="text-muted-foreground">No intervention impacts recorded.</p>
              ) : (
                interventionImpacts.map((impact) => (
                  <div key={impact.id} className="border-b py-2">
                    <div className="font-medium">Tier {impact.tier} Intervention</div>
                    <p className="text-sm text-muted-foreground">
                      Impact Score: {impact.impact_score || 'Not rated'}
                    </p>
                    <p className="text-xs">{impact.outcome_notes}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentInterventionView;
