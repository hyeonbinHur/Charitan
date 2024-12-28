import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Editor } from "@tinymce/tinymce-react";
import { editorConfig } from "../../lib/editorOption";

const ProjectForm = () => {
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
