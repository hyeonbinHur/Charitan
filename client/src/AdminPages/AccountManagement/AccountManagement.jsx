import React, {useState, useEffect} from "react";
import {getAllAdmins, deleteAdminById, createAdmin} from "../../utils/AdminAPI/AccountAPI/AccountAPICall";
import {getAllCharities, deleteCharityByIdByAdminRole} from "../../utils/AdminAPI/AccountAPI/CharityAccountAPI";
import {getAllDonors, deleteDonorByIdByAdminRole} from "../../utils/AdminAPI/AccountAPI/DonorAccountAPI";
import AdminAccountRow from "../../AdminComponent/AccountRow/AdminAccountRow";
import LoadingAnimation from "../../AdminComponent/Animation/LoadingAnimation";
import CharityAccountRow from "../../AdminComponent/AccountRow/CharityAccountRow";
import DonorAccountRow from "../../AdminComponent/AccountRow/DonorAccountRow";
import { useNavigate } from "react-router-dom";
import imgLoadFromPublic from "../../AdminComponent/ImageImplement/ImageImplement";

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
        try {
            const data = await getAllAdmins();
            setAccounts(data);
        } catch (error) {
            console.error("Error fetching admin list:", error);
        }
        };

        fetchAdmins();
    }, []);

    const handleDelete = async (id) => {
        try {
        await deleteAdminById(id);
        setAccounts(admins.filter((admin) => admin.adminId !== id));
        } catch (error) {
        console.error("Error deleting admin:", error);
        }
    };


    const [charityAccounts, setCharityAccounts] = useState([]);
    useEffect(() => {
        const fetchCharities = async () => {
        try {
            const data = await getAllCharities();
            setCharityAccounts(data);
        } catch (error) {
            console.error("Error fetching admin list:", error);
        }
        };

        fetchCharities();
    }, []);
    const handleDeleteCharity = async (id) => {
        try {
        await deleteCharityByIdByAdminRole(id);
        setCharityAccounts(charities.filter((charities) => charities.charityId !== id));
        } catch (error) {
        console.error("Error deleting charities:", error);
        }
    };


    const [donorAccounts, setDonorAccounts] = useState([]); 
    useEffect(() => {
        const fecthDonors = async () => {
        try {
            const data = await getAllDonors();
            setDonorAccounts(data);
        } catch (error) {
            console.error("Error fetching admin list:", error);
        }
        };

        fecthDonors();
    }, []);
    const handleDeleteDonor = async (id) => {
        try {
        await deleteDonorByIdByAdminRole(id);
        setDonorAccounts(donor.filter((donor) => donor.donorId !== id));
        } catch (error) {
        console.error("Error deleting donor:", error);
        }
    };
    
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);

    const [selectedImage, setSelectedImage] = useState('');
    const [isModalOpen1, setModalOpen1] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const [isHidden, setIsHidden] = useState(true);
    const [isHidden1, setIsHidden1] = useState(true);
    const [isHidden2, setIsHidden2] =useState(true);
    const [isModalOpen2, setModalOpen2] = useState(false);
    const [isModalOpen3, setModalOpen3] = useState(false);
    const [isModalOpen4, setModalOpen4] = useState(false);
    const [animationLoad, setAnimationLoad] = useState(false);

    const [searchAdmin, setAdmin] = useState('');
    const [searchCharity, setCharity] = useState('');
    const [searchDonor, setDonor] = useState('')

    const filterAdmin = accounts.filter((account) => 
        account.name.toLowerCase().includes(searchAdmin.toLowerCase())
    );
    const filterCharity = charityAccounts.filter((account) => 
        account.organizationName.toLowerCase().includes(searchCharity.toLowerCase())
    );
    const filterDornor = donorAccounts.filter((account) => 
        account.name.toLowerCase().includes(searchDonor.toLowerCase())
    );

    const [adminEmail, setAdminEmail] = useState('');
    const [charityEmail, setCharityEmail] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const filterDeleteByAdminEmail = accounts.filter((acc) =>
        acc.adminId === adminEmail
    );
    const filterDeleteByCharityEmail = charityAccounts.filter((acc) =>
        acc.charityId === charityEmail
    );
    const filterDeleteByDonorEmail = donorAccounts.filter((acc) =>
        acc.donorId === donorEmail
    );

    const [error, setError] = useState('');  // Define error state
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adminData = {
            avatar: String(selectedImage),
            name,
            email,
            role: "SUB", // Role is always "SUB"
            password,
        };

        try {
            const response = await createAdmin(adminData);
            setSuccess('Admin created successfully!');
            setError('');
            setAnimationLoad(true)
            setTimeout(() =>{
                setSelectedImage('');  // Reset image
                setName('');  // Reset name
                setEmail(''); //Reset email
                setPassword(''); //Reset password
                setModalOpen(false);  // Close modal
            }, 3500);
            setTimeout(() => {
                window.location.reload(); // Reloads the page
            }, 1000);
        } catch (err) {
            setError('Error creating admin: ' + err.response?.data?.message || err.message);
            setSuccess('');
            setSelectedImage('');  // Reset image
            setName('');  // Reset name
            setEmail(''); //Reset email
            setPassword(''); //Reset password
        }
    };

    const handleCloseModal1 = () => {
        setSelectedImage('');  // Reset image
        setName('');  // Reset name
        setEmail(''); //Reset email
        setPassword(''); //Reset password
        setModalOpen(false);  // Close modal
    };

    // Example images
    const exampleImages = [
        "./img/man.png",
        "./img/man-2.png",
        "./img/man-3.png",
        "./img/woman.png",
        "./img/woman-2.png",
        "./img/woman-3.png",
    ];
    return (
        <div className="relative bg-custom-white flex flex-col items-start justify-start min-h-screen p-20 mt-16 min-w-[900px]">
            {/* Create ADMIN account */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form onSubmit={handleSubmit} className="w-full justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-3/5">
                            <h2 className="text-3xl font-bold mb-4">Create Admin Account</h2>
                                <div
                                    className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer mx-auto"
                                    onClick={() => setModalOpen1(true)}
                                >
                                    {selectedImage ? (
                                    <img
                                        src={imgLoadFromPublic(selectedImage)}
                                        value={selectedImage}
                                        onChange={(e) => setAvatar(e.target.value)}
                                        alt="Selected"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                    ) : (
                                    <span className="text-gray-600 text-center p-2">Click to choose</span>
                                    )}
                                </div>

                                {/* Up the example image */}
                                {isModalOpen1 && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
                                        <h2 className="text-xl font-bold mb-4">Select an Image</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                        {exampleImages.map((image, index) => (
                                            <img
                                            key={index}
                                            src={imgLoadFromPublic(image)}
                                            alt={`Example ${index + 1}`}
                                            className="cursor-pointer rounded-lg border-2 border-transparent hover:border-custom-blue"
                                            onClick={() => {
                                                setSelectedImage(image);
                                                setModalOpen1(false);
                                            }}
                                            />
                                        ))}
                                        </div>
                                        <button
                                        onClick={() => {setModalOpen1(false);}}
                                        className="mt-4 w-full bg-custom-blue-1 text-white px-4 py-2 rounded-full hover:bg-custom-blue"
                                        >
                                        Cancel
                                        </button>
                                    </div>
                                    </div>
                                )}
                            <div className="space-y-2 flex flex-col pb-8">
                                <div className="flex items-center space-x-2 p-4 justify-between w-5/6">
                                    <label htmlFor="name" className="text-lg">Name:</label>
                                    <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-3/4"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 p-4 justify-between w-5/6">
                                    <label htmlFor="email" className="text-lg">Email:</label>
                                    <input 
                                    type="text" 
                                    id="email" 
                                    name="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-3/4"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 p-4 justify-between w-5/6">
                                    <label htmlFor="Password" className="text-lg">Password:</label>
                                    <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="border-b-2 border-gray-400 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-white w-3/4"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row space-x-6 items-center mx-auto w-full justify-end pr-4 pb-4">
                                <button
                                    type="button"
                                    onClick={() => handleCloseModal1()}
                                    className="bg-custom-blue-1 hover:bg-custom-blue text-white px-4 py-2 rounded-full shadow">
                                    Cancle
                                </button>
                                <button
                                    type="submit"
                                    className="bg-custom-blue-1 hover:bg-custom-blue text-white px-4 py-2 rounded-full shadow">
                                    Create
                                </button>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {success && <p style={{ color: 'green' }}>{success}</p>}
                        </div>
                    </form>
                </div>
            )}

            {/* Delete the ADMIN account */}
            {isModalOpen2 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {filterDeleteByAdminEmail.map((acc) => 
                        <div className="bg-white rounded-lg shadow-lg p-8 w-auto flex flex-col space-y-6">
                            <h1>Are you sure to delete {acc.name}?</h1>
                            <div className="flex flex-row items-center w-full space-x-8">
                                <button
                                className="bg-custom-blue-1 hover:bg-custom-blue rounded-full shadow p-2 text-white pl-4 pr-4"
                                onClick={() => setModalOpen2(false)}
                                >
                                    Cancle
                                </button>
                                <button
                                className="bg-red-400 hover:bg-red-200 rounded-full shadow p-2 text-white pl-4 pr-4"
                                onClick={() => {handleDelete(acc.adminId); setAnimationLoad(true); setTimeout(() => {setModalOpen2(false)}, 3500)}}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {animationLoad && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <LoadingAnimation
                    onComplete={() => setAnimationLoad(false)}
                    />
                </div>
            )}

            {/* Delete the Charity account */}
            {isModalOpen3 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {filterDeleteByCharityEmail.map((acc) => 
                    <div className="bg-white rounded-lg shadow-lg p-8 w-auto flex flex-col space-y-6">
                            <h1>Are you sure to delete {acc.organizationName}?</h1>
                        <div className="flex flex-row items-center w-full space-x-8">
                            <button
                            className="bg-custom-blue-1 hover:bg-custom-blue rounded-full shadow p-2 text-white pl-4 pr-4"
                            onClick={() => setModalOpen3(false)}
                            >
                                Cancle
                            </button>
                            <button
                            className="bg-red-400 hover:bg-red-200 rounded-full shadow p-2 text-white pl-4 pr-4"
                            onClick={() => {handleDeleteCharity(acc.charityId); setAnimationLoad(true); setTimeout(() => {setModalOpen3(false)}, 3500)}}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    )}
                </div>
            )}
            {animationLoad && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <LoadingAnimation
                    onComplete={() => setAnimationLoad(false)}
                    />
                </div>
            )}

            {/* Delete the Donor account */}
            {isModalOpen4 && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                {filterDeleteByDonorEmail.map((acc) => 
                    <div className="bg-white rounded-lg shadow-lg p-8 w-auto flex flex-col space-y-6">
                            <h1>Are you sure to delete {acc.name}?</h1>
                        <div className="flex flex-row items-center w-full space-x-8">
                            <button
                            className="bg-custom-blue-1 hover:bg-custom-blue rounded-full shadow p-2 text-white pl-4 pr-4"
                            onClick={() => setModalOpen4(false)}
                            >
                                Cancle
                            </button>
                            <button
                            className="bg-red-400 hover:bg-red-200 rounded-full shadow p-2 text-white pl-4 pr-4"
                            onClick={() => {handleDeleteDonor(acc.donorId); setAnimationLoad(true); setTimeout(() => {setModalOpen4(false)}, 3500)}}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
                </div>
            )}
            {animationLoad && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <LoadingAnimation
                    onComplete={() => setAnimationLoad(false)}
                    />
                </div>
            )}


            {/* CRUD admin account list */}
            <h1 className="font-fancy text-6xl w-full pb-12 p-6">Admin Account</h1>
            <div className="bg-custom-blue-2 rounded-lg shadow p-10 w-full space-y-12 flex flex-col lg:w-5/6">
                <div className="flex flex-row items-center justify-around space-x-20">
                    <div className="relative grow rounded-md border-2 border-gray-300 items-center">
                        <input
                            type="text"
                            className="mr-2 w-full px-4 py-3 pl-10 top-0 left-0 rounded-md"
                            placeholder="Searching..."
                            onChange={(e) => setAdmin(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3 top-3.5 h-5 w-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <button
                        onClick={() => setModalOpen(true)}
                        className="bg-custom-blue-1 text-white py-2 px-4 rounded-full hover:bg-custom-blue shadow"
                        >
                            Create
                        </button>
                        <button 
                        onClick={() => setIsHidden(!isHidden)}
                        className="bg-red-400 text-white py-2 px-4 rounded-full hover:bg-red-200 shadow">
                            {isHidden ? "Delete" : "Cancle"}
                        </button>
                    </div>
                </div>
                <div className="space-y-4">
                    {filterAdmin.map((account, index) => (
                        <div className="flex flex-row w-full items-center space-x-6">
                            <AdminAccountRow account={account} key={index} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className={`size-12 text-red-500 hover:text-red-200 ${isHidden ? "hidden" : ""} ${account.status !== "Master" ? "" : "hidden"}`}
                                onClick={() => {setAdminEmail(account.adminId); setModalOpen2(true)}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <span></span>
                            </svg>
                        </div>
                    ))}
                </div>
            </div>


            {/* CRUD charity account list  */}
            <h1 className="font-fancy text-6xl w-full pb-12 p-6 mt-20">Charity Account</h1>
            <div className="bg-custom-blue-2 rounded-lg shadow p-10 w-full space-y-12 flex flex-col lg:w-5/6">
                <div className="flex flex-row items-center justify-around space-x-20">
                    <div className="relative grow rounded-md border-2 border-gray-300 items-center">
                        <input
                            type="text"
                            className="mr-2 w-full px-4 py-3 pl-10 top-0 left-0 rounded-md"
                            placeholder="Searching..."
                            onChange={(e) => setCharity(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3 top-3.5 h-5 w-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <button
                        className="bg-custom-blue-1 text-white py-2 px-4 rounded-full hover:bg-custom-blue shadow"
                        onClick={() => navigate('/admin_role/page2/create_Charity_Account')}
                        >
                            Create
                        </button>
                        <button 
                        onClick={() => setIsHidden1(!isHidden1)}
                        className="bg-red-400 text-white py-2 px-4 rounded-full hover:bg-red-200 shadow">
                            {isHidden1 ? "Delete" : "Cancle"}
                        </button>
                    </div>
                </div>
                <div className="space-y-4">
                    {filterCharity.map((charityAccount, index) => (
                        <div className="flex flex-row w-full items-center space-x-6">
                            <CharityAccountRow charityAccount={charityAccount} index={index} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className={`size-12 text-red-500 hover:text-red-200 ${isHidden1 ? "hidden" : ""}`}
                                onClick={() => {setCharityEmail(charityAccount.charityId); setModalOpen3(true)}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <span></span>
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
            

            {/* CRUD donor account list  */}
            <h1 className="font-fancy text-6xl w-full pb-12 p-6 mt-20">Donor Account</h1>
            <div className="bg-custom-blue-2 rounded-lg shadow p-10 w-full space-y-12 flex flex-col lg:w-5/6">
                <div className="flex flex-row items-center justify-around space-x-20">
                    <div className="relative grow rounded-md border-2 border-gray-300 items-center">
                        <input
                            type="text"
                            className="mr-2 w-full px-4 py-3 pl-10 top-0 left-0 rounded-md"
                            placeholder="Searching..."
                            onChange={(e) => setDonor(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3 top-3.5 h-5 w-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <button
                        className="bg-custom-blue-1 text-white py-2 px-4 rounded-full hover:bg-custom-blue shadow"
                        onClick={() => navigate('/admin_role/page2/create_Donor_Account')}
                        >
                            Create
                        </button>
                        <button 
                        onClick={() => setIsHidden2(!isHidden2)}
                        className="bg-red-400 text-white py-2 px-4 rounded-full hover:bg-red-200 shadow">
                            {isHidden2 ? "Delete" : "Cancle"}
                        </button>
                    </div>
                </div>
                <div className="space-y-4">
                    {filterDornor.map((donorAccount, index) => (
                        <div className="flex flex-row w-full items-center space-x-6">
                            <DonorAccountRow donorAccount={donorAccount} index={index} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
                                viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                className={`size-12 text-red-500 hover:text-red-200 ${isHidden2 ? "hidden" : ""}`}
                                onClick={() => {setDonorEmail(donorAccount.donorId); setModalOpen4(true)}}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <span></span>
                            </svg>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AccountManagement;