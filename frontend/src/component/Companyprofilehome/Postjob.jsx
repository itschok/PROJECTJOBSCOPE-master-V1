import React, { useState } from "react";

function Postjob() {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [position, setPosition] = useState("");
    const [description, setDescription] = useState("");

    const handlePost = () => {

        console.log("Job posted:", { name, location, position, description });
    };

    return (
        <div className='container mx-auto text-center py-5 '>
            <div className="font-semibold py-4">CompanyProfile</div>
            <div className="flex justify-center">
                <img className="rounded-full border border-gray-500" src="https://cdn0.iconfinder.com/data/icons/business-1390/24/20_-_Company-2-256.png" alt="Company icon" width={200} />
            </div>
            <div className="mt-5 py-5 text-sm font-semibold ">
                <label  className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mt-5 py-5 text-sm font-semibold">
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mt-5 py-5 text-sm font-semibold">
                <label htmlFor="position">Position:</label>
                <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <div className="mt-5 py-5 text-sm font-semibold">
                <label htmlFor="description">Description:</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
            <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                Post
            </button>
        </div>
    );
}

export default Postjob;
