
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Only redirect if we're exactly on the root path "/"
    if (location.pathname === "/") {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [navigate, user, location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
};

export default Index;
