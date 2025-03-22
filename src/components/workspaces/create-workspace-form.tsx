"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateWorkspace } from "@/hooks/use-create-workspace";
import { createWorkspacesSchema } from "@/lib/schema";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();
  const form = useForm<z.infer<typeof createWorkspacesSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createWorkspacesSchema),
  });
  const onSubmit = (values: z.infer<typeof createWorkspacesSchema>) => {
    mutate({ json: values });
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex px-7 py-2">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="px-7 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the workspace name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DottedSeparator className="py-7" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size={"lg"}
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size={"lg"} disabled={isPending}>
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateWorkspaceForm;
