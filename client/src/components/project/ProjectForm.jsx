// @ts-nocheck
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Editor } from "@tinymce/tinymce-react";
import { editorConfig } from "../../lib/editorOption";
import { Controller, useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
import { optimizeHTMLImage, resizePostImage } from "../../helper/imageHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../../utils/api/project";
/** */
const ProjectForm = () => {
  const [projectStatus, setProjectStatus] = useState("Active");
  const [projectCategory, setProjectCategory] = useState("Food");
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState("");
  const [thumbnatilImg, setThumbnailImg] = useState(null);
  const editorRef = useRef(null);
  const {
    register,
    handleSubmit: onSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
    control,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      status: projectStatus,
      category: projectCategory,
    },
  });

  const onChangeThumbnail = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizePostImage(file);
        setThumbnailFile(resizedImage);
        console.log(resizedImage);
        setThumbnailImg(URL.createObjectURL(resizedImage));
      } catch (err) {
        console.error("error while pre process image");
      }
    }
  };

  const queryClient = useQueryClient();
  const { mutate: mutateCrateProject } = useMutation({
    mutationFn: ({ newProject }) => {
      return createProject(newProject);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getCertainProjects");
      console.log("success");
    },
  });

  const handleSubmit = async (data) => {
    const newProject = {
      charity_id: 1,
      title: data.title,
      description: data.description,
      category: data.category,
      target_amount: data.target_amount,
      current_funding: 0,
      status: data.status,
      created_at: new Date(),
      updated_at: null,
      bankaccount: "234-567-890",
      charity_name: "asd",
    };
    newProject.description = await optimizeHTMLImage(
      data.description,
      data.title
    );
    mutateCrateProject({ newProject: newProject });
  };
  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={onSubmit(handleSubmit)}>
        <section>
          <Label>Title</Label>
          <Input type="text" {...register("title")} />
        </section>

        <section>
          <Label>Thumbnatil</Label>
          <Input
            type="file"
            accept="image/*"
            {...register("thumbnail", {
              onChange: (e) => onChangeThumbnail(e),
            })}
          />
          {thumbnatilImg && (
            <div>
              <img src={thumbnatilImg} />
            </div>
          )}
        </section>

        <section>
          <Label>Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={projectCategory} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Project Category</SelectLabel>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Environment">Environment</SelectItem>
                    <SelectItem value="Religion">Religion</SelectItem>
                    <SelectItem value="Humanitarian">Humanitarian</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </section>

        <section>
          <Label>Target Amount</Label>
          <Input type="number" {...register("target_amount")} />
        </section>

        <section>
          <Label>Project Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={projectStatus} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Project Category</SelectLabel>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Halt">Halt</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </section>

        <section>
          <Label>Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Editor
                id="my-custom-editor"
                apiKey={import.meta.env.VITE_PUBLIC_TINY_MCE_API}
                init={editorConfig}
                onInit={(e, editor) => (editorRef.current = editor)}
                onEditorChange={(newValue) => {
                  field.onChange(newValue);
                }}
                value={getValues("description")}
              />
            )}
          />
        </section>

        <Button type="submit"> save</Button>
      </form>
    </div>
  );
};

export default ProjectForm;
