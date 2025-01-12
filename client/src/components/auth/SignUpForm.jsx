import { useState } from "react";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const SignUpForm = ({ toSignIn, toggleForm }) => {
  const [userType, setUserType] = useState("Donor");
  const [charityType, setCharityType] = useState("");
  const [charityCategory, setCharityCategory] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    address: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserTypeChange = (value) => {
    setUserType(value);
    if (value !== "Charity") {
      setCharityType("");
      setCharityCategory("");
      setFormData({ ...formData, country: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let apiEndpoint = "";
      const { username, ...payload } = formData;

      if (userType === "Donor") {
        apiEndpoint = "http://localhost:8080/api/donors/register";
        payload.donorType = "Individual";
      } else if (userType === "Charity") {
        apiEndpoint = "http://localhost:8080/api/charities/register";
        payload.organizationName = formData.name;
        payload.organizationType = charityType;
        payload.category = charityCategory;
      }

      console.log("Payload being sent:", payload);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Registration successful! Please verify your email.");
        toggleForm();
      } else {
        const responseText = await response.text(); // Capture raw response for debugging
        console.error("Server response:", responseText);
        alert(`Registration failed: ${responseText}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign Up for Charitan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border p-2 rounded w-full mb-3"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded w-full mb-3"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded w-full mb-3"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-2 rounded w-full mb-3"
          value={formData.address}
          onChange={handleInputChange}
        />

        <RadioGroup
          defaultValue="Donor"
          className="flex justify-around my-4"
          onValueChange={handleUserTypeChange}
        >
          <div>
            <RadioGroupItem value="Donor" id="Donor" />
            <Label htmlFor="Donor">Donor</Label>
          </div>
          <div>
            <RadioGroupItem value="Charity" id="Charity" />
            <Label htmlFor="Charity">Charity</Label>
          </div>
        </RadioGroup>

        {userType === "Donor" && (
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="border p-2 rounded w-full mb-3"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        )}

        {userType === "Charity" && (
          <>
            <div className="mt-4">
              <Label>Country</Label>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="border p-2 rounded w-full mb-3"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mt-4">
              <Label>Select Charity Type</Label>
              <RadioGroup
                defaultValue=""
                className="flex justify-around my-4"
                onValueChange={(value) => setCharityType(value)}
              >
                <div>
                  <RadioGroupItem value="BUSINESS" id="Business" />
                  <Label htmlFor="Business">Business</Label>
                </div>
                <div>
                  <RadioGroupItem value="NON_PROFIT" id="NonProfit" />
                  <Label htmlFor="NonProfit">Non-Profit</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mt-4">
              <Label>Select Charity Category</Label>
              <RadioGroup
                defaultValue=""
                className="flex justify-around my-4"
                onValueChange={(value) => setCharityCategory(value)}
              >
                <div>
                  <RadioGroupItem value="Food" id="Food" />
                  <Label htmlFor="Food">Food</Label>
                </div>
                <div>
                  <RadioGroupItem value="Health" id="Health" />
                  <Label htmlFor="Health">Health</Label>
                </div>
                <div>
                  <RadioGroupItem value="Education" id="Education" />
                  <Label htmlFor="Education">Education</Label>
                </div>
                <div>
                  <RadioGroupItem value="Environment" id="Environment" />
                  <Label htmlFor="Environment">Environment</Label>
                </div>
                <div>
                  <RadioGroupItem value="Religion" id="Religion" />
                  <Label htmlFor="Religion">Religion</Label>
                </div>
                <div>
                  <RadioGroupItem value="Humanitarian" id="Humanitarian" />
                  <Label htmlFor="Humanitarian">Humanitarian</Label>
                </div>
                <div>
                  <RadioGroupItem value="Housing" id="Housing" />
                  <Label htmlFor="Housing">Housing</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <section className="mt-6 text-center">
        <div>
          <h3 className="text-gray-700 mb-2">Already have an account?</h3>
          <Button onClick={toggleForm} className="bg-blue-500 text-white">
            Sign In
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SignUpForm;
