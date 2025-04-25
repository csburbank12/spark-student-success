
import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { mockParentDashboardData } from "@/data/mockParentDashboard";
import { Child } from "@/types/parent-dashboard";

export const useChildManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const childParam = searchParams.get('child');
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedChild, setSelectedChild] = useState<string>(
    childParam || (user?.children?.[0]?.id || mockParentDashboardData.children[0].id)
  );

  useEffect(() => {
    if (childParam !== selectedChild && selectedChild) {
      navigate(`/parent-dashboard-enhanced?child=${selectedChild}`, { replace: true });
    }
  }, [selectedChild, childParam, navigate]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedChild]);

  const handleChildChange = (childId: string) => {
    setIsLoading(true);
    setSelectedChild(childId);
    const selectedChild = mockParentDashboardData.children.find(child => child.id === childId);
    if (selectedChild) {
      toast.success(`Viewing ${selectedChild.name}'s information`);
    }
  };

  const selectedChildData = mockParentDashboardData.children.find(
    child => child.id === selectedChild
  ) || mockParentDashboardData.children[0];

  return {
    selectedChild,
    selectedChildData,
    handleChildChange,
    children: mockParentDashboardData.children,
    isLoading
  };
};
