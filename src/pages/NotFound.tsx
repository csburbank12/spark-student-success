
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { useErrorLogging } from "@/hooks/useErrorLogging";

const NotFound = () => {
  const location = useLocation();
  const { log404Error } = useErrorLogging();

  useEffect(() => {
    log404Error(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <GraduationCap className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="text-6xl font-heading font-bold">404</h1>
        <h2 className="text-2xl font-heading">Oops! That page doesn't exist</h2>
        <p className="text-muted-foreground mb-6">
          But you're still on the right track. Let's get you back where you belong.
        </p>
        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
