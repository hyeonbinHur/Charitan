import React from "react";

const Searching = () => {
    return (
        <div className="relative grow rounded-md border-2 border-gray-300 items-center">
            <input
                type="text"
                className="mr-2 w-full px-4 py-3 pl-10 top-0 left-0 rounded-md"
                placeholder="Searching..."
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3 top-3.5 h-5 w-5 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>
    );
}

export default Searching;