import React from "react";

function Companyprofile() {
    return (
        <>
            <div className='container mx-auto text-center py-5'>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/user-512.png" alt="Company icon" width={200} />
                </div>
                <div className="py-4">
                    <h1 className="text-3xl font-bold">Company Information</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h1 className="text-xl font-semibold">Company Name</h1>
                        <input
                            type="text"
                            id="CompanyName"
                            className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                        />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">Email</h1>
                        <input
                            type="text"
                            id="Email"
                            className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                        />
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Location</h1>
                    <input
                        type="text"
                        id="Location"
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                    />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Industry</h1>
                    <input
                        type="text"
                        id="Industry"
                        className="m-3 py-2 px-4 bg-gray-200 border border-gray-400 rounded-lg w-full focus:outline-none focus:bg-white"
                    />
                </div>

            </div>
        </>
    );
}

export default Companyprofile;