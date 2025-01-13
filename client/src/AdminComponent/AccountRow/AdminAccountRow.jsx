import React from "react";
import imgLoadFromPublic from "../ImageImplement/ImageImplement";

const AdminAccountRow = ({ index, account }) => {
    return (
        <div key={index} className="flex p-2 pl-6 items-center bg-white shadow w-full rounded-lg">
            <img src={imgLoadFromPublic(account.avatar)} className="rounded-full h-[84px] w-auto pr-4"/>
            <div className="w-full space-y-2 p-4 float-left items-center">
                <div className="w-full">
                    <h2 className="font-semibold">{account.name}</h2>
                </div>
                <div className="w-full">
                    <p>Email: {account.email}</p>
                </div>
                <div className="w-full">
                    <p>Role: {account.role}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminAccountRow;