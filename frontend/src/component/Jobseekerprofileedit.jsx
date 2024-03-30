import React from "react";

function Jobseekerprofileedit() {
    return (
        <>
            <div className='container mx-auto text-center'>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/user-512.png" alt="User icon" width={200} />
                </div>
                <div className="py-4">
                    <h1 className="text-3xl font-bold">Edit Profile</h1>
                </div>
                <div className="py-2">
                    <h1 className="text-lg font-semibold">Name</h1>
                    <input
                        type="text"
                        id="Name"
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="py-2">
                    <h1 className="text-lg font-semibold">Email</h1>
                    <input
                        type="text"
                        id="Email"
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="py-3">
                    <h1 className="text-lg font-semibold">Status</h1>
                    <select
                        id="Statusongoing"
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white">
                        <option value="Unemployed">Unemployed</option>
                        <option value="Employed">Employed</option>
                    </select>
                </div>
                <div className="py-2">
                    <h1 className="text-lg font-semibold">Level of Education</h1>
                    <select
                        id="educationLevel"
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white">
                        <option value="High School">High School</option>
                        <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                        <option value="Master’s Degree">Master’s Degree</option>
                        <option value="Doctorate Degree">Doctorate Degree</option>
                    </select>
                </div>
                <div className="py-4">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                        SAVE
                    </button>
                </div>
            </div>
        </>
    );
}

export default Jobseekerprofileedit;
