
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkywardIntegration } from "@/types/trusted-adults";

const skywardFormSchema = z.object({
  apiKey: z.string().min(10, "API Key is required"),
  schoolSyncUrl: z.string().url("Valid URL is required"),
  studentIdField: z.string().min(1, "Student ID field is required"),
  nameField: z.string().min(1, "Name field is required"),
  gradeField: z.string().min(1, "Grade field is required"),
  syncFrequency: z.enum(["daily", "weekly", "manual"]),
});

type SkywardFormValues = z.infer<typeof skywardFormSchema>;

interface SkywardSetupModalProps {
  open: boolean;
  onClose: () => void;
  schoolId: string;
  initialData?: Partial<SkywardIntegration>;
  onSave: (data: SkywardFormValues) => void;
}

const SkywardSetupModal: React.FC<SkywardSetupModalProps> = ({
  open,
  onClose,
  schoolId,
  initialData,
  onSave,
}) => {
  const form = useForm<SkywardFormValues>({
    resolver: zodResolver(skywardFormSchema),
    defaultValues: {
      apiKey: initialData?.apiKey || "",
      schoolSyncUrl: initialData?.schoolSyncUrl || "",
      studentIdField: "student_id",
      nameField: "student_name",
      gradeField: "grade_level",
      syncFrequency: "daily",
    },
  });

  const handleSubmit = (values: SkywardFormValues) => {
    try {
      // In a real app, this would save to the database
      onSave(values);
      toast.success("Skyward integration configured successfully!");
      onClose();
    } catch (error: any) {
      toast.error("Error configuring Skyward: " + error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Skyward Integration</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skyward API Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter API key" type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    The API key from your Skyward account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schoolSyncUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Sync URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://skyward.example.com/api/v1/school/123"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The URL endpoint for this specific school
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentIdField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID Field</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name Field</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gradeField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade Level Field</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="syncFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sync Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Configuration</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SkywardSetupModal;
