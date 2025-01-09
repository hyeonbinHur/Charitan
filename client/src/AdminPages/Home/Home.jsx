import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate= useNavigate();

    return (
        <div className="flex flex-col bg-custom-white min-h-screen w-full p-12 mt-28">
            <h1 className="font-fancy text-5xl pl-6">Wellcome, Admin Master</h1>
            <h2 className="font-fancy text-4xl pl-6 pt-4 pb-16">Time to work!</h2>
            <div className="flex flex-col space-y-12 w-full">

                <div onClick={() => navigate('/page2')} className="w-3/4 h-auto items-center ml-auto flex flex-row  bg-custom-blue-1 rounded-lg shadow-[4px_4px_10px_0px_rgba(0,0,0,0.25)] border-2 border-gray-200 hover:bg-custom-blue">
                    <div class="pl-6 pr-6 w-full">
                        <h2 class="text-xl font-bold mb-4 text-white">Account Management</h2>
                        <p class="text-gray-200 italic">Account Management description</p>
                    </div>
                    <div className="bg-white p-6 min-h-56 w-auto rounded-tr-md rounded-br-md flex items-center justify-center hover:bg-gray-300">
                        <img src="./img/account.png" alt="" className="h-auto w-auto" />
                    </div>
                </div>

                <div onClick={() => navigate('/page3')} className="w-3/4 h-auto items-center mt-auto flex flex-row  bg-custom-blue-1 rounded-lg shadow-[-4px_4px_10px_0px_rgba(0,0,0,0.25)] border-2 border-gray-200 hover:bg-custom-blue">
                    <div className="bg-white p-6 min-h-56 w-auto rounded-tl-md rounded-bl-md flex items-center justify-center hover:bg-gray-300">
                        <img src="./img/project.png" alt="" className="h-auto w-auto" />
                    </div>
                    <div class="pl-6 pr-6 w-full">
                        <h2 class="text-xl font-bold mb-4 text-white">Project Management</h2>
                        <p class="text-gray-200 italic">Project Management description</p>
                    </div>
                </div>

                <div onClick={() => navigate('/page4')} className="w-3/4 h-auto items-center ml-auto flex flex-row  bg-custom-blue-1 rounded-lg shadow-[4px_4px_10px_0px_rgba(0,0,0,0.25)] border-2 border-gray-200 hover:bg-custom-blue">
                    <div class="pl-6 pr-6 w-full">
                        <h2 class="text-xl font-bold mb-4 text-white">Statistic</h2>
                        <p class="text-gray-200 italic">Statistic description</p>
                    </div>
                    <div className="bg-white p-6 min-h-56 w-auto rounded-tr-md rounded-br-md flex items-center justify-center hover:bg-gray-300">
                        <img src="./img/statistics.png" alt="" className="h-auto w-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;