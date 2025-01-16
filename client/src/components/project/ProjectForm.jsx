/* eslint-disable no-unused-vars */
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Editor } from "@tinymce/tinymce-react";
import { editorConfig } from "../../lib/editorOption";
import { Controller, useForm } from "react-hook-form";
import { getCharity } from "../../utils/api/charity";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState, useContext } from "react";
import { optimizeHTMLImage, resizePostImage } from "../../helper/imageHelper";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createProject, updateProject } from "../../utils/api/project";
import { uploadFileToS3, uploadVideoToS3 } from "../../lib/s3Option";
import { sendEmail } from "../../utils/api/email";
import { useError } from "../../context/ErrorContext";
import { useParams } from "react-router-dom";
import ProjectVideoForm from "./ProjectVideoForm";
import { UserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../public/LoadingSpinner.svg";

const ProjectForm = ({ project = {} }) => {
  /**
   * Variable Declaration
   */

  const params = useParams();
  const { title = "", description = "", status = "Active" } = project;
  const [projectStatus, setProjectStatus] = useState("Active");
  const [projectCategory, setProjectCategory] = useState("Food");
  // const [title, setTitle] = useState("");

  const [targetAmount, setTargetAmount] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState("");
  const [thumbnatilImg, setThumbnailImg] = useState(null);
  const editorRef = useRef(null);
  const queryClient = useQueryClient();
  const { setError } = useError();
  const navigate = useNavigate(); // Initialize navigation
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [videos, setVideos] = useState([]);

  const onChangeAddVideo = (newVideo) => {
    if (videos.length < 4) {
      setVideos((prevVideos) => [...prevVideos, newVideo]); // 새로운 비디오 추가
    }
  };
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
      ...(project.title
        ? { ...project }
        : {
            title: "",
            category: "Food", // 기본값으로 'Food' 설정
            target_amount: "",
            status: "Active", // 기본값으로 'Active' 설정
            description: "",
          }),
    },
  });
  const { data: charity } = useQuery({
    queryKey: [`getCharity-${user.charity_id}`],
    queryFn: () => getCharity(user.charity_id),
  });
  /**
   * useEffect for edit project
   */
  useEffect(() => {
    if (project) {
      setThumbnailImg(project.thumbnail);
    }
  }, []);
  /**
   * Http Requests
   */
  const { mutate: mutateSendEmail } = useMutation({
    mutationFn: ({ newEmail }) => {
      return sendEmail(newEmail);
    },
    onSuccess: () => {
      navigate(`/charity/project/${params.charity_id}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const { mutate: mutateCrateProject } = useMutation({
    mutationFn: async ({ newProject }) => {
      return createProject(newProject).then(() => newProject);
    },
    onSuccess: (newProject) => {
      const newEmail = {
        title: "New project has been successfully created!",
        content: `Your project has been successfully created!`,
        status: "UNREAD",
        receiver_type: "Charity",
        receiver_id: user.charity_id,
        receiver_email: "hhb7201@naver.com",
        sender: "Admin",
        created_at: new Date(),
      };
      mutateSendEmail({ newEmail: newEmail });
      queryClient.invalidateQueries("read-projects");
      navigate(`/charity/project/${params.charity_id}`);
    },
  });

  const { mutate: mutateUpdateProject } = useMutation({
    mutationFn: ({ updatedProject }) => {
      return updateProject(updatedProject, project.project_id);
    },
    onSuccess: () => {
      console.log("here");
      queryClient.invalidateQueries("read-projects");
      navigate(`/charity/project/${project.charity_id}`);
    },
  });

  /**
   * Event Handler
   */

  const onChangeThumbnail = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizePostImage(file);
        setThumbnailFile(resizedImage);
        setThumbnailImg(URL.createObjectURL(resizedImage));
      } catch (err) {
        console.error("error while pre process image");
      }
    }
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);
    if (project.project_id) {
      const updatedProject = {
        title: data.title,
        description: data.description,
        category: data.category,
        target_amount: project.target_amount,
        status: data.status,
        updated_at: new Date(),
        bankaccount: project.bankaccount,
      };
      updatedProject.description = await optimizeHTMLImage(
        data.description,
        data.title
      );
      mutateUpdateProject({ updatedProject: updatedProject });
    } else {
      const newProject = {
        charity_id: params.charity_id,
        thumbnail: data.thumbnail,
        title: data.title,
        description: data.description,
        category: data.category,
        target_amount: data.target_amount,
        current_funding: 0,
        status: data.status,
        created_at: new Date(),
        updated_at: "",
        bankaccount: "234-567-890",
        charity_name: charity.organization_name,
        video_1: "",
        video_2: "",
        video_3: "",
        video_4: "",
      };
      newProject.thumbnail = await uploadFileToS3(thumbnailFile, data.title);
      const optimizedHTML = await optimizeHTMLImage(
        data.description,
        data.title
      );
      for (let i = 0; i < videos.length; i++) {
        if (i === 0) {
          newProject.video_1 = await uploadVideoToS3(
            videos[i],
            newProject.title
          );
        } else if (i === 1) {
          newProject.video_2 = await uploadVideoToS3(
            videos[i],
            newProject.title
          );
        } else if (i === 2) {
          newProject.video_3 = await uploadVideoToS3(
            videos[i],
            newProject.title
          );
        } else if (i === 3) {
          newProject.video_4 = await uploadVideoToS3(
            videos[i],
            newProject.title
          );
        }
      }
      if (optimizedHTML === false) {
        setError(new Error("The content must not contain more than 15 images"));
      } else {
        newProject.description = optimizedHTML;
        mutateCrateProject({ newProject: newProject });
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-5">
      <form
        className="flex flex-col p-5 shadow-md bg-gray-100 rounded-lg text-gray-800"
        onSubmit={onSubmit(handleSubmit)}
      >
        <div>
          <Label>Title</Label>
          <Input type="text" {...register("title")} />
        </div>
        <div>
          <Label>Thumbnatil</Label>
          {!project.project_id && (
            <Input
              type="file"
              accept="image/*"
              {...register("thumbnail", {
                onChange: (e) => onChangeThumbnail(e),
              })}
            />
          )}

          {thumbnatilImg && (
            <div>
              <img src={thumbnatilImg} />
            </div>
          )}
        </div>

        <div>
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
        </div>

        <div>
          <Label>Target Amount</Label>
          <Input type="number" {...register("target_amount")} />
        </div>

        <div>
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
                    <SelectItem value="Halted">Halt</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div>
          <Label>Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Editor
                id="my-custom-editor"
                onInit={(e, editor) => (editorRef.current = editor)}
                apiKey={import.meta.env.VITE_PUBLIC_TINY_MCE_API}
                init={editorConfig}
                className="tinymce-editor-container"
                onEditorChange={(content) => field.onChange(content)}
                value={getValues("description")}
              />
            )}
          />
        </div>
        <div>
          {!project.title && (
            <ProjectVideoForm addVideoOnParents={onChangeAddVideo} />
          )}
        </div>

        <div className="flex justify-between gap-10">
          <Button
            type="submit"
            className="flex-1 hover:bg-blue-100"
            variant="secondary"
            disabled={isLoading}
          >
            Confirm Create Project
            {isLoading && <img src={LoadingSpinner} className="w-5" />}
          </Button>
          <Button
            className="flex-1 "
            variant="destructive"
            disabled={isLoading}
            onClick={() => navigate(`/charity/project/${params.charity_id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
