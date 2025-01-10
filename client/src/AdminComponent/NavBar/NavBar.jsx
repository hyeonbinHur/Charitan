import React from "react";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <header className="w-full border-2 px-5 py-3 bg-custom-blue flex fixed top-0 left-0 z-50 shadow-sm">
            <div className="flex flex-col justify-around items-center space-y-2 w-full">
                <div className="w-full items-center justify-between flex flex-row">
                    <Link to="/admin" className="font-cookie hover:text-gray-400 text-5xl w-auto pl-4 text-custom-white">
                        Charitan
                    </Link>
                    <Link to="/admin/profile" className="hover:text-gray-400 pr-2 w-16 h-auto">
                        <img src="/img/woman-2.png" alt="" className="rounded-full"/>
                    </Link>
                </div>
                <nav className="flex flex-row space-x-12 items-start w-full">
                    <Link to="/admin/page1" className="hover:text-gray-400 text-l font-bold w-auto pl-4 text-custom-white">
                        Home
                    </Link>
                    <Link to="/admin/page2" className="hover:text-gray-400 text-l font-bold w-auto pl-4 text-custom-white">
                        Account
                    </Link>
                    <Link to="/admin/page3" className="hover:text-gray-400 text-l font-bold w-auto pl-4 text-custom-white">
                        Project
                    </Link>
                    <Link to="/admin/page4" className="hover:text-gray-400 text-l font-bold w-auto pl-4 text-custom-white">
                        Statistic
                    </Link>
                </nav>
            </div>

        </header>
    );
}

export default NavBar;