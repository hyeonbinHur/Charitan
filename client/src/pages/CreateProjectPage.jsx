import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import React from "react";

const CreateProjectPage = () => {
  return (
    <main>
      <form className="">
        <Label>Title</Label>
        <div className="w-10 h-10 border-2 border-red-500 rounded-md"></div>
        <Input type="text" name="title" className="rounded-md" />

        <Label>Description</Label>
        <Input type="text" name="description" />

        <Label>Category</Label>
        <Input type="text" name="category" />

        <Label>Status</Label>
        <Input type="text" name="status" />

        <Label>BankAccount</Label>
        <Input type="text" name="bank_account" />

        <Label>Target Amount</Label>
        <Input type="number" name="target_amount" />

        <Label>Current Funding</Label>
        <Input type="number" name="current_funding" />
        <Button> Submit</Button>
      </form>
    </main>
  );
};

export default CreateProjectPage;
