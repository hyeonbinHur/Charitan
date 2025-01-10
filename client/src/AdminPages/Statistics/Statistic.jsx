import React, {useState} from "react";
import projectIcon from "../../../public/img/project-2.png";
import donationIcon from "../../../public/img/fundraising.png";

const Statistic = () => {
    const [searchCharity, setSearchCharity] = useState('');
    const [searchDonor, setSearchDonor] = useState('');
    const years = Array.from({ length: 26 }, (_, i) => 2000 + i);
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    const charities = [
        { name: 'Charity A', totalProjects: 5, totalDonated: '$10,000' },
        { name: 'Charity B', totalProjects: 8, totalDonated: '$25,000' },
        { name: 'Charity C', totalProjects: 3, totalDonated: '$7,500' },
        { name: 'Charity D', totalProjects: 10, totalDonated: '$50,000' },
        { name: 'Charity E', totalProjects: 6, totalDonated: '$15,000' }
    ];
    
    const donors = [
        { name: 'Donor 1', totalDonated: '$5,000' },
        { name: 'Donor 2', totalDonated: '$12,000' },
        { name: 'Donor 3', totalDonated: '$8,500' },
        { name: 'Donor 4', totalDonated: '$15,000' },
        { name: 'Donor 5', totalDonated: '$20,000' }
    ];

    // Filter charities based on search query
    const filteredCharities = charities.filter((charity) =>
        charity.name.toLowerCase().includes(searchCharity.toLowerCase())
    );

    // Filter donors based on search query
    const filteredDonors = donors.filter((donor) =>
        donor.name.toLowerCase().includes(searchDonor.toLowerCase())
    );

    const currentDate = new Date().toLocaleDateString('en-GB');
    return (
        <div className="w-full min-h-screen min-w-[900px] flex flex-col bg-custom-white items-center justify-start p-6 mt-28">
            <div className="w-5/6 flex flex-row mb-4 items-center ">
                <h1 className="font-fancy text-2xl w-full text-black">Overview total projects and donations of Charitan app</h1>
                <h1 className="italic text-gray-500 texrt-md"> {currentDate} </h1>
            </div>
            <div className="flex flex-row h-auto w-5/6 p-2 md:space-x-12 space-x-2 lg:w-4/6">
                <div className="flex flex-col justify-center items-center p-4 bg-white rounded-lg w-1/2 space-y-4 shadow-md">
                    <div className="flex justify-end w-full">
                        <img src={projectIcon} alt="" className="h-16 w-16" />
                    </div>
                    <h1 className="font-bold text-4xl w-full text-black">Project</h1>
                    <h1 className="text-gray-600 text-2xl w-full">29</h1>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg w-1/2 space-y-4 shadow-md">
                    <div className="flex justify-end w-full">
                        <img src={donationIcon} alt="" className="h-16 w-16" />
                    </div>
                    <h1 className="font-bold text-4xl w-full text-black">Donate Value</h1>
                    <h1 className="text-gray-600 text-2xl w-full">77231.45 $</h1>
                </div>
            </div>
            <div className="flex p-4 flex-col md:flex-row w-5/6 md:space-x-4">
                {/* Charity Table */}
                <div className="flex flex-col lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-2 text-black">Charity Information</h2>
                    <div className="relative rounded-md border-2 border-gray-300 items-center mb-4">
                        <input
                            type="text"
                            placeholder="Searching..."
                            value={searchCharity}
                            onChange={(e) => setSearchCharity(e.target.value)}
                            className="mr-2 w-full px-4 py-3 pl-10 top-0 left-0 rounded-md"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3 top-3.5 h-5 w-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>

                    <div className="flex items-center justify-start space-x-6 w-full pb-6">
                        <select
                            id="year"
                            name="year"
                            defaultValue="Year"
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        >
                            <option value="Year">Year</option>
                            {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                            ))}
                        </select>
                        <select
                            defaultValue="Month"
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        >
                            <option value="Month">Month</option>
                            {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                            ))}
                        </select>
                        <select
                            defaultValue="Week"
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        >
                            <option value="Week">Week</option>
                            {weeks.map((week, index) => (
                            <option key={index} value={week}>
                                {week}
                            </option>
                            ))}
                        </select>
                    </div>

                    <table className="w-full border-collapse border-2 border-gray-300 mb-8">
                        <thead>
                        <tr className="bg-custom-blue-1 text-white">
                            <th className="border-2 border-gray-300 p-2">Charity Name</th>
                            <th className="border-2 border-gray-300 p-2">Total Projects</th>
                            <th className="border-2 border-gray-300 p-2">Total Donated Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCharities.map((charity, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                            <td className="border-2 border-gray-300 p-2">{charity.name}</td>
                            <td className="border-2 border-gray-300 p-2">{charity.totalProjects}</td>
                            <td className="border-2 border-gray-300 p-2">{charity.totalDonated}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Donor Table */}
                <div className="flex flex-col lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-2 text-black">Donor Information</h2>
                    <div className="relative rounded-md border-2 border-gray-300 items-center mb-4">
                        <input
                            type="text"
                            value={searchDonor}
                            onChange={(e) => setSearchDonor(e.target.value)}
                            className="mr-2 w-full px-4 py-3 pl-10 top-0 left-0 rounded-md"
                            placeholder="Searching..."
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 absolute left-3 top-3.5 h-5 w-5 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>

                    <div className="flex items-center justify-start space-x-6 w-full pb-6">
                        <select
                            id="year"
                            name="year"
                            defaultValue="Year"
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        >
                            <option value="Year">Year</option>
                            {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                            ))}
                        </select>
                        <select
                            defaultValue="Month"
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        >
                            <option value="Month">Month</option>
                            {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                            ))}
                        </select>
                        <select
                            defaultValue="Week"
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        >
                            <option value="Week">Week</option>
                            {weeks.map((week, index) => (
                            <option key={index} value={week}>
                                {week}
                            </option>
                            ))}
                        </select>
                    </div>

                    <table className="w-full border-collapse border-2 border-gray-300">
                        <thead>
                        <tr className="bg-custom-blue-1 text-white">
                            <th className="borde-2 border-gray-300 p-2">Donor Name</th>
                            <th className="border-2 border-gray-300 p-2">Total Donated Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredDonors.map((donor, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                            <td className="border-2 border-gray-300 p-2">{donor.name}</td>
                            <td className="border-2 border-gray-300 p-2">{donor.totalDonated}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Statistic;