import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Only redirect to dashboard if user is logged in
    // Otherwise go to login page
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
};

export default Index;
