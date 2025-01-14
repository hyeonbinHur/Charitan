import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../../public/LoadingSpinner.svg";
import {
  isInputLess,
  isInputIncludes,
  isInputEmpty,
} from "../../helper/inputHelper";

const SignInForm = ({ close, toggleForm }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Donor");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const { signIn } = useAuth();
  const onChangeEmail = (e) => {
    setUserEmail(e.target.value);
    if (isInputEmpty(e.target.value)) {
      setIsEmailValid(true);
      return;
    }
    if (isInputLess(e.target.value, 7)) {
      setIsEmailValid(false);
      return;
    }
    if (isInputIncludes(e.target.value, "@")) {
      setIsEmailValid(true);
      return;
    }
    setIsEmailValid(false);
  };

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isSignin = await signIn(userEmail, userType);
    if (isSignin) {
      close();
    }
    setIsLoading(false);
  };
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <img src={LoadingSpinner} />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Sign In to Charitan</h2>
          <form onSubmit={onSubmitSignin}>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userEmail}
              onChange={onChangeEmail}
            />
            {!isEmailValid && (
              <Label className="text-red-500">
                Email must be longer than 7 letters and includes &apos;@&apos;
              </Label>
            )}

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
          <section className="mt-6 text-center">
            <div>
              <h3 className="text-gray-700 mb-2">
                Don&apos;t have an account?
              </h3>
              <Button onClick={toggleForm} className="bg-blue-500 text-white">
                Sign Up
              </Button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
