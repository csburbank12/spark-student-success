
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { BarChart2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Loader } from "@/components/ui/loader";

const SUGGESTIONS = [
  { threshold: 3.5, message: "Consider a class or advisory reconnection activity for all grades below 3.5." },
  { threshold: 4.2, message: "Send an encouraging all-staff message and celebrate progress for grades above 4.2." },
  { threshold: 2.5, message: "Immediate check: Contact principal and review urgent climate factors for grades below 2.5." },
];

const AdminPulseTrends: React.FC = () => {
  const { user } = useAuth();
  const [gradeLevel, setGradeLevel] = useState("all");

  // Only show if admin
  if (user?.role !== "admin") {
    return (
      <div className="max-w-lg mx-auto mt-20">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You do not have permission to view this data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data, isLoading } = useQuery({
    queryKey: ["culture_pulse_trends", gradeLevel],
    queryFn: async () => {
      let query = supabase
        .from("culture_pulse_trends")
        .select("*")
        .order("week_end", { ascending: false })
        .limit(24);

      if (gradeLevel !== "all") {
        query = query.eq("grade_level", gradeLevel);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user?.id,
  });

  // Find "at risk" grades below suggestions thresholds & messages
  const actions: string[] = [];
  if (data && Array.isArray(data) && data.length > 0) {
    const byGrade: Record<string, number> = {};
    data.forEach(d => {
      if (d.grade_level) {
        if (!byGrade[d.grade_level]) byGrade[d.grade_level] = 0;
        byGrade[d.grade_level] += Number(d.avg_belonging || 0);
      }
    });
    for (const [grade, avg] of Object.entries(byGrade)) {
      const msg = SUGGESTIONS.find(s => avg && avg < s.threshold)?.message;
      if (msg) actions.push(`Grade ${grade}: ${msg}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <BarChart2 className="inline-block mr-2" /> Culture Pulse Trend Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8"><Loader size="lg" /></div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Week</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Avg. Mood</TableHead>
                    <TableHead>Avg. Safety</TableHead>
                    <TableHead>Avg. Belonging</TableHead>
                    <TableHead>Total Responses</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(data || []).map((trend: any) => (
                    <TableRow key={trend.id}>
                      <TableCell>{trend.week_start} - {trend.week_end}</TableCell>
                      <TableCell>{trend.grade_level || "All"}</TableCell>
                      <TableCell>{trend.avg_mood?.toFixed(2)}</TableCell>
                      <TableCell>{trend.avg_safety?.toFixed(2)}</TableCell>
                      <TableCell>{trend.avg_belonging?.toFixed(2)}</TableCell>
                      <TableCell>{trend.total_responses}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6">
                <strong>Suggested Admin Actions:</strong>
                <ul className="list-disc ml-6 mt-1">
                  {actions.length === 0 && <li>No critical actions at this time. Keep monitoring trends!</li>}
                  {actions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPulseTrends;
