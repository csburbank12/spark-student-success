
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const NotLoggedInView = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-medium mb-2">Not logged in</h2>
        <p className="text-muted-foreground mb-4">Please log in to view your dashboard.</p>
        <Button asChild>
          <Link to="/login">Go to Login</Link>
        </Button>
      </div>
    </div>
  );
};
