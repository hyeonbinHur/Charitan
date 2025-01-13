import React from "react";

const CharityAccountRow = ({index, charityAccount}) => {
    return (
        <div key={index} className="flex bg-white rounded-lg w-full h-auto justify-center items-center p-2 pl-6">
            <img src={charityAccount.avatar} alt="Charity AVATAR" className="h-[84px] w-[84px] rounded-full shadow-sm pr-4"/>
            <div className="flex flex-col w-full float-left p-4 space-y-2">
                <div className="w-full">
                    <h2 className="font-semibold">{charityAccount.organizationName}</h2>
                </div>
                <div className="w-full">
                    <p>Category: {charityAccount.category}</p>
                </div>
                <div className="w-full">
                    <p>Country: {charityAccount.country}</p>
                </div>
            </div>
        </div>
    );
}

export default CharityAccountRow;