
import React from "react";
import SchoolForm from "@/components/school-management/SchoolForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AddSchoolPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData: any) => {
    try {
      // In a real app with Supabase connected, this would save the data
      // const { data, error } = await supabase
      //   .from("schools")
      //   .insert([
      //     {
      //       name: formData.name,
      //       district: formData.district,
      //       address: {
      //         street: formData.street,
      //         city: formData.city,
      //         state: formData.state,
      //         zip: formData.zip,
      //       },
      //       contact_email: formData.contactEmail,
      //       contact_phone: formData.contactPhone,
      //       principal_name: formData.principalName,
      //       time_zone: formData.timeZone,
      //       logo_url: formData.logoUrl,
      //       enable_well_lens: formData.enableWellLens,
      //       enable_sel: formData.enableSEL,
      //       enable_skyward: formData.enableSkyward,
      //       code: generateSchoolCode(formData.name),
      //     },
      //   ]);

      // if (error) throw error;

      toast.success("School created successfully!");
      navigate("/admin/schools");
    } catch (error: any) {
      toast.error("Error creating school: " + error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold">Add New School</h2>
          <p className="text-muted-foreground">
            Fill out the form below to add a new school to the system
          </p>
        </div>
      </div>

      <SchoolForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddSchoolPage;
