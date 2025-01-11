import { Input } from "../ui/input";
import { useState } from "react";
import { Search } from "lucide-react";
const CharitySearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`flex items-center outline outline-gray-300 border-gray-300 w-full border-3 rounded-md shadow-md transition-all duration-300 ${
        isFocused ? "border-blue-500 outline-blue-500" : ""
      }`}
    >
      {/* Search Icon */}
      <div className="p-2 text-gray-500">
        <Search />
      </div>

      {/* Input Field */}
      <Input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="py-2 px-4 text-gray-300 bg-transparent outline-none border-none focus:ring-0"
        placeholder="Search..."
      />
    </div>
  );
};

export default CharitySearchBar;
