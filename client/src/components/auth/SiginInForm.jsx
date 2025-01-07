import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/useAuth";

const SignInForm = ({ close }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Donor");
  const { signIn } = useAuth();

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    const isSignin = await signIn(userEmail, userType);
    if (isSignin) {
      close();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign In to Charitan</h2>
      <form onSubmit={onSubmitSignin}>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <Label>Username must be longer than 5 letters</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label>Password must be longer than 7 letters</Label>
        <RadioGroup
          defaultValue="Donor"
          className="flex justify-around my-4"
          onValueChange={(e) => setUserType(e)}
        >
          <div>
            <RadioGroupItem value="Donor" id="Donor" />
            <Label htmlFor="Donor">Donor</Label>
          </div>
          <div>
            <RadioGroupItem value="Charity" id="Charity" />
            <Label htmlFor="Charity">Charity</Label>
          </div>
          <div>
            <RadioGroupItem value="Admin" id="Admin" />
            <Label htmlFor="Admin">Admin</Label>
          </div>
        </RadioGroup>
        <Button type="submit" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
