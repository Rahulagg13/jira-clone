"use client";
import { useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useUploadThing } from "@/lib/uploadthing";
import { toast } from "sonner";

interface CreateWorkspaceFormProps {
  onCancel?: () => void;
}

const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const { mutate, isPending } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof createWorkspacesSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createWorkspacesSchema),
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader");
  const onSubmit = async (values: z.infer<typeof createWorkspacesSchema>) => {
    try {
      const imageFile = form.getValues("image");
      let imageUrl: string | undefined = undefined;
      if (imageFile instanceof File) {
        const res = await startUpload([imageFile]);
        if (!res || res.length === 0) throw new Error("Failed to upload image");
        imageUrl = res[0].ufsUrl;
      }

      const finalValues = {
        ...values,
        image: imageUrl || undefined,
      };
      console.log(finalValues);
      mutate(
        { json: finalValues },
        {
          onSuccess: () => {
            form.reset();
          },
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
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
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="logo"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className="flex flex-col">
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG, or JPEG. Max 4MB
                        </p>
                        <input
                          className="hidden"
                          accept=".jpg, .png, .jpeg, .svg"
                          type="file"
                          ref={inputRef}
                          onChange={handleImageChange}
                          disabled={isPending}
                        />
                        <Button
                          type="button"
                          disabled={isPending}
                          size={"xs"}
                          className="w-fit mt-2"
                          variant={"territory"}
                          onClick={() => inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
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
              <Button
                type="submit"
                size={"lg"}
                disabled={isPending || isUploading}
              >
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
