import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();
  const [searchContent, setSearchContent] = useState("");
  const [searchType, setSearchType] = useState("Project");
  const navigate = useNavigate();

  const onKeyDownSearchBar = (e) => {
    if (e.key === "Enter") {
      if (searchContent === "") {
        navigate(`/projects`);
      }
      navigate(
        `/projects?searchType=${searchType}&searchQuery=${searchContent}`
      );
    }
  };

  const onChangeSearchContent = useCallback(
    (e) => {
      setSearchContent(e.target.value);
    },
    [searchContent]
  );

  return (
    <div
      className={`flex border-[3px] rounded-md shadow-md outline ${
        isFocused
          ? "border-transparent outline-orange-300"
          : "border border-gray-300 outline-transparent"
      }`}
    >
      <Input
        value={searchContent}
        onKeyDown={onKeyDownSearchBar}
        onChange={onChangeSearchContent}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
        className="outline-none border-none shadow-none active:outline-none active:border-none rounded-none"
      />

      <RadioGroup
        defaultValue="Project"
        onValueChange={(e) => {
          setSearchType(e);
        }}
        onFocus={() => setIsFocused(true)}
        onClick={() => {
          inputRef.current.focus();
        }}
        className={`flex border-l-[3px] px-2 ${
          isFocused ? "border-transparent" : ""
        }`}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Project" id="option-one" />
          <Label htmlFor="option-one">Project </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Charity" id="option-two" />
          <Label htmlFor="option-two">Charity </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SearchBar;
