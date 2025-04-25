
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const notificationSchema = z.object({
  preferredChannel: z.enum(['email', 'text', 'app'], { 
    required_error: "Please select a preferred notification method" 
  }),
  notificationTypes: z.array(z.string()).min(1, { 
    message: "Please select at least one notification type" 
  }),
});

type NotificationSchemaType = z.infer<typeof notificationSchema>;

interface NotificationPreferencesStepProps {
  onSave: (data: any) => void;
}

export const NotificationPreferencesStep: React.FC<NotificationPreferencesStepProps> = ({ onSave }) => {
  const form = useForm<NotificationSchemaType>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      preferredChannel: 'app',
      notificationTypes: ['alerts'],
    },
  });

  const onSubmit = (data: NotificationSchemaType) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="preferredChannel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Notification Method</FormLabel>
              <FormDescription>
                How would you like to receive important notifications?
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Text Message</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="app" id="app" />
                    <Label htmlFor="app">In-App Notification</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notificationTypes"
          render={() => (
            <FormItem>
              <FormLabel>Notification Types</FormLabel>
              <FormDescription>
                Select which types of notifications you'd like to receive
              </FormDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                <FormField
                  control={form.control}
                  name="notificationTypes"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('alerts')}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, 'alerts']
                              : field.value?.filter((value) => value !== 'alerts');
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">WellLens Alerts</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notificationTypes"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('checkins')}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, 'checkins']
                              : field.value?.filter((value) => value !== 'checkins');
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">SEL Check-ins</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notificationTypes"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('assignments')}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, 'assignments']
                              : field.value?.filter((value) => value !== 'assignments');
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">New Assignments</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notificationTypes"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes('notes')}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...field.value, 'notes']
                              : field.value?.filter((value) => value !== 'notes');
                            field.onChange(newValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Teacher Notes</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">Save Preferences</Button>
      </form>
    </Form>
  );
};
