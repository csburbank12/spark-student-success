
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    // Only redirect after auth is checked
    if (!isLoading) {
      if (user) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [navigate, user, isLoading]);

  // Return minimal loading state to prevent flash
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      {isLoading && (
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      )}
    </div>
  );
};

export default Index;
