
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, HelpCircle, Home, ArrowLeft } from "lucide-react";
import { useErrorLogging } from "@/hooks/useErrorLogging";
import { useAuth } from "@/contexts/AuthContext";
import { getFallbackDashboardByRole } from "@/utils/navigationUtils";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { log404Error } = useErrorLogging();
  const { user } = useAuth();
  const userRole = user?.role || '';
  
  // Calculate appropriate dashboard route
  const dashboardRoute = user ? getFallbackDashboardByRole(userRole) : '/login';
  
  // Get referring page if available
  const referrer = location.state?.from || null;

  useEffect(() => {
    // Don't log if explicitly navigating to the 404 page
    if (location.pathname !== "/404") {
      log404Error(location.pathname);
      console.log(`404 error: ${location.pathname} not found`);
    }
  }, [location.pathname, log404Error]);

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
          <Button size="lg" className="w-full" onClick={() => navigate(dashboardRoute)}>
            <Home className="mr-2 h-4 w-4" />
            {user ? 'Return to Dashboard' : 'Go to Login'}
          </Button>
          
          {referrer && (
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          )}
          
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
