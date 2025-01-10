import React from "react";

const DonorAccountRow = ({index, donorAccount}) => {
    return (
        <div key={index} className="flex bg-white rounded-lg w-full h-auto justify-center items-center p-2 pl-6">
            <img src={donorAccount.avatar} alt="" className="h-[84px] w-auto rounded-full shadow-sm pr-4"/>
            <div className="flex flex-col w-full float-left p-4 space-y-2">
                <div className="w-full">
                    <h2 className="font-bold">{donorAccount.name}</h2>
                </div>
                <div className="w-full">
                    <p>Email: {donorAccount.email}</p>
                </div>
                <div className="w-full">
                    <p>Phone number: {donorAccount.phone_number}</p>
                </div>
            </div>
        </div>
    );
}

export default DonorAccountRow;