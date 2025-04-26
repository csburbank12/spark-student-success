
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types/roles";
import { useEffect } from "react";

export const useProfileAccess = (allowedRoles: UserRole[]) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      navigate('/dashboard');
    }
  }, [user, allowedRoles, navigate]);

  return { user };
};
