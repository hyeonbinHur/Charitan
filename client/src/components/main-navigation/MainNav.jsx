import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const MainNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        {/* <Image src="logo.png" alt="Lama Logo" w={32} h={32} /> */}
        <span>Charitan</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {/* Change Hamburger Icon */}
          {/* {open ? "X" : "☰"} */}
          <div className="flex flex-col gap-[5.4px]">
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${open && "rotate-45"
                }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black transition-all ease-in-out ${open && "opacity-0"
                }`}
            ></div>
            <div
              className={`h-[3px] rounded-md w-6 bg-black origin-left transition-all ease-in-out ${open && "-rotate-45"
                }`}
            ></div>
          </div>
        </div>
        {/* MOBILE LINK LIST */}
        <div
          className={`w-full h-screen bg-[#e6e6ff] flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"
            }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/charities" onClick={() => setOpen(false)}>Charities Page</Link>
          <Link to="/projects" onClick={() => setOpen(false)}>Projects Page</Link>
          <Link to="/charity" onClick={() => setOpen(false)}>Charity Detail</Link>
          <Link to="/project" onClick={() => setOpen(false)}>Project Detail</Link>
          <Link to="/create-project" onClick={() => setOpen(false)}>Create Project</Link>
          <Link to="/doner-p" onClick={() => setOpen(false)}>Doner Profile</Link>
          <Link to="/charity-p" onClick={() => setOpen(false)}>Charity Profile</Link>
          <Link to="/donation" onClick={() => setOpen(false)}>Donation</Link>

          <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
            Login 👋
          </button>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/charities" className="hover:text-gray-300">Charities Page</Link>
        <Link to="/projects" className="hover:text-gray-300">Projects Page</Link>
        <Link to="/charity" className="hover:text-gray-300">Charity Detail</Link>
        <Link to="/project" className="hover:text-gray-300">Project Detail</Link>
        <Link to="/create-project" className="hover:text-gray-300">Create Project</Link>
        <Link to="/doner-p" className="hover:text-gray-300">Doner Profile</Link>
        <Link to="/charity-p" className="hover:text-gray-300">Charity Profile</Link>
        <Link to="/donation" className="hover:text-gray-300">Donation</Link>
        {/* <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>
    </div >
  );
};

export default MainNav;
