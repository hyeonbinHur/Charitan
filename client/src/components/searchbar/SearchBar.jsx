// @ts-nocheck
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
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
      } else {
        navigate(
          `/projects?searchType=${searchType}&searchQuery=${searchContent}`
        );
      }
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
          ? "border-transparent outline-blue-300"
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
        className={`flex  px-2 ${isFocused ? "border-transparent" : ""}`}
      >
        <div className="flex items-center gap-5">
          {/* Project Option */}
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              id="option-one"
              name="selection"
              value="Project"
              className="form-radio text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="option-one" className="text-gray-700 font-medium">
              Project
            </Label>
          </div>

          {/* Charity Option */}
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              id="option-two"
              name="selection"
              value="Charity"
              className="form-radio text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="option-two" className="text-gray-700 font-medium">
              Charity
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default SearchBar;
