
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const UnknownRoleView = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-medium mb-2">Unknown user role</h2>
        <p className="text-muted-foreground mb-4">Please contact an administrator.</p>
        <Button variant="outline" asChild>
          <Link to="/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  );
};
