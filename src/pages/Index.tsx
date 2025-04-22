
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/ui/loader";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
};

export default Index;
