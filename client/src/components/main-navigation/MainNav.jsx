import React from "react";
import { Link } from "react-router-dom";
const MainNav = () => {
  return (
    <header className="px-5 py-5 text-black  w-full border-2">
      <div className="flex justify-around items-center ">
        <div className="absolute left-5 font-bold text-xl">
          <Link to="/" className="hover:text-gray-300">
            Charitan
          </Link>
        </div>
        <nav className="flex gap-5">
          <Link to="/charities" className="hover:text-gray-300">
            Charities Page
          </Link>
          <Link to="/projects" className="hover:text-gray-300">
            Projects Page
          </Link>
          <Link to="/charity" className="hover:text-gray-300">
            Charity Detail
          </Link>
          <Link to="/project" className="hover:text-gray-300">
            Project Detail
          </Link>

          <Link to="/doner-p" className="hover:text-gray-300">
            Doner Profile
          </Link>
          <Link to="/charity-p" className="hover:text-gray-300">
            Charity Profile
          </Link>
          <Link to="/donation" className="hover:text-gray-300">
            Donation
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default MainNav;
