import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../AdminComponent/Animation/LoadingAnimation";

export default function CreateDonorAccount() {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    const [animationLoad, setAnimationLoad] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    const [donorAccount, setDonorAccount] = useState({name: '', email: '', password: '', total_donations: '', donation_count: '', createAt: `${formattedDate}`, updateAt: '', phone_number: '', address: '', paymentDetail:'', donor_type: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setDonorAccount({ ...donorAccount, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setAnimationLoad(true)
        e.preventDefault();
        //await createAccount(account);
        setTimeout(() =>{
            navigate('/page2');
        }, 3500);
    };

    const [preview, setPreview] = useState(null); // Store preview URL
    // Handle Image Selection
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Create preview URL
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-center items-start min-h-screen min-w-[900px] mt-28 pt-28 pb-28 bg-custom-white">
                {animationLoad && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <LoadingAnimation
                        onComplete={() => setAnimationLoad(false)}
                        />
                    </div>
                )}
                <div className="flex flex-col justify-center items-start w-5/6 lg:w-2/3 h-auto bg-white shadow-lg rounded-xl space-y-6 pl-4">
                    <h1 className="w-full pl-16 pt-10 pb-6 text-4xl font-fancy">Create Donor Account</h1>
                    <div className="max-w-md mx-auto p-20">
                    <h2 className="text-2xl font-bold mb-4">Select an Image</h2>     
                    {/* File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="block w-full rounded-lg p-2 file:rounded-full file:border-0 file:p-2 file:pl-6 file:pr-6 file:bg-violet-50 file:hover:bg-violet-100 file:font-semibold file:text-custom-blue"
                    />
                    {/* Image Preview */}
                    {preview && (
                        <div className="mt-4">
                        <img
                            src={preview}
                            alt="Selected"
                            className="w-full aspect-square object-contain border rounded-full mt-2"
                        />
                        </div>
                    )}
                    </div>
                    <div className="flex flex-row w-full">
                        <label htmlFor="organization_name" ></label>
                    </div>
                    <div className="flex flex-row items-center space-x-2 pb-4 justify-between w-4/5 pl-20">
                        <label htmlFor="name" className="text-lg whitespace-nowrap pr-4">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            className="border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-full"
                        />
                    </div>
                    <div className="flex justify-start items-center w-4/5 space-x-10 pl-20">    
                        <div className="flex flex-row items-center space-x-2 justify-between w-1/2">
                            <label htmlFor="email" className="text-lg pr-4">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-full"
                            />
                        </div>
                        <div className="flex flex-row items-center space-x-2 justify-between w-1/2">
                            <label htmlFor="email" className="text-lg whitespace-nowrap pr-4">Phone Number:</label>
                            <input 
                                type="number" 
                                id="phone_number" 
                                name="phone_number" 
                                className="border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-full"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row items-center space-x-2 p-4 justify-between w-1/2 pl-20">
                        <label htmlFor="country" className="text-lg whitespace-nowrap pr-4">Country:</label>
                        <input 
                            type="text" 
                            id="country" 
                            name="country" 
                            className="border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-full"
                        />
                    </div>
                    <div className="flex flex-row items-center space-x-2 pb-4 justify-between w-1/2 pl-20">
                        <label htmlFor="address" className="text-lg whitespace-nowrap pr-4">Address:</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            className="border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-full"
                        />
                    </div>

                    <div className="relative p-6 justify-between w-1/2 pl-20">
                        <label htmlFor="password" className="absolute top-0 left-20 text-lg whitespace-nowrap pr-4">Password:</label>
                        <input 
                            type={showPassword1 ? 'text' : 'password'}
                            id="password" 
                            name="password" 
                            className="absolute top-0 right-0 border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-1/2"
                        />
                        <div className="absolute top-3 right-0" onClick={() => setShowPassword1(!showPassword1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${showPassword1 ? "hidden" : ""}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </div>
                        <div className="absolute top-3 right-0" onClick={() => setShowPassword1(!showPassword1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${showPassword1 ? "" : "hidden"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="relative p-6 w-1/2 pl-20">
                        <label htmlFor="country" className="absolute top-0 left-20 text-lg whitespace-nowrap pr-4">Comfirm password:</label>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            id="comfirm_password" 
                            name="comfirm_password" 
                            className="absolute top-0 right-0 border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-1/2"
                        />
                        <div className="absolute top-3 right-0" onClick={() => setShowPassword(!showPassword)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${showPassword ? "hidden" : ""}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                        </div>
                        <div className="absolute top-3 right-0" onClick={() => setShowPassword(!showPassword)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 ${showPassword ? "" : "hidden"}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-row w-full">
                        <label htmlFor="organization_name" ></label>
                    </div>
                    <div className="flex flex-row w-full justify-end items-center pb-12 pr-12 space-x-6">
                        <button type="button" onClick={() => navigate('/page2')} className="bg-custom-blue-1 rounded-full shadow-sm hover:bg-custom-blue pl-4 pr-4 p-2">
                            Cancle
                        </button>
                        <button type="submit" className="bg-custom-blue-1 rounded-full shadow-sm hover:bg-custom-blue pl-4 pr-4 p-2">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )

}