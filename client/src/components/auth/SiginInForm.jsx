import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../../public/LoadingSpinner.svg";


const SignInForm = ({ close, toggleForm }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Donor");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const onSubmitSignin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isSignin = await signIn(userEmail,password, userType);
    setIsLoading(false)
    if (isSignin) {
      close();
    } else 
    {alert("Invalid login credentials. Please try again.");}
    
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <img src={LoadingSpinner} />
        </div>
      ) : (
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
            <Label>Enter your username </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label>Enter your password</Label>
            <RadioGroup
              defaultValue="Donor"
              className="flex justify-around my-4"
              onValueChange={(value) => setUserType(value)}
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
