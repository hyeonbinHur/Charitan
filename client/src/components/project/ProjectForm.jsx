// @ts-nocheck
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Editor } from "@tinymce/tinymce-react";
import { editorConfig } from "../../lib/editorOption";
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

import { useState } from "react";

const ProjectForm = () => {
  /**
      newProject.charity_id, 
      newProject.current_funding, 
      newProject.created_at, 
      newProject.updated_at,
      newProject.bankaccount,
   */
  //ENUM('Food', 'Health', 'Education', 'Environment', 'Religion', 'Humanitarian', 'Housing', 'Other')
  const [projectStatus, setProjectStatus] = useState("Active");
  return (
    <div>
      <form>
        <Label>Title</Label>
        <Input />
        <Separator />
        <Label>Thumbnatil</Label>
        <Input />
        <Separator />
        <Label>Description</Label>
        <Separator />
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a project category" />
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
        <Separator />
        <Label>Target Amount</Label>
        <Input type="number" />
        <Separator />
        <DropdownMenu>
          <div className="w-full items-end flex flex-col px-5">
            <DropdownMenuTrigger className="border border-gray-500 p-2 rounded-md">
              {projectStatus}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Project Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Halted</DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
        <Editor
          id="my-custom-editor"
          init={editorConfig}
          apiKey={import.meta.env.VITE_PUBLIC_TINY_MCE_API}
        />
        <Input />
        <Separator />
        <Label>Category</Label>
        <Input />
        <Label>Target Amount</Label>
        <Input />
      </form>
    </div>
  );
};

export default ProjectForm;
