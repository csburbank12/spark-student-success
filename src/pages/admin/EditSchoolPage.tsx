
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { School } from "@/types/trusted-adults";
import SchoolForm from "@/components/school-management/SchoolForm";
import { supabase } from "@/integrations/supabase/client";
import { Loader } from "@/components/ui/loader";

// Mock school data
const mockSchool: School = {
  id: "1",
  name: "Washington High School",
  district: "Springfield School District",
  code: "WHS001",
  address: {
    street: "123 Education Blvd",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  contactEmail: "info@washingtonhigh.edu",
  contactPhone: "(555) 123-4567",
  principalName: "Dr. Emily Johnson",
  timeZone: "America/Chicago",
  logoUrl: "https://via.placeholder.com/150",
  enableWellLens: true,
  enableSEL: true,
  enableSkyward: false,
};

const EditSchoolPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real app, this would fetch the school data from the API
  const { data: school, isLoading } = useQuery({
    queryKey: ["school", id],
    queryFn: async () => {
      // In a real app with Supabase connected:
      // const { data, error } = await supabase
      //   .from("schools")
      //   .select("*")
      //   .eq("id", id)
      //   .single();
      
      // if (error) throw error;
      // return data as School;
      
      // Using mock data for now
      return mockSchool;
    },
  });

  const handleSubmit = async (formData: any) => {
    try {
      // In a real app with Supabase connected:
      // const { error } = await supabase
      //   .from("schools")
      //   .update({
      //     name: formData.name,
      //     district: formData.district,
      //     address: {
      //       street: formData.street,
      //       city: formData.city,
      //       state: formData.state,
      //       zip: formData.zip,
      //     },
      //     contact_email: formData.contactEmail,
      //     contact_phone: formData.contactPhone,
      //     principal_name: formData.principalName,
      //     time_zone: formData.timeZone,
      //     logo_url: formData.logoUrl,
      //     enable_well_lens: formData.enableWellLens,
      //     enable_sel: formData.enableSEL,
      //     enable_skyward: formData.enableSkyward,
      //   })
      //   .eq("id", id);

      // if (error) throw error;

      toast.success("School updated successfully!");
      navigate(`/admin/schools/${id}`);
    } catch (error: any) {
      toast.error("Error updating school: " + error.message);
    }
  };

  if (isLoading || !school) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold">Edit School</h2>
          <p className="text-muted-foreground">{school.name} - {school.code}</p>
        </div>
      </div>

      <SchoolForm 
        initialData={school}
        isEditing={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditSchoolPage;
