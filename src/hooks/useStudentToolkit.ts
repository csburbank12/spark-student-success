
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { ToolkitItem, ToolkitItemInput } from "@/types/toolkit";

/**
 * Hook to fetch a student's toolkit items
 */
export function useStudentToolkit(studentId?: string) {
  return useQuery({
    queryKey: ["student-toolkit", studentId],
    queryFn: async (): Promise<ToolkitItem[]> => {
      if (!studentId) {
        return [];
      }

      const { data, error } = await supabase
        .from("student_toolkit")
        .select("*")
        .eq("student_id", studentId)
        .order("added_on", { ascending: false });

      if (error) {
        toast.error("Failed to load toolkit items");
        console.error("Error fetching toolkit items:", error);
        throw error;
      }

      return data || [];
    },
    enabled: !!studentId,
  });
}

/**
 * Hook to add an item to a student's toolkit
 */
export function useAddToolkitItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      type, 
      label, 
      url, 
      content 
    }: ToolkitItemInput) => {
      const { error } = await supabase
        .from("student_toolkit")
        .insert([{ 
          item_type: type,
          item_label: label,
          item_url: url,
          item_content: content
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-toolkit"] });
      toast.success("Added to your toolkit!");
    },
    onError: (error) => {
      toast.error("Failed to add item to toolkit");
      console.error("Toolkit error:", error);
    }
  });
}

/**
 * Hook to delete an item from a student's toolkit
 */
export function useDeleteToolkitItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from("student_toolkit")
        .delete()
        .eq("id", itemId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-toolkit"] });
      toast.success("Item removed from toolkit");
    },
    onError: (error) => {
      toast.error("Failed to remove item from toolkit");
      console.error("Error removing toolkit item:", error);
    }
  });
}

/**
 * Hook to update an existing toolkit item
 */
export function useUpdateToolkitItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id,
      updates
    }: { 
      id: string, 
      updates: Partial<ToolkitItemInput> 
    }) => {
      const updateData: Record<string, any> = {};
      
      if (updates.type) updateData.item_type = updates.type;
      if (updates.label) updateData.item_label = updates.label;
      if (updates.url !== undefined) updateData.item_url = updates.url;
      if (updates.content !== undefined) updateData.item_content = updates.content;

      const { error } = await supabase
        .from("student_toolkit")
        .update(updateData)
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-toolkit"] });
      toast.success("Toolkit item updated");
    },
    onError: (error) => {
      toast.error("Failed to update toolkit item");
      console.error("Error updating toolkit item:", error);
    }
  });
}
