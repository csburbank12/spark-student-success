
import { useNavigate, useLocation } from "react-router-dom";

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return {
    navigate,
    pathname: location.pathname
  };
};
