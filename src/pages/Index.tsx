
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  
  // Only redirect if explicitly on the root path and no state passed
  // This prevents forced navigation from other pages
  const shouldRedirect = location.pathname === "/" && 
                        !location.state?.preventRedirect;
  
  useEffect(() => {
    if (shouldRedirect) {
      if (!user) {
        navigate("/login");
      }
    }
  }, [navigate, user, shouldRedirect]);

  if (shouldRedirect && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // If user is logged in or we shouldn't redirect, show navigation options
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center">Welcome {user ? user.name : ''}</h1>
        <p className="text-center text-muted-foreground">
          Choose where you want to navigate
        </p>
        <div className="space-y-4 pt-4">
          <Button asChild className="w-full">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/help">Help & Support</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/profile">User Profile</Link>
          </Button>
          {!user && (
            <Button asChild variant="outline" className="w-full">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
