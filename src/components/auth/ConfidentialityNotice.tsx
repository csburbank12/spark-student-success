
import { Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const ConfidentialityNotice = () => {
  return (
    <Alert className="bg-emerald-50 border-emerald-200 text-emerald-900">
      <Lock className="h-5 w-5" />
      <AlertDescription className="mt-2 text-sm">
        <strong className="block mb-2">Confidential Platform Access</strong>
        This website contains proprietary educational data, tools, and intellectual property belonging to ThriveTrackED. 
        By logging in, you agree not to disclose, distribute, or misuse any information accessed within. 
        Unauthorized use or sharing is strictly prohibited and may result in legal or administrative action.
      </AlertDescription>
    </Alert>
  );
};
