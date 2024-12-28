import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useRef } from "react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();

  return (
    <div
      className={`flex border-[3px] rounded-md shadow-md outline ${
        isFocused
          ? "border-transparent outline-orange-300"
          : "border border-gray-300 outline-transparent"
      }`}
    >
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
        className="outline-none border-none shadow-none active:outline-none active:border-none rounded-none"
      />
      <RadioGroup
        defaultValue="option-one"
        onFocus={() => setIsFocused(true)}
        onClick={() => {
          inputRef.current.focus();
        }}
        className={`flex border-l-[3px] px-2 ${
          isFocused ? "border-transparent" : ""
        }`}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Project </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Charity </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SearchBar;
