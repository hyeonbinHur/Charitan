import { useState } from "react";
import {
  isInputEmpty,
  isInputIncludes,
  isInputOver,
} from "../../helper/inputHelper";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/useAuth";

export default function SignInForm({ close }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Donor");
  const { signIn } = useAuth();

  /**basic functions */
  const onSubmitSingin = async (e) => {
    e.preventDefault();
    const isSignin = await signIn(userEmail, userType);
    if (isSignin) {
      close();
    }
  };

  const emailIsValid =
    !isInputEmpty(userEmail) &&
    isInputIncludes(userEmail, "@") &&
    isInputOver(userEmail, 8);

  const passwordIsValid = !isInputEmpty(password) && isInputOver(password, 5);

  return (
    <div>
      <form onSubmit={onSubmitSingin}>
        <div>
          <div>
            <h2>Sign In to Charitan</h2>
          </div>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          {emailIsValid ? (
            <Label>Username must be longer than 5 letters</Label>
          ) : (
            <label htmlFor="username">Username</label>
          )}
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordIsValid ? (
            <label>Password must be longer than 7 letters</label>
          ) : (
            <label htmlFor="password">Password</label>
          )}
          <RadioGroup
            defaultValue="Donor"
            className="flex"
            onValueChange={(e) => {
              setUserType(e);
            }}
          >
            <div>
              <RadioGroupItem value="Donor" id="Donor" />
              <Label htmlFor="Donor">Donor </Label>
            </div>
            <div>
              <RadioGroupItem value="Charity" id="Charity" />
              <Label htmlFor="Charity">Charity </Label>
            </div>
            <div>
              <RadioGroupItem value="Admin" id="Admin" />
              <Label htmlFor="Amin">Admin </Label>
            </div>
          </RadioGroup>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
