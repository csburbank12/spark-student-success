
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";

export const DataAccessRequestForm = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestType, setRequestType] = useState("access");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      toast.error("Please provide details about your request");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would submit to a database or send an email
      console.log("Submitting request:", {
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        requestType,
        details,
        timestamp: new Date()
      });
      
      // Log this request for audit purposes
      await ErrorLoggingService.logError({
        action: "data_access_request",
        error_message: `User submitted a ${requestType} request`,
        profile_type: user?.role || "unknown"
      });

      toast.success("Your request has been submitted successfully");
      setDetails("");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>FERPA Data Request</CardTitle>
          <CardDescription>
            Submit a request to access, amend, or delete your educational records under FERPA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Request Type</Label>
            <RadioGroup value={requestType} onValueChange={setRequestType} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="access" id="access" />
                <Label htmlFor="access" className="cursor-pointer">Access my records</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="amendment" id="amendment" />
                <Label htmlFor="amendment" className="cursor-pointer">Request amendment to records</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deletion" id="deletion" />
                <Label htmlFor="deletion" className="cursor-pointer">Request deletion of records</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="complaint" id="complaint" />
                <Label htmlFor="complaint" className="cursor-pointer">File a FERPA complaint</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Request Details</Label>
            <Textarea
              id="details"
              placeholder="Please provide specific details about your request, including which records you're referring to..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Your request will be processed within 45 days as required by FERPA. You will be notified by email when your request has been processed.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
