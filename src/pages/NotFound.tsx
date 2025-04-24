
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, HelpCircle, Home } from "lucide-react";
import { useErrorLogging } from "@/hooks/useErrorLogging";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { log404Error } = useErrorLogging();
  const { user } = useAuth();

  useEffect(() => {
    log404Error(location.pathname);
    
    // If the URL is exactly "/404", don't log an error
    if (location.pathname !== "/404") {
      console.log(`404 error: ${location.pathname} not found`);
    }
  }, [location.pathname, log404Error]);

  // Handle redirects to dashboard based on authentication status
  const handleDashboardRedirect = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

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
          <Button size="lg" className="w-full" onClick={handleDashboardRedirect}>
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/help">
              <HelpCircle className="mr-2 h-4 w-4" />
              Get Help
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
