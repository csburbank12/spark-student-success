
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, HelpCircle, Home, ArrowLeft } from "lucide-react";
import { useErrorLogging } from "@/hooks/useErrorLogging";
import { useAuth } from "@/contexts/AuthContext";
import { getFallbackDashboardByRole } from "@/utils/navigationUtils";
import { UserRole } from "@/types/roles";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { log404Error } = useErrorLogging();
  const { user } = useAuth();
  
  // Calculate appropriate dashboard route - using type casting to fix TypeScript error
  const userRole = user?.role ? (user.role as UserRole) : undefined;
  const dashboardRoute = user && userRole ? getFallbackDashboardByRole(userRole) : '/login';
  
  // Get referring page if available
  const referrer = location.state?.from || null;

  useEffect(() => {
    // Don't log if explicitly navigating to the 404 page
    if (location.pathname !== "/404") {
      log404Error(location.pathname);
    }
  }, [location.pathname, log404Error]);

  // Auto-redirect to dashboard after a delay if user is authenticated
  useEffect(() => {
    if (user && location.pathname === "/404") {
      const redirectTimer = setTimeout(() => {
        navigate(dashboardRoute, { replace: true });
      }, 5000); // 5 second delay
      
      return () => clearTimeout(redirectTimer);
    }
  }, [user, location.pathname, navigate, dashboardRoute]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <GraduationCap className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="text-6xl font-heading font-bold">404</h1>
        <h2 className="text-2xl font-heading">Page not found</h2>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
          {user && <span className="block mt-2 font-medium">Redirecting you to dashboard in a few seconds...</span>}
        </p>
        <div className="space-y-4">
          <Button 
            size="lg" 
            className="w-full" 
            onClick={() => navigate(dashboardRoute, { replace: true })}
          >
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
