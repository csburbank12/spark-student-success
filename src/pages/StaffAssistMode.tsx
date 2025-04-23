import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { HelpCircle, Bookmark, Clock, CheckCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { UserRole } from "@/types/roles";

const behaviorSituations = [
  { id: "refusal", label: "Student Refusal", category: "compliance" },
  { id: "verbal_outburst", label: "Verbal Outburst", category: "disruptive" },
  { id: "withdrawal", label: "Social Withdrawal", category: "emotional" },
  { id: "agitation", label: "Physical Agitation", category: "physical" },
  { id: "defiance", label: "Defiance", category: "compliance" },
  { id: "distraction", label: "Off-Task/Distracted", category: "focus" },
  { id: "anxiety", label: "Anxiety Expression", category: "emotional" },
  { id: "conflict", label: "Peer Conflict", category: "social" },
  { id: "other", label: "Other", category: "miscellaneous" }
];

const responseStrategies = {
  refusal: [
    {
      title: "Offer Limited Choices",
      description: "Provide two acceptable options rather than demanding compliance.",
      script: "I see you're not ready to join the activity. Would you prefer to start with part B or take 2 minutes to prepare first?",
      research: "Choice theory suggests that offering controlled choices increases student autonomy and reduces defiance (Glasser, 1998)."
    },
    {
      title: "Acknowledge Feelings",
      description: "Validate emotions before addressing behavior.",
      script: "I understand this assignment feels challenging right now. It's okay to feel frustrated. Let's identify one small section to start with.",
      research: "Emotional validation creates psychological safety necessary for behavioral regulation (Gottman & Declaire, 1997)."
    }
  ],
  verbal_outburst: [
    {
      title: "De-escalation Space",
      description: "Direct student to a predetermined calming area.",
      script: "I can see you're feeling very upset right now. Let's use the reset corner for 3 minutes to help you calm your body and voice.",
      research: "Designated regulation spaces help students develop self-management skills during emotional arousal (Kuypers, 2011)."
    },
    {
      title: "Neutral Redirection",
      description: "Acknowledge emotion while setting clear expectations.",
      script: "I hear you're feeling frustrated. In our classroom, we use respectful voices to express our needs. When you're ready to talk calmly, I'm here to help.",
      research: "Emotionally neutral responses prevent reinforcement of attention-seeking behaviors (Greene, 2014)."
    }
  ],
  withdrawal: [
    {
      title: "Non-verbal Connection",
      description: "Use a pre-established signal system for check-ins.",
      script: "[Make agreed-upon hand signal] I'm checking if you need: Space, Help, or a Break? You can point or nod.",
      research: "Non-verbal communication reduces social pressure while maintaining connection (Buron & Curtis, 2012)."
    },
    {
      title: "Parallel Activity",
      description: "Invite participation in a less socially demanding way.",
      script: "Would you like to be my helper with organizing these materials while we work on this activity? You can join the group when you feel ready.",
      research: "Parallel engagement allows gradual social reintegration (Wolfberg, 2009)."
    }
  ],
  agitation: [
    {
      title: "Movement Break",
      description: "Provide a purposeful physical activity.",
      script: "I notice your body needs to move. Could you help deliver this message to the office? Or would you prefer to do 5 wall pushes first?",
      research: "Proprioceptive input helps regulate the nervous system and reduce physical agitation (Kranowitz, 2005)."
    },
    {
      title: "Modeling Regulation",
      description: "Demonstrate calming strategies in the moment.",
      script: "Let's take three deep breaths together like this. [Demonstrate slow breathing] I'll count while we breathe in for 4, hold for 2, out for 4.",
      research: "Co-regulation through adult modeling helps students internalize self-regulation strategies (Shanker, 2016)."
    }
  ],
  defiance: [
    {
      title: "Proximity & Private Conversation",
      description: "Move closer and speak quietly to reduce defensiveness.",
      script: "[Move near student, speak quietly] 'I see you're having a hard time getting started. What's one small step you could take right now?'",
      research: "Private redirection preserves student dignity and reduces public power struggles (Curwin et al., 2008)."
    },
    {
      title: "Strategic Ignoring + Positive Reinforcement",
      description: "Briefly ignore defiant statements while immediately acknowledging any positive movement.",
      script: "[If student says 'I won't do it'] Continue activity, then: 'I appreciate that you're looking at the materials now. That's a good first step.'",
      research: "Differential attention reinforces desired behaviors while reducing attention to challenging behaviors (Alberto & Troutman, 2017)."
    }
  ],
  distraction: [
    {
      title: "Visual Timer",
      description: "Set a concrete, visible time expectation.",
      script: "I'll set this timer for 10 minutes of focused work. When it rings, you can take a 2-minute break. What do you need to get started?",
      research: "Visual timers make abstract time concepts concrete and manageable (Barkley, 2020)."
    },
    {
      title: "Task Chunking",
      description: "Break the assignment into smaller, more manageable parts.",
      script: "Let's just focus on completing these three problems first. Which one would you like to start with?",
      research: "Task chunking reduces cognitive load and increases task initiation (Meltzer, 2018)."
    }
  ],
  anxiety: [
    {
      title: "Cognitive Reframing",
      description: "Help student identify and challenge anxious thoughts.",
      script: "What's the worry telling you right now? Let's think about what might really happen and what you know how to handle.",
      research: "Cognitive restructuring helps students recognize and address distorted thinking patterns (Kendall, 2017)."
    },
    {
      title: "Grounding Exercise",
      description: "Use sensory awareness to reconnect to the present.",
      script: "Let's try the 5-4-3-2-1 exercise. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you like about yourself.",
      research: "Sensory grounding techniques help reduce anxiety by orienting to the present moment (Linehan, 2014)."
    }
  ],
  conflict: [
    {
      title: "Conflict Resolution Script",
      description: "Guide students through a structured conversation.",
      script: "I'll help you both share your perspectives. Each person gets to speak while the other listens. Start with 'I felt ___ when ___' and then we'll work on solutions together.",
      research: "Structured conflict resolution teaches essential social skills and reduces future conflicts (Johnson & Johnson, 2005)."
    },
    {
      title: "Collaborative Problem-Solving",
      description: "Involve students in generating their own solutions.",
      script: "What's happening that's not working for each of you? Let's list some possible solutions that might work for everyone. Then we can try one out.",
      research: "Student-generated solutions increase ownership and follow-through (Greene, 2016)."
    }
  ],
  other: [
    {
      title: "Behavior Mapping",
      description: "Help student identify triggers, feelings, and choices.",
      script: "Let's figure this out together. What happened first? How did you feel? What did you do next? What could be a different choice next time?",
      research: "Explicit behavior mapping helps students develop metacognitive skills about their behavioral responses (McIntosh & Goodman, 2016)."
    },
    {
      title: "Take a Break and Return",
      description: "Allow student space to reset with a clear return plan.",
      script: "It seems like you need some space right now. You can take 5 minutes at the cool-down desk. I'll set a timer, and when it beeps, we'll check in about rejoining the activity.",
      research: "Structured breaks with clear parameters teach self-regulation while maintaining expectations (Smith et al., 2017)."
    }
  ]
};

interface BehaviorLog {
  id: string;
  staff_id: string;
  student_id: string | null;
  situation_type: string;
  intervention_used: string;
  notes: string;
  effectiveness_rating: number | null;
  created_at: string;
}

const StaffAssistMode: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [situation, setSituation] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("assist");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  
  const isStaffOrAdmin = user?.role === 'staff' || user?.role === 'admin';
  
  const { data: students } = useQuery({
    queryKey: ["staff-students"],
    queryFn: async () => {
      if (!user?.id || !isStaffOrAdmin) return [];
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student");
        
      if (error) throw error;
      return data || [];
    },
    enabled: isStaffOrAdmin,
  });
  
  const { data: behaviorLogs, refetch: refetchLogs } = useQuery({
    queryKey: ["behavior-logs", user?.id],
    queryFn: async () => {
      if (!user?.id || !isStaffOrAdmin) return [];
      
      const { data, error } = await supabase
        .from("behavior_logs")
        .select("*")
        .eq("staff_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      return data as Tables<"behavior_logs">[] || [];
    },
    enabled: isStaffOrAdmin,
  });
  
  const logIntervention = useMutation({
    mutationFn: async (data: {
      studentId: string | null;
      situationType: string;
      interventionUsed: string;
      notes: string;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { error } = await supabase
        .from("behavior_logs")
        .insert({
          staff_id: user.id,
          student_id: data.studentId,
          situation_type: data.situationType,
          intervention_used: data.interventionUsed,
          notes: data.notes,
          created_at: new Date().toISOString()
        });
        
      if (error) throw error;
    },
    onSuccess: () => {
      refetchLogs();
    },
  });
  
  const updateEffectiveness = useMutation({
    mutationFn: async ({ logId, rating }: { logId: string; rating: number }) => {
      const { error } = await supabase
        .from("behavior_logs")
        .update({ effectiveness_rating: rating })
        .eq("id", logId);
        
      if (error) throw error;
    },
    onSuccess: () => {
      toast("Effectiveness rating saved");
      refetchLogs();
    },
    onError: (error) => {
      toast("Failed to save rating", {
        description: error.message,
      });
    }
  });
  
  const handleAssist = () => {
    if (!situation) {
      toast("Please select a situation type");
      return;
    }
    
    if (!selectedResponse) {
      toast("Please select a response strategy");
      return;
    }
    
    logIntervention.mutate({
      studentId: selectedStudentId,
      situationType: situation,
      interventionUsed: selectedResponse,
      notes: notes
    });
  };
  
  const resetForm = () => {
    setSituation(null);
    setSelectedResponse(null);
    setNotes("");
    setSelectedStudentId(null);
  };
  
  const suggestedResponses = situation ? responseStrategies[situation as keyof typeof responseStrategies] : [];
  
  if (!isStaffOrAdmin) {
    return (
      <div className="max-w-lg mx-auto mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You do not have permission to access Staff Assist Mode.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Staff Assist Mode</h2>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assist">Get Assistance</TabsTrigger>
          <TabsTrigger value="history">Intervention History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assist" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Behavior Response Assistant
              </CardTitle>
              <CardDescription>
                Get immediate, research-backed strategies for classroom behaviors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="student-select" className="text-sm font-medium">
                  Select Student (Optional)
                </label>
                <Select value={selectedStudentId || ""} onValueChange={setSelectedStudentId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific student</SelectItem>
                    {students?.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.first_name} {student.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="situation-select" className="text-sm font-medium">
                  What's happening right now?
                </label>
                <Select value={situation || ""} onValueChange={setSituation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the situation type" />
                  </SelectTrigger>
                  <SelectContent>
                    {behaviorSituations.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {situation && (
                <>
                  <div className="border rounded-md p-4 bg-muted/30">
                    <h3 className="text-lg font-medium mb-3">Recommended Strategies:</h3>
                    <div className="space-y-4">
                      {suggestedResponses.map((response, index) => (
                        <Card key={index} className={`cursor-pointer transition-all ${selectedResponse === response.title ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'hover:border-primary/50'}`} onClick={() => setSelectedResponse(response.title)}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-base">{response.title}</h4>
                              {selectedResponse === response.title && (
                                <CheckCircle className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{response.description}</p>
                            
                            <div className="mt-3 p-3 bg-secondary/20 rounded-md">
                              <p className="text-sm font-medium">Sample Script:</p>
                              <p className="italic text-sm mt-1">{response.script}</p>
                            </div>
                            
                            <div className="mt-3 text-xs text-muted-foreground">
                              <p className="font-medium">Research:</p>
                              <p>{response.research}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium">
                      Notes (Optional)
                    </label>
                    <Textarea
                      id="notes"
                      placeholder="Add additional context or observations"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>
                Reset
              </Button>
              <Button 
                onClick={handleAssist} 
                disabled={!situation || !selectedResponse}
                className="gap-2"
              >
                <Bookmark className="h-4 w-4" />
                Log Intervention
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Intervention History</CardTitle>
              <CardDescription>
                Track patterns and effectiveness of previous interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {behaviorLogs && behaviorLogs.length > 0 ? (
                <div className="space-y-4">
                  {behaviorLogs.map((log) => {
                    const student = students?.find(s => s.id === log.student_id);
                    const studentName = student ? `${student.first_name} ${student.last_name}` : "No specific student";
                    
                    const situationItem = behaviorSituations.find(s => s.id === log.situation_type);
                    
                    return (
                      <Card key={log.id} className="overflow-hidden">
                        <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">
                              {situationItem?.label || log.situation_type}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span>{studentName}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>
                                  {new Date(log.created_at).toLocaleDateString()} at {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <Button
                                key={rating}
                                variant={log.effectiveness_rating === rating ? "default" : "outline"}
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => updateEffectiveness.mutate({ logId: log.id, rating })}
                              >
                                {rating}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-2">
                            <span className="text-sm font-medium">Strategy used:</span>
                            <p className="mt-1">{log.intervention_used}</p>
                          </div>
                          {log.notes && (
                            <div className="mt-3">
                              <span className="text-sm font-medium">Notes:</span>
                              <p className="mt-1 text-sm text-muted-foreground">{log.notes}</p>
                            </div>
                          )}
                          {log.effectiveness_rating && (
                            <div className="mt-3 flex items-center gap-2">
                              <span className="text-sm font-medium">Effectiveness:</span>
                              <div className="flex gap-1">
                                {Array.from({ length: log.effectiveness_rating }).map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-primary" />
                                ))}
                                {Array.from({ length: 5 - log.effectiveness_rating }).map((_, i) => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-muted" />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Interventions Logged</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    When you log interventions using the Assist tab, they'll appear here for tracking and analysis.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffAssistMode;
