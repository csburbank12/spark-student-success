
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <GraduationCap className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="text-6xl font-heading font-bold">404</h1>
        <h2 className="text-2xl font-heading">Page not found</h2>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the page you're looking for. The link might be
          incorrect or the page may have been moved.
        </p>
        <Button asChild size="lg">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
