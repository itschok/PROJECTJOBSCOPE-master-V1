import React from "react";

function Jobseekerprofileedit() {
    return (
        <>
            <div className='container mx-auto text-center'>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/user-512.png" alt="User icon" width={200} />
                </div>
                <div className="py-2">
                    <h1>Name</h1>
                    <input
                        type="text"
                        id="Name"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                        placeholder="">
                    </input>
                </div>
                <div className="py-2">
                    <h1>Contact</h1>
                    <input
                        type="text"
                        id="Contact"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                        placeholder="">
                    </input>
                </div>
                <div className="py-2">
                    <h1>Talent</h1>
                    <input
                        type="text"
                        id="Talent"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl "
                        placeholder="">
                    </input>
                </div>
                <div className="py-2">
                    <h1>Level of education</h1>
                    <select
                        id="educationLevel"
                        className="m-3 py-1 px-3 bg-gray-50 border border-gray-200 rounded-3xl">
                        <option value="High School">High School</option>
                        <option value="Bachelor’s Degree">Bachelor’s Degree</option>
                        <option value="Master’s Degree">Master’s Degree</option>
                        <option value="Doctorate Degree">Doctorate Degree</option>
                    </select>
                </div>
                {/* SAVE button */}
                <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    SAVE
                </button>
            </div>
        </>
    );
}

export default Jobseekerprofileedit;