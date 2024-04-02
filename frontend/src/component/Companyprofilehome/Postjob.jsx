import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Postjob() {
    const [formData, setFormData] = useState({
        ActionCommand: "create",
        JobName: "",
        Location: "",
        Position: "",
        Salary: "",
        Description: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const { companyusername } = useParams();

    const handlePost = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/postjob/${companyusername}`, formData, {
                withCredentials: true,
            });
            alert("Post Complete");
        } catch (error) {
            console.error("Error posting job:", error);
        }
    };

    return (
        <div className='container mx-auto text-center py-5 '>
            <form>
                <div className="font-semibold py-4">CompanyProfile</div>
                <div className="flex justify-center">
                    <img className="rounded-full border border-gray-500" src="https://cdn0.iconfinder.com/data/icons/business-1390/24/20_-_Company-2-256.png" alt="Company icon" width={200} />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold ">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        id="JobName"
                        value={formData.JobName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="location">Location:</label>
                    <select
                        id="Location"
                        value={formData.Location}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select Location</option>
                        <option value="Bangkok">Bangkok</option>
                        <option value="County">County</option>
                        <option value="North">North</option>
                        <option value="Northeast">Northeast</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                        <option value="South">South</option>
                    </select>
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="position">Position:</label>
                    <input
                        type="text"
                        id="Position"
                        value={formData.Position}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="Description"
                        value={formData.Description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-5 py-5 text-sm font-semibold">
                    <label htmlFor="salary">Salary:</label>
                    <input
                        type="number"
                        id="Salary"
                        value={formData.Salary}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                    Post
                </button>
            </form>
        </div>
    );
}

export default Postjob;
